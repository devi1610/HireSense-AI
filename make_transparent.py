from PIL import Image
import os

def remove_background(image_path, output_path, threshold=60):
    if not os.path.exists(image_path):
        print(f"File {image_path} not found.")
        return
        
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    # The background is a light grey paper texture. We sample a corner pixel
    bg_color = datas[0] # top left
    
    # We will compute Euclidean distance. If the pixel is close to bg_color, it becomes transparent
    newData = []
    for item in datas:
        # Distance between current pixel RGB and background RGB
        r_diff = item[0] - bg_color[0]
        g_diff = item[1] - bg_color[1]
        b_diff = item[2] - bg_color[2]
        dist = (r_diff**2 + g_diff**2 + b_diff**2) ** 0.5
        
        if dist < threshold:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Successfully saved transparent logo to {output_path}")

input_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\logo.png"
output_path = r"c:\Users\MALLESWARI\Videos\HireSense-AI\frontend\public\logo_transp.png"

try:
    remove_background(input_path, output_path)
    # If successful, replace the original
    if os.path.exists(output_path):
        os.replace(output_path, input_path)
        print("Replaced logo.png with the transparent version.")
except Exception as e:
    print(f"Error: {e}")
