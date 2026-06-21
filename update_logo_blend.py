import os
import re

files_to_update = [
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\components\\Navbar.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Dashboard.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\NotFound.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Login.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Register.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\UploadResume.jsx"
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We replace the style object to add mixBlendMode: 'multiply'
    new_content = content.replace(
        'style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }}',
        'style={{ height: "42px", width: "auto", display: "block", objectFit: "contain", mixBlendMode: "multiply" }}'
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Updated {file_path}")
