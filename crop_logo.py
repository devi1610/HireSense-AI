from PIL import Image

img_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\logo.png"

try:
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    width, height = img.size

    # Pass 1: Make background pure white based on a more aggressive threshold
    # The grey background in the screenshot is probably around 230-245.
    new_data = []
    for r, g, b, a in data:
        # If it's very light (e.g., r>210, g>210, b>210), force to white
        if r > 210 and g > 210 and b > 210:
            new_data.append((255, 255, 255, 255))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    
    # Pass 2: Find bounding box of non-white pixels to CROP out dead space
    bbox_left = width
    bbox_right = 0
    bbox_top = height
    bbox_bottom = 0
    
    pixels = img.load()
    has_content = False
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If not pure white, it's content
            if r < 250 or g < 250 or b < 250:
                has_content = True
                if x < bbox_left: bbox_left = x
                if x > bbox_right: bbox_right = x
                if y < bbox_top: bbox_top = y
                if y > bbox_bottom: bbox_bottom = y
                
    if has_content:
        # Add a tiny padding (e.g. 10 pixels) so it's not flush to the edge
        pad = 10
        bbox_left = max(0, bbox_left - pad)
        bbox_top = max(0, bbox_top - pad)
        bbox_right = min(width, bbox_right + pad)
        bbox_bottom = min(height, bbox_bottom + pad)
        
        cropped_img = img.crop((bbox_left, bbox_top, bbox_right, bbox_bottom))
        cropped_img.save(img_path)
        print("Logo successfully cropped and background made white!")
    else:
        print("Image is entirely white, skipping crop.")
        img.save(img_path)
        
except Exception as e:
    print(f"Error: {e}")
