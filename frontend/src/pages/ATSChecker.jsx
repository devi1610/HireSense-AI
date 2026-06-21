import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function ATSChecker() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.headerSection}>
          <div style={styles.badge}>ATS AUDITOR</div>
          <h1 style={styles.title}>Free Applicant Tracking System (ATS) Audit</h1>
          <p style={styles.subtitle}>
            Test your resume formatting and content structure against popular parsers like Workday, Taleo, and Greenhouse.
          </p>
        </div>

        <div style={styles.checkerLayout}>
          {/* Left Side: Upload Area Mockup */}
          <div className="glass-card" style={styles.uploadCard}>
            <div style={styles.dropZone} onClick={() => navigate("/register")}>
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ marginBottom: "16px" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
              </svg>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>Drag & Drop your resume</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "20px" }}>Supports PDF, DOCX, or TXT up to 10MB</p>
              <button className="nav-btn-primary" style={{ padding: "8px 20px" }}>Browse Files</button>
            </div>
            
            <div style={styles.featuresRow}>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--success)" strokeWidth="2" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>No signup required for basic scan</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--success)" strokeWidth="2" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Secure SSL encryption for privacy</span>
              </div>
            </div>
          </div>

          {/* Right Side: What we analyze details */}
          <div style={styles.detailsPanel}>
            <h2 style={styles.sectionTitle}>What does our ATS scanner check?</h2>
            
            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNum}>1</div>
                <div>
                  <h4 style={styles.stepTitle}>Keyword Density & Match</h4>
                  <p style={styles.stepDesc}>We compare the density of industry-relevant skills and tools against high-performing developer profiles in our database.</p>
                </div>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNum}>2</div>
                <div>
                  <h4 style={styles.stepTitle}>File Parser Compatibility</h4>
                  <p style={styles.stepDesc}>We test if common parsers can read your fonts, bullet points, headers, and contact details correctly without corrupting data.</p>
                </div>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNum}>3</div>
                <div>
                  <h4 style={styles.stepTitle}>Structure & Section Analysis</h4>
                  <p style={styles.stepDesc}>We verify the structure of your Experience, Education, and Skills headers to make sure ATS systems categorize them correctly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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
  checkerLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    alignItems: "center",
  },
  uploadCard: {
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  dropZone: {
    border: "2px dashed var(--border-color)",
    borderRadius: "14px",
    padding: "48px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "#fafcfd",
    transition: "border-color var(--transition-normal)",
  },
  featuresRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "var(--text-muted)",
  },
  detailsPanel: {
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    fontWeight: "800",
    marginBottom: "32px",
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  step: {
    display: "flex",
    gap: "20px",
  },
  stepNum: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "var(--primary-light)",
    color: "var(--primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.95rem",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "var(--text-main)",
    marginBottom: "6px",
  },
  stepDesc: {
    fontSize: "0.925rem",
    color: "var(--text-muted)",
    lineHeight: "1.5",
  },
};

export default ATSChecker;
