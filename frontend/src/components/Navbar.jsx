import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="main-header">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "40px", width: "auto", display: "block", objectFit: "contain" }} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <span className={`nav-link-item ${isActive("/features") ? "active" : ""}`} onClick={() => handleNav("/features")}>Features</span>
          <span className={`nav-link-item ${isActive("/ats-checker") ? "active" : ""}`} onClick={() => handleNav("/ats-checker")}>ATS Checker</span>
          <span className={`nav-link-item ${isActive("/ai-recommendations") ? "active" : ""}`} onClick={() => handleNav("/ai-recommendations")}>AI Recommendations</span>
          <span className={`nav-link-item ${isActive("/pricing") ? "active" : ""}`} onClick={() => handleNav("/pricing")}>Pricing</span>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button className="nav-btn-link" onClick={() => handleNav("/login")}>Sign In</button>
          <button className="nav-btn-primary" onClick={() => handleNav("/register")}>Get Started</button>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <span className={`mobile-nav-item ${isActive("/features") ? "active" : ""}`} onClick={() => handleNav("/features")}>Features</span>
          <span className={`mobile-nav-item ${isActive("/ats-checker") ? "active" : ""}`} onClick={() => handleNav("/ats-checker")}>ATS Checker</span>
          <span className={`mobile-nav-item ${isActive("/ai-recommendations") ? "active" : ""}`} onClick={() => handleNav("/ai-recommendations")}>AI Recommendations</span>
          <span className={`mobile-nav-item ${isActive("/pricing") ? "active" : ""}`} onClick={() => handleNav("/pricing")}>Pricing</span>
          <div className="mobile-menu-actions">
            <button className="nav-btn-link" style={{ width: "100%" }} onClick={() => handleNav("/login")}>Sign In</button>
            <button className="nav-btn-primary" style={{ width: "100%" }} onClick={() => handleNav("/register")}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
