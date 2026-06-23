import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page} className="grid-bg">
      {/* Background Glow Blobs */}
      <div className="glow-blob" style={{ position: "absolute", top: "10%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>
      <div className="glow-blob" style={{ position: "absolute", top: "40%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>

      <Navbar />

      {/* HERO SECTION */}
      <main style={styles.heroSection} className="hero-section-mobile">
        <div style={styles.heroGrid} className="hero-grid-mobile">
          {/* Left Content */}
          <div style={styles.heroLeft} className="fade-in-up hero-left-mobile">
            <div style={styles.badge}>
              <span style={styles.badgePulse}></span>
              Powered by GPT-4o & Claude 3.5
            </div>
            
            <h1 style={styles.title}>
              AI-Powered <br />
              <span className="text-gradient" style={{ fontWeight: 800 }}>Resume Intelligence</span>
            </h1>

            <p style={styles.subtitle}>
              Upload your resume and get an instant ATS score, discover missing keywords, and match with the best-fitting jobs in seconds.
            </p>

            <div style={styles.ctaGroup} className="cta-group-mobile">
              <button
                style={styles.ctaPrimary}
                onClick={() => navigate("/register")}
              >
                Upload Resume
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                style={styles.ctaSecondary}
                onClick={() => navigate("/login")}
              >
                View Dashboard
              </button>
            </div>

            <div style={styles.statsRow} className="stats-row-mobile">
              <div style={styles.statItem}>
                <span style={styles.statVal} className="stat-val-mobile">98%</span>
                <span style={styles.statLabel}>ATS Accuracy</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <span style={styles.statVal} className="stat-val-mobile">10k+</span>
                <span style={styles.statLabel}>Resumes Analyzed</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div style={styles.heroRight} className="fade-in-up">
            <div className="premium-shadow-card mock-card-mobile" style={styles.mockCard}>
              {/* Applicant Header */}
              <div style={styles.mockHeader}>
                <div style={styles.mockUser}>
                  <div style={styles.avatar}>JS</div>
                  <div>
                    <h4 style={styles.mockName}>John Smith</h4>
                    <p style={styles.mockSub}>Senior Software Engineer</p>
                  </div>
                </div>
                
                {/* SVG Circular Gauge */}
                <div style={styles.circularGauge}>
                  <svg width="50" height="50" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--primary)"
                      strokeDasharray="82, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <text x="18" y="21.5" style={styles.gaugeText}>82%</text>
                  </svg>
                </div>
              </div>

              <div style={styles.mockDivider}></div>

              {/* Verified Sections List */}
              <div style={styles.statusList}>
                <div style={styles.statusItem}>
                  <span style={styles.statusDotValid}></span>
                  <span style={styles.statusText}>Contact Details</span>
                  <span style={styles.statusBadgeGreen}>Verified</span>
                </div>
                <div style={styles.statusItem}>
                  <span style={styles.statusDotValid}></span>
                  <span style={styles.statusText}>Formatting & Layout</span>
                  <span style={styles.statusBadgeGreen}>Optimized</span>
                </div>
                <div style={styles.statusItem}>
                  <span style={styles.statusDotWarning}></span>
                  <span style={styles.statusText}>Keywords Matching</span>
                  <span style={styles.statusBadgeOrange}>3 Missing</span>
                </div>
              </div>

              <div style={styles.mockDivider}></div>

              {/* Progress Breakdown */}
              <div style={styles.metricsContainer}>
                {/* Metric 1 */}
                <div style={styles.metricRow}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.metricLabelRow}>
                      <span style={styles.metricTitle}>Keyword Strength</span>
                      <span style={styles.metricPercent}>70%</span>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div style={{ ...styles.progressBarFill, width: "70%", backgroundColor: "var(--primary)" }}></div>
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div style={styles.metricRow}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.metricLabelRow}>
                      <span style={styles.metricTitle}>Experience Impact</span>
                      <span style={styles.metricPercent}>88%</span>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div style={{ ...styles.progressBarFill, width: "88%", backgroundColor: "var(--success)" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.mockDivider}></div>

              {/* Missing Skills Tags */}
              <div style={{ textAlign: "left" }}>
                <span style={styles.blockTitle}>Missing Keywords Detected</span>
                <div style={styles.tagGroup}>
                  <span style={styles.tag}>Docker</span>
                  <span style={styles.tag}>GraphQL</span>
                  <span style={styles.tag}>CI/CD</span>
                </div>
              </div>

              {/* Job Matches Footer */}
              <div style={styles.matchFooter}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: "500" }}>Smart Match Fit</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--success)", fontWeight: "700" }}>24 Live Jobs Matched</span>
                </div>
                <div style={styles.employerIcons}>
                  <span style={styles.employerCircle}>G</span>
                  <span style={styles.employerCircle}>S</span>
                  <span style={styles.employerCircle}>A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection} className="features-section-mobile">
        <h2 style={styles.featuresHeading}>Everything you need to beat the ATS</h2>
        <p style={styles.featuresSub}>Our platform is optimized for candidates aiming for Tier 1 tech jobs.</p>
        
        <div style={styles.featuresGrid} className="features-grid-mobile">
          {/* Card 1 */}
          <div className="glass-card" style={styles.featureCard}>
            <div style={styles.featureIconBox}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>ATS Score Analysis</h3>
            <p style={styles.featureDesc}>Get an instant score based on resume parser rules used by Fortune 500 companies.</p>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={styles.featureCard}>
            <div style={{ ...styles.featureIconBox, backgroundColor: "var(--primary-glow)", color: "var(--primary)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Missing Skills Detection</h3>
            <p style={styles.featureDesc}>Our AI identifies structural and technical gaps in your resume relative to target roles.</p>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={styles.featureCard}>
            <div style={{ ...styles.featureIconBox, backgroundColor: "rgba(16, 185, 129, 0.08)", color: "var(--success)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Smart Job Matching</h3>
            <p style={styles.featureDesc}>Automatically pull current live job descriptions and compare your fit level score instantly.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={{ fontSize: "0.875rem" }}>&copy; {new Date().getFullYear()} HireSense AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.05), transparent 40%), var(--background)",
    padding: "0",
    position: "relative",
    overflowX: "hidden",
  },



  heroSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "40px 32px",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "60px",
    alignItems: "center",
    width: "100%",
  },

  heroLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "var(--primary-light)",
    color: "var(--primary-hover)",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "24px",
    border: "1px solid rgba(14, 165, 233, 0.15)",
  },

  badgePulse: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    display: "inline-block",
    boxShadow: "0 0 0 4px rgba(14, 165, 233, 0.3)",
  },

  title: {
    fontSize: "3.75rem",
    lineHeight: "1.15",
    letterSpacing: "-2.2px",
    marginBottom: "20px",
    color: "var(--text-main)",
  },

  subtitle: {
    fontSize: "1.15rem",
    color: "var(--text-muted)",
    marginBottom: "36px",
    maxWidth: "520px",
    lineHeight: "1.7",
  },

  ctaGroup: {
    display: "flex",
    gap: "16px",
    width: "100%",
    maxWidth: "420px",
    marginBottom: "48px",
  },

  ctaPrimary: {
    flex: 1,
    justifyContent: "center",
    padding: "13px 24px",
    background: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "all var(--transition-normal)",
  },

  ctaSecondary: {
    flex: 1,
    justifyContent: "center",
    padding: "13px 24px",
    background: "white",
    color: "var(--text-main)",
    border: "1.5px solid var(--border-color)",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all var(--transition-normal)",
  },

  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
  },

  statVal: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "var(--text-main)",
    fontFamily: "var(--font-title)",
  },

  statLabel: {
    fontSize: "0.825rem",
    color: "var(--text-light)",
    fontWeight: "500",
    marginTop: "2px",
  },

  statDivider: {
    width: "1px",
    height: "36px",
    backgroundColor: "var(--border-color)",
  },

  heroRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  mockCard: {
    padding: "64px",
    borderRadius: "40px",
    background: "#ffffff",
    width: "100%",
    maxWidth: "640px",
    textAlign: "center",
  },

  mockHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mockUser: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textAlign: "left",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "var(--primary-light)",
    color: "var(--primary-hover)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.95rem",
  },

  mockName: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "var(--text-main)",
  },

  mockSub: {
    fontSize: "0.775rem",
    color: "var(--text-light)",
    marginTop: "2px",
  },

  circularGauge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  gaugeText: {
    fontFamily: "var(--font-title)",
    fontSize: "8.5px",
    fontWeight: "800",
    fill: "var(--text-main)",
    textAnchor: "middle",
  },

  mockDivider: {
    height: "1px",
    backgroundColor: "var(--border-color)",
    margin: "18px 0",
  },

  statusList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  statusItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "var(--text-main)",
  },

  statusDotValid: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "var(--success)",
    marginRight: "10px",
  },

  statusDotWarning: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "var(--warning)",
    marginRight: "10px",
  },

  statusText: {
    flex: 1,
    textAlign: "left",
    color: "var(--text-muted)",
  },

  statusBadgeGreen: {
    fontSize: "0.75rem",
    padding: "3px 8px",
    background: "var(--success-bg)",
    color: "var(--success-hover)",
    borderRadius: "100px",
    fontWeight: "600",
  },

  statusBadgeOrange: {
    fontSize: "0.75rem",
    padding: "3px 8px",
    background: "var(--warning-bg)",
    color: "var(--warning)",
    borderRadius: "100px",
    fontWeight: "600",
  },

  metricsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  metricRow: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  metricLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    fontWeight: "600",
  },

  metricTitle: {
    color: "var(--text-muted)",
  },

  metricPercent: {
    color: "var(--text-main)",
  },

  progressBarBg: {
    height: "6px",
    backgroundColor: "var(--border-color)",
    borderRadius: "3px",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: "3px",
  },

  blockTitle: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "var(--text-muted)",
    marginBottom: "10px",
  },

  tagGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  tag: {
    fontSize: "0.75rem",
    padding: "4px 10px",
    backgroundColor: "var(--error-bg)",
    color: "var(--error)",
    border: "1px solid var(--error-border)",
    borderRadius: "6px",
    fontWeight: "600",
  },

  matchFooter: {
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px dashed var(--border-color)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
  },

  employerIcons: {
    display: "flex",
    alignItems: "center",
  },

  employerCircle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#f1f5f9",
    color: "var(--text-muted)",
    fontSize: "0.7rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #ffffff",
    marginLeft: "-6px",
  },

  featuresSection: {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "50px 32px",
    textAlign: "center",
    width: "100%",
  },

  featuresHeading: {
    fontSize: "2.25rem",
    letterSpacing: "-0.5px",
    marginBottom: "12px",
  },

  featuresSub: {
    fontSize: "1.05rem",
    color: "var(--text-muted)",
    marginBottom: "52px",
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
  },

  featureCard: {
    padding: "36px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  featureIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "var(--primary-glow)",
    color: "var(--primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },

  featureTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "12px",
  },

  featureDesc: {
    fontSize: "0.95rem",
    color: "var(--text-muted)",
    lineHeight: "1.6",
  },

  footer: {
    maxWidth: "1440px",
    margin: "0 auto",
    width: "100%",
    padding: "40px 32px",
    borderTop: "1px solid var(--border-color)",
    textAlign: "center",
    color: "var(--text-light)",
  },
};