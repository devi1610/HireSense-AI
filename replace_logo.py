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

replacement = '<img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }} />'

# The regex should match from <svg viewBox="0 0 190 32" ... to </svg>
pattern = re.compile(r'<svg viewBox="0 0 190 32".*?</svg>', re.DOTALL)

for file_path in files_to_update:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, does not exist.")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if pattern.search(content):
        new_content = pattern.sub(replacement, content)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Replaced logo in {file_path}")
    else:
        print(f"No match found in {file_path}")
