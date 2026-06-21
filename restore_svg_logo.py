import os

files_to_update = [
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\components\\Navbar.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Dashboard.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\NotFound.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Login.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Register.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\UploadResume.jsx"
]

svg_logo = """<svg viewBox="0 0 190 32" width="190" height="32" style={{ display: "block" }}>
  <defs>
    <linearGradient id="logoAiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0ea5e9" />
      <stop offset="100%" stopColor="#0284c7" />
    </linearGradient>
  </defs>
  
  {/* Robot Head Icon */}
  <g transform="scale(0.32)">
    <path d="M25,50 C25,25 75,25 75,50" stroke="url(#logoAiGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <line x1="50" y1="30" x2="50" y2="15" stroke="url(#logoAiGrad)" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="12" r="6" fill="url(#logoAiGrad)"/>
    <rect x="16" y="42" width="10" height="20" rx="5" fill="url(#logoAiGrad)"/>
    <rect x="74" y="42" width="10" height="20" rx="5" fill="url(#logoAiGrad)"/>
    <rect x="22" y="47" width="4" height="10" rx="2" fill="#ffffff"/>
    <rect x="74" y="47" width="4" height="10" rx="2" fill="#ffffff"/>
    <rect x="26" y="32" width="48" height="38" rx="14" fill="#ffffff" stroke="url(#logoAiGrad)" strokeWidth="6"/>
    <rect x="34" y="40" width="32" height="22" rx="8" fill="#1e293b"/>
    <path d="M40,51 C41,49 43,49 44,51" stroke="url(#logoAiGrad)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M56,51 C57,49 59,49 60,51" stroke="url(#logoAiGrad)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M46,56 C48,57.5 52,57.5 54,56" stroke="url(#logoAiGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </g>

  {/* Typography */}
  <text x="38" y="23" fontFamily="var(--font-title)" fontWeight="800" fontSize="20" fill="var(--text-main)" letterSpacing="-0.8px">
    HireSense
  </text>

  {/* NEW Cloud Ai Graphic */}
  <g transform="translate(136, 0)">
    <path d="M 16,28 C 2,28 -2,12 10,6 C 18,-2 32,0 36,8 C 48,10 48,22 42,26 C 36,30 28,30 28,24" fill="none" stroke="#106494" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="8" cy="12" r="2.5" fill="#106494" />
    <circle cx="34" cy="12" r="2.5" fill="#106494" />
    <circle cx="43" cy="14" r="2" fill="#fff" stroke="#106494" strokeWidth="1.5" />
    <circle cx="10" cy="23" r="1.5" fill="#fff" stroke="#106494" strokeWidth="1.5" />
    <text x="24" y="24" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#106494" textAnchor="middle" letterSpacing="-1px">Ai</text>
  </g>
</svg>"""

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We replace the img tag with the SVG
    new_content = content.replace(
        '<img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }} />',
        svg_logo
    )
    
    # Just in case some have the multiply blend mode left
    new_content = new_content.replace(
        '<img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", mixBlendMode: "multiply" }} />',
        svg_logo
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Injected SVG logo into {file_path}")
