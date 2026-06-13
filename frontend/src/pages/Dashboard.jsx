import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(
    JSON.parse(localStorage.getItem("analysis")) || null
  );
  const [jobs, setJobs] = useState([]);

  const analysisRef = useRef(null);

  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // ---------- FETCH RESUMES ----------
  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        "https://hiresense-ai-75v4.onrender.com/api/users/resumes/"
      );
      setResumes(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ---------- ANALYZE ----------
  const analyzeResume = async (id) => {
    try {
      const res = await axios.get(
        `https://hiresense-ai-75v4.onrender.com/api/users/analyze/${id}/`
      );

      setAnalysis(res.data || null);
      setJobs(res.data?.recommended_jobs || []);

      localStorage.setItem("analysis", JSON.stringify(res.data));

      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- DELETE ----------
  const deleteResume = async (id) => {
    try {
      await axios.delete(
        `https://hiresense-ai-75v4.onrender.com/api/users/delete/${id}/`
      );
      fetchResumes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div>
          <h2 style={{ margin: 0 }}>HireSense AI</h2>
          <p style={styles.subText}>Resume Intelligence Dashboard</p>
        </div>

        <div style={styles.navActions}>
          <button style={styles.primaryBtn} onClick={() => navigate("/upload")}>
            + Upload Resume
          </button>

          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.container}>
        <h3>📄 Your Resumes</h3>

        {resumes.map((r) => (
          <div key={r.id} style={styles.card}>
            <div>
              <b>{r.name}</b>
              <p style={styles.muted}>{r.email}</p>
            </div>

            <div style={styles.actions}>
              <a
                style={styles.link}
                href={`https://hiresense-ai-75v4.onrender.com${r.file}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>

              <button
                style={styles.actionBtn}
                onClick={() => analyzeResume(r.id)}
              >
                Analyze
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteResume(r.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* ANALYSIS */}
        {analysis && (
          <div ref={analysisRef} style={styles.analysisBox}>
            <h2>🤖 AI Analysis</h2>

            <p>
              <b>Score:</b> {analysis.score || 0}
            </p>

            {/* ROLES (FIXED - NO OBJECT OBJECT) */}
            <p>
              <b>Roles:</b>{" "}
              {Array.isArray(analysis.job_suggestions)
                ? analysis.job_suggestions.join(", ")
                : "Not detected"}
            </p>

            {/* SKILLS */}
            <p><b>Skills:</b></p>
            <div style={styles.badges}>
              {Array.isArray(analysis.skills_detected) &&
                analysis.skills_detected.map((s, i) => (
                  <span key={i} style={styles.badge}>
                    {s}
                  </span>
                ))}
            </div>

            {/* MISSING SKILLS */}
            <p style={{ marginTop: "10px" }}>
              <b>Missing Skills:</b>
            </p>
            <div style={styles.badges}>
              {Array.isArray(analysis.missing_skills) &&
              analysis.missing_skills.length > 0 ? (
                analysis.missing_skills.map((s, i) => (
                  <span
                    key={i}
                    style={{ ...styles.badge, background: "#fee2e2" }}
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span style={styles.badge}>All skills matched 🎉</span>
              )}
            </div>
          </div>
        )}

        {/* JOBS */}
        {jobs.length > 0 && (
          <div style={styles.jobs}>
            <h3>💼 Job Matches</h3>

            <div style={styles.jobGrid}>
              {jobs.map((job, i) => (
                <div key={i} style={styles.jobCard}>
                  <b>{job.role}</b>

                  <div style={styles.links}>
                    <a
                      href={job?.links?.linkedin || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>

                    <a
                      href={job?.links?.naukri || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Naukri
                    </a>

                    <a
                      href={job?.links?.unstop || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Unstop
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
const styles = {
  page: {
    padding: "15px",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "15px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 10px",
  },

  subText: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b",
  },

  navActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    minWidth: "120px",
    fontSize: "14px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    minWidth: "120px",
    fontSize: "14px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    padding: "14px",
    background: "#fff",
    marginBottom: "10px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "600",
  },

  actionBtn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },

  analysisBox: {
    marginTop: "20px",
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
  },

  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  badge: {
    background: "#e0e7ff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
  },

  jobs: {
    marginTop: "20px",
  },

  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "10px",
  },

  jobCard: {
    background: "#fff",
    padding: "12px",
    borderRadius: "12px",
  },

  links: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
  },

  muted: {
    fontSize: "12px",
    color: "#64748b",
  },
};