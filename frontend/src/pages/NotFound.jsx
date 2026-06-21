import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div className="glass-card" style={styles.card}>
        {/* LOGO */}
        <div style={styles.logo} onClick={() => navigate("/")}>
          <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", filter: "contrast(1.25) saturate(1.15) brightness(0.9)" }} />
        </div>

        {/* 404 WARNING IMAGE */}
        <div style={styles.warningContainer}>
          <svg viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.warningIcon}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <h2 style={styles.errorTitle}>404</h2>
        </div>

        <h3 style={styles.subHeading}>Page Not Found</h3>
        <p style={styles.description}>
          We couldn't find the page you were looking for. Please check the URL or return to the homepage.
        </p>

        {/* BUTTON */}
        <button
          className="btn btn-primary"
          style={styles.homeBtn}
          onClick={() => navigate("/")}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Return to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    padding: "36px 40px",
    textAlign: "center",
  },

  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    marginBottom: "36px",
  },

  logoText: {
    fontFamily: "var(--font-title)",
    fontSize: "1.25rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "var(--text-main)",
  },

  warningContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },

  warningIcon: {
    color: "var(--primary)",
    marginBottom: "16px",
  },

  errorTitle: {
    fontFamily: "var(--font-title)",
    fontSize: "4.5rem",
    fontWeight: "800",
    color: "var(--primary)",
    lineHeight: "1",
    letterSpacing: "-1px",
  },

  subHeading: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text-main)",
    marginBottom: "10px",
  },

  description: {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    marginBottom: "32px",
    lineHeight: "1.6",
  },

  homeBtn: {
    justifyContent: "center",
  },
};
