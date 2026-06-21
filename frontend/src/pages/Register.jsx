import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Status/Alert Message States
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Validation Errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  // Password Strength Criteria Checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const calculateStrength = () => {
    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    return score;
  };

  const getStrengthClass = () => {
    const score = calculateStrength();
    if (score === 0) return "";
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  const getStrengthText = () => {
    const score = calculateStrength();
    if (score === 0) return "";
    if (score <= 2) return "Weak Password";
    if (score <= 4) return "Medium Strength";
    return "Strong Password";
  };

  // Validators
  const validateName = (val) => {
    if (!val.trim()) {
      setNameError("Full name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (val) => {
    if (!val) {
      setEmailError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("Password is required");
      return false;
    }
    if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (val, passVal) => {
    if (!val) {
      setConfirmPasswordError("Confirm password is required");
      return false;
    }
    if (val !== passVal) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setTermsError("");

    // Validate All Fields
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!agreeTerms) {
      setTermsError("You must agree to the Terms & Privacy Policy");
    }

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid || !agreeTerms) {
      return;
    }

    // Require medium/strong password strength
    if (calculateStrength() < 3) {
      setPasswordError("Please create a stronger password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://hiresense-ai-75v4.onrender.com/api/users/register/",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      setIsError(false);
      setMessage("Account created successfully! Redirecting to login... 🚀");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsError(true);
      const errorData = err.response?.data;
      if (errorData?.email) {
        setMessage("This email is already registered. Please login.");
      } else {
        setMessage("Registration failed. Please check details and try again.");
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

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join HireSense AI and analyze your resumes for ATS score metrics</p>

        {/* Alerts Banner */}
        {message && (
          <div style={isError ? styles.alertError : styles.alertSuccess}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              {isError ? (
                <>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </>
              ) : (
                <polyline points="16 9 11 14 8 11"></polyline>
              )}
            </svg>
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleRegister} noValidate>
          <div className="register-grid">
            {/* Column 1: Info */}
            <div>
              {/* FULL NAME INPUT */}
              <div className="form-group">
                <label className="form-label" htmlFor="fullname-input">
                  Full Name<span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    id="fullname-input"
                    className={`form-input ${nameError ? "input-error" : ""}`}
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) validateName(e.target.value);
                    }}
                    onBlur={() => validateName(name)}
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
                {nameError && <span className="error-text">{nameError}</span>}
              </div>

              {/* EMAIL INPUT */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="email-input">
                  Email Address<span className="required-asterisk">*</span>
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
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => validateEmail(email)}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {emailError && <span className="error-text">{emailError}</span>}
              </div>
            </div>

            {/* Column 2: Credentials */}
            <div>
              {/* PASSWORD INPUT */}
              <div className="form-group">
                <label className="form-label" htmlFor="pass-input">
                  Password<span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="pass-input"
                    className={`form-input ${passwordError ? "input-error" : ""}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                      if (confirmPassword && confirmPasswordError) {
                        validateConfirmPassword(confirmPassword, e.target.value);
                      }
                    }}
                    onBlur={() => validatePassword(password)}
                    autoComplete="new-password"
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

                {/* REAL-TIME STRENGTH METER */}
                {password && (
                  <div className="strength-container">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={styles.strengthLabelText}>Strength:</span>
                      <span style={{ ...styles.strengthValueText, color: `var(--${getStrengthClass() || "text-light"})` }}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="strength-bar-wrapper">
                      <div className={`strength-bar ${getStrengthClass()}`}></div>
                    </div>
                  </div>
                )}
                {passwordError && <span className="error-text">{passwordError}</span>}
              </div>

              {/* CONFIRM PASSWORD INPUT */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="confirm-input">
                  Confirm Password<span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="confirm-input"
                    className={`form-input ${confirmPasswordError ? "input-error" : ""}`}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) validateConfirmPassword(e.target.value, password);
                    }}
                    onBlur={() => validateConfirmPassword(confirmPassword, password)}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
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
                {confirmPasswordError && <span className="error-text">{confirmPasswordError}</span>}
              </div>
            </div>
          </div>

          {/* TERMS CHECKBOX */}
          <div style={{ marginTop: "24px", marginBottom: "24px" }}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (e.target.checked) setTermsError("");
                }}
                disabled={loading}
              />
              <span>
                I agree to the <span style={{ color: "var(--primary)", fontWeight: "700" }}>Terms</span> and <span style={{ color: "var(--primary)", fontWeight: "700" }}>Privacy Policy</span>.
              </span>
            </label>
            {termsError && <span className="error-text">{termsError}</span>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.loginPrompt}>
          Already have an account?{" "}
          <span style={styles.loginLink} onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>



      </div>
    </div>
  );
}

export default Register;

const styles = {
  card: {
    width: "100%",
    maxWidth: "760px",
    padding: "44px 48px",
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

  alertError: {
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

  alertSuccess: {
    backgroundColor: "var(--success-bg)",
    color: "var(--success-hover)",
    border: "1.5px solid var(--success-border)",
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

  strengthLabelText: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontWeight: "600",
  },

  strengthValueText: {
    fontSize: "0.75rem",
    fontWeight: "700",
  },

  loginPrompt: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginTop: "24px",
    textAlign: "center",
  },

  loginLink: {
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