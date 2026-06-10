import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>HireSense AI 🚀</h2>

        <div style={styles.navRight}>
          <button style={styles.navBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.navBtnPrimary} onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>

        <div style={styles.left}>
          <h1 style={styles.title}>
            AI Powered Resume Intelligence
          </h1>

          <p style={styles.subtitle}>
            Upload your resume and get ATS score, missing skills,
            and AI-powered job recommendations instantly.
          </p>

          <div style={styles.cta}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/register")}
            >
              Upload Resume
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/login")}
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT MOCK CARD */}
        <div style={styles.right}>
          <div style={styles.mockBox}>
            <h3>Resume AI Analysis</h3>
            <p>📊 ATS Score: 82%</p>
            <p>🧠 Missing: React, Docker</p>
            <p>💼 Jobs: 24 Matches</p>
          </div>
        </div>

      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>📊 ATS Score Analysis</div>
        <div style={styles.card}>🧠 Missing Skills Detection</div>
        <div style={styles.card}>💼 Smart Job Matching</div>
      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "20px 60px",
    fontFamily: "Arial",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
  },

  navRight: {
    display: "flex",
    gap: "10px",
  },

  navBtn: {
    padding: "8px 14px",
    border: "1px solid #4f46e5",
    background: "white",
    color: "#4f46e5",
    borderRadius: "8px",
    cursor: "pointer",
  },

  navBtnPrimary: {
    padding: "8px 14px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "70px",
    gap: "40px",
  },

  left: {
    flex: 1,
  },

  title: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#111827",
  },

  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    maxWidth: "500px",
    lineHeight: "1.6",
  },

  cta: {
    marginTop: "25px",
    display: "flex",
    gap: "15px",
  },

  primaryBtn: {
    padding: "12px 18px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px 18px",
    border: "1px solid #4f46e5",
    backgroundColor: "white",
    color: "#4f46e5",
    borderRadius: "10px",
    cursor: "pointer",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  mockBox: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    width: "280px",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "80px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    padding: "18px 22px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
  }
};

export default Landing;