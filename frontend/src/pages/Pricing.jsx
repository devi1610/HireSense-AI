import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.headerSection}>
          <div style={styles.badge}>PRICING PLANS</div>
          <h1 style={styles.title}>Simple, Transparent Pricing</h1>
          <p style={styles.subtitle}>
            Choose the plan that fits your career goals. Optimize your resume and stand out to recruiters today.
          </p>
        </div>

        <div style={styles.pricingGrid} className="pricing-grid">
          {/* Card 1: Free */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.planName}>Basic</h3>
              <p style={styles.planDesc}>For casual resume checks.</p>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.price}>0</span>
                <span style={styles.period}>/mo</span>
              </div>
            </div>
            
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>3 Free ATS Checks / Month</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Basic Keyword Analysis</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Standard PDF Export</span>
              </div>
            </div>

            <button className="btn btn-secondary" style={styles.btn} onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>

          {/* Card 2: Pro */}
          <div className="glass-card" style={{ ...styles.card, border: "2px solid var(--primary)", position: "relative" }}>
            <div style={styles.popularBadge}>MOST POPULAR</div>
            <div style={styles.cardHeader}>
              <h3 style={styles.planName}>Pro</h3>
              <p style={styles.planDesc}>For active job seekers.</p>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.price}>12</span>
                <span style={styles.period}>/mo</span>
              </div>
            </div>
            
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <strong>Unlimited ATS Checks</strong>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Full Skill Gap Suggestions</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI Bullet Point Rewriter</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Live Active Job Matching</span>
              </div>
            </div>

            <button className="nav-btn-primary btn" style={styles.btn} onClick={() => navigate("/register")}>
              Upgrade to Pro
            </button>
          </div>

          {/* Card 3: Enterprise */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.planName}>Enterprise</h3>
              <p style={styles.planDesc}>For schools and institutions.</p>
              <div style={styles.priceContainer}>
                <span style={styles.price} style={{ fontSize: "2rem", fontWeight: 800 }}>Custom</span>
              </div>
            </div>
            
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>All Pro Features included</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>API Access for Batch Audits</span>
              </div>
              <div style={styles.featureItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ marginRight: "8px" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Dedicated Success Manager</span>
              </div>
            </div>

            <button className="btn btn-secondary" style={styles.btn} onClick={() => navigate("/register")}>
              Contact Sales
            </button>
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
    maxWidth: "1280px",
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
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
    alignItems: "stretch",
  },
  card: {
    padding: "40px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    background: "#ffffff",
  },
  popularBadge: {
    position: "absolute",
    top: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "var(--primary)",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "700",
    padding: "6px 16px",
    borderRadius: "100px",
    boxShadow: "var(--shadow-sm)",
  },
  cardHeader: {
    marginBottom: "28px",
  },
  planName: {
    fontSize: "1.45rem",
    fontWeight: "800",
    color: "var(--text-main)",
    marginBottom: "8px",
  },
  planDesc: {
    fontSize: "0.875rem",
    color: "var(--text-light)",
    marginBottom: "20px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  currency: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text-main)",
    position: "relative",
    top: "-10px",
  },
  price: {
    fontSize: "3.25rem",
    fontWeight: "800",
    color: "var(--text-main)",
    letterSpacing: "-1px",
  },
  period: {
    fontSize: "0.875rem",
    color: "var(--text-light)",
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    textAlign: "left",
    marginBottom: "36px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.925rem",
    color: "var(--text-main)",
  },
  btn: {
    width: "100%",
  },
};

export default Pricing;
