from PIL import Image, ImageOps
from pathlib import Path

base = Path(r'c:\Working\html toturial\madrasa-web\frontend\public\images')

def optimize(input_name: str, output_name: str, max_width: int, quality: int):
    src = base / input_name
    dst = base / output_name
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, max(int(img.height * ratio), 1)), Image.Resampling.LANCZOS)
    img.save(dst, 'WEBP', quality=quality, method=6)
    print(f'{src.name} {src.stat().st_size} -> {dst.name} {dst.stat().st_size}')

optimize('hero-banner.png', 'hero-banner.webp', 1800, 68)
optimize('admission-poster.jpeg', 'admission-poster.webp', 900, 72)
