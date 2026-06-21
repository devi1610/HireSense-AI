import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AIRecommendations() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.headerSection}>
          <div style={styles.badge}>RECOM ENGINE</div>
          <h1 style={styles.title}>AI-Driven Resume & Career Recommendations</h1>
          <p style={styles.subtitle}>
            Empower your application with smart suggestions tailored to your background, identifying career trends and matching job roles.
          </p>
        </div>

        <div style={styles.recomGrid}>
          {/* Card 1 */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.iconBox}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Salary Booster Suggestions</h3>
            <p style={styles.cardDesc}>
              Discover which skills, tools, and certifications command the highest premiums in your domain, and see how to add them.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.iconBox}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M3 20v-8a2 2 0 0 1 2-2h4M3 12h6M19 16V4a2 2 0 0 0-2-2H9v14M9 16h10"></path>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Industry Trend Insights</h3>
            <p style={styles.cardDesc}>
              Our AI tracks recruiter search patterns weekly. We alert you when a technical tool gains popularity, keeping your profile competitive.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.iconBox}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Recruiter Shield Check</h3>
            <p style={styles.cardDesc}>
              Scans your grammar, voice tone, and length. Flags phrases that sound passive or repetitive, replacing them with action verbs.
            </p>
          </div>
        </div>

        <div style={styles.showcase}>
          <div style={styles.showcaseLeft}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", marginBottom: "16px" }}>See how the AI rewrites your experience</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "24px" }}>
              Passive descriptions fail to impress recruiters. HireSense AI highlights passive tasks and converts them into action-oriented statements showing direct results and metrics.
            </p>
            <button className="nav-btn-primary" onClick={() => navigate("/register")}>Optimize My Profile</button>
          </div>
          
          <div style={styles.showcaseRight}>
            <div className="glass-card" style={styles.compareCard}>
              <div style={styles.compareRow}>
                <span style={styles.badgeRed}>Original</span>
                <p style={styles.compareText}>"Responsible for managing the team and writing React code for the frontend."</p>
              </div>
              <div style={{ height: "1px", backgroundColor: "var(--border-color)", margin: "16px 0" }}></div>
              <div style={styles.compareRow}>
                <span style={styles.badgeGreen}>AI Recommended</span>
                <p style={styles.compareText}>"Led a team of 4 engineers to deliver 12 React features, reducing customer churn rate by 14%."</p>
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
  recomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
  },
  card: {
    padding: "32px",
    textAlign: "left",
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
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "var(--text-main)",
  },
  cardDesc: {
    fontSize: "0.925rem",
    color: "var(--text-muted)",
    lineHeight: "1.5",
  },
  showcase: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "60px",
    alignItems: "center",
  },
  showcaseLeft: {
    textAlign: "left",
  },
  showcaseRight: {
    display: "flex",
    justifyContent: "center",
  },
  compareCard: {
    padding: "28px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "left",
    background: "#ffffff",
  },
  compareRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  badgeRed: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontSize: "0.7rem",
    fontWeight: "700",
    padding: "3px 8px",
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    borderRadius: "6px",
  },
  badgeGreen: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontSize: "0.7rem",
    fontWeight: "700",
    padding: "3px 8px",
    backgroundColor: "#ecfdf5",
    color: "#10b981",
    borderRadius: "6px",
  },
  compareText: {
    fontSize: "0.9rem",
    color: "var(--text-main)",
    fontStyle: "italic",
    lineHeight: "1.4",
  },
};

export default AIRecommendations;
