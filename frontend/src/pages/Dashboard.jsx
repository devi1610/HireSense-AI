import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(
    JSON.parse(localStorage.getItem("analysis")) || null
  );
  const [jobs, setJobs] = useState([]);

  const analysisRef = useRef(null);
  const token = localStorage.getItem("access");

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {}

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  const fetchResumes = async () => {
    const res = await axios.get(
      "https://hiresense-ai-75v4.onrender.com/api/users/resumes/",
      
    );
    setResumes(res.data || []);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const analyzeResume = async (id) => {
    const res = await axios.get(
      `https://hiresense-ai-75v4.onrender.com/api/users/analyze/${id}/`,
      
    );

    setAnalysis(res.data);
    setJobs(res.data?.recommended_jobs || []);

    localStorage.setItem("analysis", JSON.stringify(res.data));

    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const deleteResume = async (id) => {
    await axios.delete(
      `https://hiresense-ai-75v4.onrender.com/api/users/delete/${id}/`,
      
    );
    fetchResumes();
  };

  return (
    <div style={styles.page} className="dashboard-page">

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>HireSense AI</h1>
          <p style={styles.sub}>AI Resume Intelligence Dashboard</p>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.primaryBtn} onClick={() => navigate("/upload")}>
            📤 Upload
          </button>

          <button style={styles.logoutBtn} onClick={() => {
            localStorage.clear();
            navigate("/");
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* RESUMES */}
      <div style={styles.section}>
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
      </div>

      {/* ANALYSIS (CLEAN SINGLE BOX) */}
      {analysis && (
        <div ref={analysisRef} style={styles.analysisBox}>
          <h2>🤖 AI Analysis</h2>

          <div style={styles.grid}>
            <div style={styles.block}>
              <h4>🧠 Skills</h4>
              <div style={styles.badges}>
                {analysis.skills_detected?.map((s, i) => (
                  <span key={i} style={styles.badge}>{s}</span>
                ))}
              </div>
            </div>

            <div style={styles.block}>
              <h4>⚡ ATS Score</h4>
              <h1 style={{ margin: 0 }}>{analysis.score}</h1>
            </div>

            <div style={styles.block}>
              <h4>💼 Roles</h4>
              <p>{analysis.job_suggestions?.join(", ")}</p>
            </div>

            <div style={styles.block}>
              <h4>🚧 Missing Skills</h4>
              <div style={styles.badges}>
                {analysis.missing_skills?.length ? (
                  analysis.missing_skills.map((s, i) => (
                    <span key={i} style={{ ...styles.badge, background: "#fee2e2" }}>
                      {s}
                    </span>
                  ))
                ) : (
                  <span style={styles.good}>All skills covered 🎉</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JOBS (FIXED - NO DISAPPEARING ISSUE) */}
      {jobs.length > 0 && (
        <div style={styles.jobs}>
          <h3>💼 Job Matches</h3>

          <div style={styles.jobGrid}>
            {jobs.map((job, i) => (
              <div key={i} style={styles.jobCard}>
                <b>{job.role}</b>

                <div style={styles.links}>
                  <a href={job.links.linkedin} target="_blank">LinkedIn</a>
                  <a href={job.links.naukri} target="_blank">Naukri</a>
                  <a href={job.links.unstop} target="_blank">Unstop</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

/* ================= CLEAN MODERN STYLES ================= */
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Inter, Arial",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },

  sub: {
    color: "#64748b",
    marginTop: "5px",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#6366f1",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  section: {
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    flexWrap: "wrap",
    gap: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.2s",
  },

  actionBtn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
  },

  analysisBox: {
    marginTop: "25px",
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  block: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    transition: "0.2s",
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
    fontSize: "12px",
    transition: "0.2s",
  },

  good: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  jobs: {
    marginTop: "25px",
  },

  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  jobCard: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },

  links: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
  },
};

 