import os

css_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\src\index.css"

scrollbar_css = """
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

with open(css_path, "a", encoding="utf-8") as f:
    f.write(scrollbar_css)

print("Scrollbar hidden via CSS.")
