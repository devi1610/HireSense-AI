import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [jobs, setJobs] = useState([]);
  const analysisRef = useRef(null);

  // ---------------- PROTECT ROUTE ----------------
  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  // ---------------- FETCH RESUMES ----------------
  const fetchResumes = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/users/resumes/",
    );

    setResumes(res.data);
  } catch (err) {
    console.log(err);
  }
}; 
  useEffect(() => {
    fetchResumes();
  }, []);

  // ---------------- ANALYZE RESUME ----------------
  const analyzeResume = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/users/analyze/${id}/`
      );

      setAnalysis(res.data);
      setJobs(res.data.recommended_jobs || []);

      setTimeout(() => {
        analysisRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);

    } catch (err) {
      console.log(err);
      alert("Analysis failed");
    }
  };

  // ---------------- DELETE RESUME ----------------
  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/users/delete/${id}/`
      );

      alert("Resume deleted successfully ✅");

      fetchResumes();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>

      {/* ---------------- NAVBAR ---------------- */}
      <div style={styles.navbar}>
        <h2>HireSense AI 🚀</h2>

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

      <div style={styles.card}>
      <div
         style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            marginBottom: "20px",
        }}
      >
        <h1>Welcome, {user?.name} 👋</h1>
        <p style={{ color: "#666" }}>{user?.email}</p>
     </div>
        

        {/* ---------------- FEATURE CARDS ---------------- */}
        <div style={styles.boxContainer}>

          <div style={styles.box} onClick={() => navigate("/upload")}>
            📄 Upload Resume
          </div>

          <div
            style={styles.box}
            onClick={() =>
              analysisRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            💼 Job Matching
          </div>

          <div
            style={styles.box}
            onClick={() => {
              if (resumes.length > 0) {
                analyzeResume(resumes[0].id);
              }
            }}
          >
            🤖 AI Analysis
          </div>

        </div>

        {/* ---------------- RESUME LIST ---------------- */}
        <h2 style={{ marginTop: "30px" }}>Uploaded Resumes 📄</h2>

        {resumes.length === 0 ? (
          <p>No resumes uploaded yet</p>
        ) : (
          resumes.map((r) => (
            <div key={r.id} style={styles.resumeCard}>

              <p><b>Name:</b> {r.name}</p>
              <p><b>Email:</b> {r.email}</p>

              <a
                href={`http://127.0.0.1:8000${r.file}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>

              <br />

              <div style={{ marginTop: "10px" }}>
                <button
                  style={styles.analyzeBtn}
                  onClick={() => analyzeResume(r.id)}
                >
                  Analyze AI 🤖
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteResume(r.id)}
                >
                  Delete 🗑️
                </button>
              </div>

            </div>
          ))
        )}

        {/* ---------------- AI ANALYSIS ---------------- */}
        {analysis && (
          <div ref={analysisRef} style={styles.analysisCard}>
            <h2>🤖 AI Analysis</h2>

            <p>
              <b>Skills:</b> {analysis.skills_detected?.join(", ")}
            </p>

            <p>
              <b>Score:</b> {analysis.score}
            </p>

            <p>
              <b>Suggested Roles:</b>{" "}
              {analysis.job_suggestions?.join(", ")}
            </p>
          </div>
        )}

        {/* ---------------- LIVE JOBS ---------------- */}
        {jobs.length > 0 && (
          <div style={styles.analysisCard}>
            <h2>💼 Live Job Opportunities</h2>

            {jobs.map((job, i) => (
              <div key={i} style={styles.jobCard}>

                <h3>{job.role}</h3>

                <div style={{ marginTop: "10px" }}>
                  <a href={job.links.linkedin} target="_blank" rel="noreferrer" style={styles.linkBtn}>
                    LinkedIn Jobs
                  </a>

                  <a href={job.links.naukri} target="_blank" rel="noreferrer" style={styles.linkBtn}>
                    Naukri Jobs
                  </a>

                  <a href={job.links.unstop} target="_blank" rel="noreferrer" style={styles.linkBtn}>
                    Unstop Jobs
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial",
  },

  navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#111",
  color: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
},

  logoutBtn: {
    backgroundColor: "red",
    border: "none",
    padding: "8px 15px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  card: {
    padding: "30px",
  },

  boxContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  
  box: {
  flex: "1",
  minWidth: "220px",
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  cursor: "pointer",
  textAlign: "center",
  fontWeight: "bold",
  transition: "0.2s",
},
 
  resumeCard: {
  backgroundColor: "white",
  padding: "20px",
  marginTop: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
},
  
  analyzeBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  analysisCard: {
  backgroundColor: "white",
  padding: "25px",
  marginTop: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
},

  jobCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  linkBtn: {
    display: "inline-block",
    marginRight: "10px",
    marginTop: "8px",
    padding: "6px 10px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "12px",
  },
};

export default Dashboard;