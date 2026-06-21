import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const validateEmailFormat = (value) => {
    if (!value) {
      setEmailError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePasswordFormat = (value) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmailFormat(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      validatePasswordFormat(value);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setApiError("");

    const isEmailValid = validateEmailFormat(email);
    const isPasswordValid = validatePasswordFormat(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://hiresense-ai-75v4.onrender.com/api/users/login/",
        {
          email,
          password
        }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: email.split("@")[0],
          email: email,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setApiError(err.response.data.detail);
      } else {
        setApiError("Authentication failed. Please verify your email and password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <div className="glass-card" style={styles.card}>
        <button className="back-to-home-btn" onClick={() => navigate("/")}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Home
        </button>
        
        {/* LOGO */}
        <div style={styles.logo} onClick={() => navigate("/")}>
          <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", filter: "contrast(1.25) saturate(1.15) brightness(0.9)" }} />
        </div>

        <h1 style={styles.title}>Sign In</h1>
        <p style={styles.subtitle}>Welcome back! Access your resume intelligence dashboard.</p>

        {/* API Error Box */}
        {apiError && (
          <div style={styles.alertBox}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          {/* EMAIL INPUT */}
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
              <span className="required-asterisk">*</span>
            </label>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                id="email-input"
                className={`form-input ${emailError ? "input-error" : ""}`}
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmailFormat(email)}
                autoComplete="email"
                disabled={loading}
              />
            </div>
            {emailError && (
              <span className="error-text">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {emailError}
              </span>
            )}
          </div>

          {/* PASSWORD INPUT */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="form-label" htmlFor="password-input" style={{ marginBottom: 0 }}>
                Password
                <span className="required-asterisk">*</span>
              </label>
              <span style={styles.forgotLink} onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
            </div>
            <div className="input-container">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                id="password-input"
                className={`form-input ${passwordError ? "input-error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePasswordFormat(password)}
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <span className="error-text">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {passwordError}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary"
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg style={styles.spinner} viewBox="0 0 24 24" width="18" height="18">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 30" strokeDashoffset="0"></circle>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p style={styles.signupPrompt}>
          New to HireSense AI?{" "}
          <span style={styles.signupLink} onClick={() => navigate("/register")}>
            Create Account
          </span>
        </p>



      </div>
    </div>
  );
}

export default Login;

const styles = {
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "44px 36px",
    textAlign: "center",
  },

  logo: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "20px",
  },

  logoText: {
    fontFamily: "var(--font-title)",
    fontSize: "1.25rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "var(--text-main)",
  },

  title: {
    fontSize: "1.85rem",
    fontWeight: "800",
    color: "var(--text-main)",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginBottom: "28px",
    lineHeight: "1.5",
  },

  alertBox: {
    backgroundColor: "var(--error-bg)",
    color: "var(--error)",
    border: "1.5px solid var(--error-border)",
    padding: "12px 16px",
    borderRadius: "var(--radius-md)",
    marginBottom: "24px",
    fontSize: "0.825rem",
    fontWeight: "500",
    textAlign: "left",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    lineHeight: "1.4",
  },

  forgotLink: {
    fontSize: "0.8rem",
    color: "var(--primary)",
    fontWeight: "600",
    cursor: "pointer",
  },

  submitBtn: {
    width: "100%",
    marginTop: "20px",
  },

  spinner: {
    animation: "pulse 1s linear infinite",
    marginRight: "8px",
  },

  signupPrompt: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginTop: "24px",
    textAlign: "center",
  },

  signupLink: {
    color: "var(--primary)",
    fontWeight: "700",
    cursor: "pointer",
  },

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    background: "#ffffff",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
  },
};