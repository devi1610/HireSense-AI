import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.headerSection}>
          <div style={styles.badge}>HIRESENSE TOOLS</div>
          <h1 style={styles.title}>Powering Your Career with AI Resume Intelligence</h1>
          <p style={styles.subtitle}>
            Explore our advanced suit of features designed to help you bypass applicant tracking systems and land interviews.
          </p>
        </div>

        <div style={styles.grid}>
          {featuresList.map((f, i) => (
            <div key={i} className="glass-card" style={styles.card}>
              <div style={styles.iconBox}>{f.icon}</div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to optimize your resume?</h2>
          <button className="nav-btn-primary" style={styles.ctaBtn} onClick={() => navigate("/register")}>
            Analyze Your Resume Now
          </button>
        </div>
      </main>
    </div>
  );
}

const featuresList = [
  {
    title: "Instant ATS Scoring",
    desc: "Get a comprehensive score from 0 to 100 on how your resume performs against top enterprise ATS algorithms instantly.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    ),
  },
  {
    title: "AI Keyword Recommendations",
    desc: "Our AI scans the target job description and highlights the exact missing skills and keywords you need to add.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    ),
  },
  {
    title: "Layout & Formatting Audit",
    desc: "Detect and fix formatting issues such as tables, text boxes, and complex columns that throw off parsing bots.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
      </svg>
    ),
  },
  {
    title: "AI Experience Enhancer",
    desc: "Rewrite your bullet points using the STAR method automatically tailored to the jobs you are targeting.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
  },
  {
    title: "Real-time Job Matching",
    desc: "Compare your resume directly with active job postings and see a detailed percentage match for each listing.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </svg>
    ),
  },
  {
    title: "PDF/Word Export Templates",
    desc: "Download clean, ATS-compliant formats built on guidelines approved by recruiters across major tech firms.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--background)",
  },
  main: {
    maxWidth: "1440px",
    width: "100%",
    margin: "0 auto",
    padding: "60px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "60px",
  },
  headerSection: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "var(--primary-light)",
    color: "var(--primary)",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: "700",
    marginBottom: "16px",
  },
  title: {
    fontSize: "2.75rem",
    fontWeight: "800",
    color: "var(--text-main)",
    marginBottom: "16px",
    letterSpacing: "-0.5px",
    lineHeight: "1.25",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "var(--text-muted)",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "28px",
  },
  card: {
    padding: "36px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  iconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "var(--primary-light)",
    color: "var(--primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "var(--text-main)",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "var(--text-muted)",
    lineHeight: "1.6",
  },
  ctaSection: {
    textAlign: "center",
    padding: "60px 40px",
    background: "radial-gradient(circle, rgba(14, 165, 233, 0.03) 0%, transparent 70%)",
    borderRadius: "24px",
    border: "1px solid var(--border-color)",
  },
  ctaTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "24px",
  },
  ctaBtn: {
    padding: "12px 28px",
    fontSize: "1rem",
  },
};

export default Features;
