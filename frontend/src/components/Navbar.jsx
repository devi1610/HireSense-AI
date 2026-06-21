import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="main-header">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", filter: "contrast(1.25) saturate(1.15) brightness(0.9)" }} />
        </div>

        <nav className="nav-links">
          <span className={`nav-link-item ${isActive("/features") ? "active" : ""}`} onClick={() => navigate("/features")}>Features</span>
          <span className={`nav-link-item ${isActive("/ats-checker") ? "active" : ""}`} onClick={() => navigate("/ats-checker")}>ATS Checker</span>
          <span className={`nav-link-item ${isActive("/ai-recommendations") ? "active" : ""}`} onClick={() => navigate("/ai-recommendations")}>AI Recommendations</span>
          <span className={`nav-link-item ${isActive("/pricing") ? "active" : ""}`} onClick={() => navigate("/pricing")}>Pricing</span>
        </nav>

        <div className="nav-actions">
          <button className="nav-btn-link" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="nav-btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
