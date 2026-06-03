import os
from PIL import Image

def make_square():
    logo_path = '../logo.png' if os.path.exists('../logo.png') else 'public/logo.png'
    if not os.path.exists(logo_path):
        logo_path = 'src/assets/logo.png'

    print(f"Reading logo from: {logo_path}")
    img = Image.open(logo_path)
    width, height = img.size
    print(f"Original dimensions: {width}x{height}")

    new_size = max(width, height)
    
    # Check if original image has alpha channel
    has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
    
    if has_alpha:
        # Padded background is transparent
        print("Logo is transparent, padding with transparency...")
        # Convert original to RGBA if not already
        img = img.convert('RGBA')
        new_img = Image.new('RGBA', (new_size, new_size), (255, 255, 255, 0))
    else:
        # Detect background color from top-left pixel
        bg_color = img.getpixel((0, 0))
        print(f"Logo background detected as: {bg_color}, padding with this color...")
        new_img = Image.new(img.mode, (new_size, new_size), bg_color)
        
    x = (new_size - width) // 2
    y = (new_size - height) // 2
    
    new_img.paste(img, (x, y))
    
    # Save as PNG
    output_path = 'public/logo-square.png'
    new_img.save(output_path, 'PNG')
    print(f"Square logo successfully saved to: {output_path} ({new_size}x{new_size})")

if __name__ == '__main__':
    make_square()
