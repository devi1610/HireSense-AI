from PIL import Image

img_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\logo.png"

try:
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        # Calculate color difference to identify greys/shadows
        # Grey pixels have very similar R, G, B values.
        color_diff = max(r, g, b) - min(r, g, b)
        
        # If it's grey/white and not completely black
        if color_diff < 30 and r > 80:
            new_data.append((255, 255, 255, 255))
        elif r > 200 and g > 200 and b > 200:
            new_data.append((255, 255, 255, 255))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    
    # Save the white background logo
    img.save(img_path)
    
    # Generate favicon (square crop)
    # The logo is wide, so let's crop the left part (robot head) for the favicon
    width, height = img.size
    # Assuming robot head is roughly on the left, crop a square from the left
    box_size = min(width, height)
    favicon = img.crop((10, 0, box_size + 10, box_size))
    favicon.save(r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\favicon.png")
    
    print("Logo background made white and favicon generated.")
except Exception as e:
    print(f"Error: {e}")
