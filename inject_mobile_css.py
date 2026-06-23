css_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\src\index.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the start of old mobile media queries
old_start = content.find("@media (max-width: 900px)")

# Get the core CSS (before old mobile queries)
content_base = content[:old_start]

mobile_css = """
/* ==========================================================================
   HAMBURGER / MOBILE MENU STYLES
   ========================================================================== */

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-main);
  padding: 6px;
  border-radius: 8px;
  transition: background var(--transition-fast);
  align-items: center;
  justify-content: center;
}

.hamburger-btn:hover {
  background: var(--primary-light);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 12px 16px 20px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 999;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mobile-nav-item {
  padding: 14px 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: var(--primary);
}

.mobile-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

/* ==========================================================================
   RESPONSIVE BREAKPOINTS
   ========================================================================== */

/* ---- Tablets (1024px) ---- */
@media (max-width: 1024px) {
  .hero-grid-mobile {
    grid-template-columns: 1fr 1fr !important;
    gap: 40px !important;
  }
  
  .features-grid-mobile {
    grid-template-columns: 1fr 1fr !important;
  }

  .pricing-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 20px !important;
  }
}

/* ---- Small Tablets / Large Phones (900px) ---- */
@media (max-width: 900px) {
  .hamburger-btn {
    display: flex !important;
  }

  .nav-links {
    display: none !important;
  }

  .nav-actions {
    display: none !important;
  }

  .mobile-menu {
    display: flex !important;
  }

  .hero-grid-mobile {
    grid-template-columns: 1fr !important;
    text-align: center;
    gap: 32px !important;
  }

  .hero-left-mobile {
    align-items: center !important;
  }

  .cta-group-mobile {
    justify-content: center !important;
    flex-wrap: wrap;
  }

  .mock-card-mobile {
    max-width: 480px !important;
    margin: 0 auto;
    padding: 28px 24px !important;
  }

  .features-grid-mobile {
    grid-template-columns: 1fr !important;
  }

  .dashboard-grid-mobile {
    grid-template-columns: 1fr !important;
  }

  .pricing-grid {
    grid-template-columns: 1fr !important;
    max-width: 420px;
    margin: 0 auto;
  }
}

/* ---- Phones (768px) ---- */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px !important;
  }

  .hero-section-mobile {
    padding: 24px 16px 32px !important;
  }

  .hero-left-mobile h1 {
    font-size: 2.4rem !important;
  }

  .hero-left-mobile p {
    font-size: 1rem !important;
  }

  .features-section-mobile {
    padding: 30px 16px !important;
  }

  .stats-row-mobile {
    gap: 16px !important;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stat-val-mobile {
    font-size: 1.6rem !important;
  }

  .auth-card-mobile {
    width: 92% !important;
    padding: 28px 20px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .resume-actions-mobile {
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 6px !important;
  }

  .dashboard-grid-mobile {
    grid-template-columns: 1fr !important;
  }

  .dashboard-main {
    padding: 16px !important;
  }

  .dashboard-grid {
    gap: 16px !important;
  }

  .section-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 12px !important;
  }

  .pricing-grid {
    grid-template-columns: 1fr !important;
  }

  /* Upload page */
  .upload-container {
    padding: 20px 16px !important;
    max-width: 100% !important;
  }

  /* Features, ATS, AI pages */
  .page-main-container {
    padding: 24px 16px !important;
  }

  .features-cards-grid,
  .ats-grid,
  .ai-grid {
    grid-template-columns: 1fr !important;
  }
}

/* ---- Small Phones (480px) ---- */
@media (max-width: 480px) {
  .hero-left-mobile h1 {
    font-size: 1.9rem !important;
  }

  .cta-group-mobile {
    flex-direction: column !important;
    width: 100% !important;
    align-items: stretch !important;
  }

  .cta-group-mobile button {
    width: 100% !important;
    justify-content: center !important;
  }

  .mock-card-mobile {
    padding: 20px 16px !important;
  }

  .auth-card-mobile {
    width: 96% !important;
    padding: 24px 16px !important;
  }

  .stat-val-mobile {
    font-size: 1.4rem !important;
  }

  .dashboard-nav-container {
    padding: 0 12px !important;
  }

  .jobs-match-grid {
    grid-template-columns: 1fr !important;
  }
}

/* Hide scrollbars aesthetically */
::-webkit-scrollbar {
  display: none;
  width: 0px;
  background: transparent;
}
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
"""

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content_base + mobile_css)

print("Comprehensive mobile CSS written successfully!")
print(f"File size: {len(content_base + mobile_css)} bytes")
