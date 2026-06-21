from PIL import Image, ImageFilter
import os

img_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\logo.png"
if os.path.exists(img_path):
    img = Image.open(img_path).convert("RGBA")
    r, g, b, a = img.split()
    
    # Apply a slight blur to the alpha channel to create an anti-aliased edge
    a = a.filter(ImageFilter.GaussianBlur(1))
    
    # Merge back and save
    img = Image.merge("RGBA", (r, g, b, a))
    img.save(img_path)
    print("Logo edges smoothed.")
else:
    print("Logo not found.")
