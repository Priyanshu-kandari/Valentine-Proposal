from PIL import Image
import os

# Source path (artifact)
source_path = "/home/preyanshu/.gemini/antigravity/brain/9a80d798-7804-468d-8ee4-98df6e9355c5/pixel_teddy_bear_1771012504253.png"
# Destination path
dest_path = "/home/preyanshu/WebDev/Vibe code project/Valentine/src/assets/teddy.png"

def remove_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        new_data = []
        # Get the color of the top-left pixel to use as background color
        bg_color = datas[0]
        threshold = 30 # Tolerance for color matching
        
        print(f"Detected background color: {bg_color}")

        for item in datas:
            # Check if pixel is close to background color
            if all(abs(item[i] - bg_color[i]) < threshold for i in range(3)):
                new_data.append((255, 255, 255, 0)) # Transparent
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        
        # Resize to be smaller pixel art style if needed (optional, but good for performance)
        # img = img.resize((64, 64), Image.NEAREST)
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path, "PNG")
        print(f"Saved processed image to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    remove_background(source_path, dest_path)
