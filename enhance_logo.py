import os

files_to_update = [
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\components\\Navbar.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Dashboard.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\NotFound.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Login.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Register.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\UploadResume.jsx"
]

replacement = '<img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", filter: "contrast(1.25) saturate(1.15) brightness(0.9)" }} />'

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    new_content = content.replace(
        '<img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }} />',
        replacement
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Enhanced logo contrast in {file_path}")
