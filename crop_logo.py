from PIL import Image, ImageFilter

def make_transparent_floodfill():
    img = Image.open("c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\public\\logo_cropped_raw.png")
    img = img.convert("RGBA")
    width, height = img.size
    
    gray = img.convert("L")
    
    # Collect initial queue of all border pixels
    visited = set()
    queue = []
    
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    bg_mask = Image.new("L", (width, height), 0)
    
    # Threshold check: paper pixels are generally very bright (>160)
    # Let's inspect some corner pixels to verify
    corner_vals = [gray.getpixel((0,0)), gray.getpixel((width-1, 0)), 
                   gray.getpixel((0, height-1)), gray.getpixel((width-1, height-1))]
    avg_corner = sum(corner_vals) / len(corner_vals)
    print("Corner gray values:", corner_vals, "Average:", avg_corner)
    
    # We will BFS to find connected background components
    while queue:
        x, y = queue.pop(0)
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        # Check if the pixel is part of the light paper background
        val = gray.getpixel((x, y))
        if val > 165: # Background threshold
            bg_mask.putpixel((x, y), 255)
            # Traverse 4-connected neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        queue.append((nx, ny))
                        
    # Blur the mask to make the transparency transitions smooth (anti-aliasing)
    bg_mask_blurred = bg_mask.filter(ImageFilter.GaussianBlur(1.2))
    
    # Apply mask to alpha channel
    pix = img.load()
    pix_mask = bg_mask_blurred.load()
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            m = pix_mask[x, y]
            # m is 255 for background (transparent), 0 for foreground (opaque)
            # We want new_a to be 0 for m=255 and 255 for m=0
            new_a = max(0, min(255, 255 - m))
            pix[x, y] = (r, g, b, new_a)
            
    img.save("c:\\Users\\MALLESWARI\\Videos\\HireSense-AI\\frontend\\public\\logo_transparent.png")
    print("Transparent logo created successfully as logo_transparent.png!")

make_transparent_floodfill()
