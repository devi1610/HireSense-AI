import os

css_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\src\index.css"

mobile_css = """
/* ==========================================================================
   MOBILE RESPONSIVENESS OVERRIDES
   ========================================================================== */

@media (max-width: 900px) {
  .hero-grid-mobile {
    grid-template-columns: 1fr !important;
    text-align: center;
  }
  
  .hero-left-mobile {
    align-items: center !important;
  }
  
  .hero-left-mobile h1 {
    font-size: 2.8rem !important;
  }
  
  .hero-left-mobile p {
    font-size: 1rem !important;
    text-align: center;
  }
  
  .cta-group-mobile {
    justify-content: center;
  }
  
  .features-grid-mobile {
    grid-template-columns: 1fr 1fr !important;
  }
  
  .nav-links {
    display: none !important;
  }
  
  .dashboard-grid-mobile {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 768px) {
  .features-grid-mobile {
    grid-template-columns: 1fr !important;
  }
  
  .hero-left-mobile h1 {
    font-size: 2.4rem !important;
  }
  
  .nav-container {
    padding: 0 16px !important;
  }
  
  .nav-actions .nav-btn-link {
    display: none !important;
  }
  
  .hero-section-mobile {
    padding: 20px 16px !important;
  }
  
  .features-section-mobile {
    padding: 30px 16px !important;
  }
  
  .mock-card-mobile {
    padding: 24px 20px !important;
  }
  
  .stats-row-mobile {
    gap: 16px !important;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .stat-val-mobile {
    font-size: 1.5rem !important;
  }
  
  .auth-card-mobile {
    width: 90% !important;
    padding: 30px 24px !important;
  }
  
  .resume-actions-mobile {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .hero-left-mobile h1 {
    font-size: 2rem !important;
  }
  
  .cta-group-mobile {
    flex-direction: column;
    width: 100% !important;
  }
  
  .cta-group-mobile button {
    width: 100% !important;
  }
}
"""

with open(css_path, "a", encoding="utf-8") as f:
    f.write(mobile_css)

print("Mobile CSS appended successfully.")
