import os

css_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\src\index.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

marker = "/* ==========================================================================\n   MOBILE RESPONSIVENESS OVERRIDES\n   ========================================================================== */"

if marker in content:
    content_before = content.split(marker)[0]
else:
    content_before = content

mobile_css = marker + """

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
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
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

/* Hide scrollbars aesthetically but maintain scroll functionality if needed */
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
    f.write(content_before + mobile_css)

print("CSS Repaired successfully.")
