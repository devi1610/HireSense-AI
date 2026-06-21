import os
try:
    os.replace(
        "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\public\\logo_cropped_raw.png",
        "c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\public\\logo.png"
    )
    print("Logo renamed successfully.")
except Exception as e:
    print(f"Error: {e}")
