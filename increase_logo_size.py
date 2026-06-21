import os

files_to_update = [
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\components\\Navbar.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Dashboard.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\NotFound.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Login.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\Register.jsx",
    "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\src\\pages\\UploadResume.jsx"
]

search_string = 'height: "42px"'
replacement = 'height: "64px"'

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    new_content = content.replace(search_string, replacement)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Increased logo size in {file_path}")
