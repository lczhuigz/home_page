"""生成社交分享用的 OG 图（1200×630）：python scripts/make-og.py"""

from __future__ import annotations

import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (7, 7, 11)

FONTS = {
    "bold": [r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\segoeuib.ttf"],
    "regular": [r"C:\Windows\Fonts\msyh.ttc", r"C:\Windows\Fonts\segoeui.ttf"],
    "mono": [r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"],
}


def load_font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    for path in FONTS[kind]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size)


def blob(canvas: Image.Image, center: tuple[int, int], radius: int, color: tuple[int, int, int], alpha: int) -> None:
    """在 canvas 上叠一团边缘完全淡出的柔光。"""
    size = radius * 2
    yy, xx = np.ogrid[0:size, 0:size]
    dist = np.sqrt((xx - radius) ** 2 + (yy - radius) ** 2) / radius
    falloff = np.clip(1.0 - dist, 0.0, 1.0) ** 2 * alpha
    mask = Image.fromarray(falloff.astype(np.uint8), mode="L").filter(
        ImageFilter.GaussianBlur(radius / 8)
    )
    layer = Image.new("RGB", (size, size), color)
    canvas.paste(layer, (center[0] - radius, center[1] - radius), mask)


def grid(canvas: Image.Image, step: int = 60, alpha: int = 14) -> None:
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(0, W, step):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, alpha), width=1)
    for y in range(0, H, step):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, alpha), width=1)
    canvas.alpha_composite(overlay)


def gradient_text(canvas: Image.Image, xy: tuple[int, int], text: str, font, stops):
    """给文字填充从左到右的渐变，返回实际绘制的 (x, y, w, h)。"""
    mask = Image.new("L", canvas.size, 0)
    ImageDraw.Draw(mask).text((0, 0), text, font=font, fill=255)
    bbox = mask.getbbox()
    if not bbox:
        return None
    mask = mask.crop(bbox)
    w, h = mask.size

    strip = Image.new("RGB", (w, h))
    px = strip.load()
    for x in range(w):
        t = x / max(w - 1, 1)
        # 三段渐变：紫 -> 蓝 -> 青
        if t < 0.5:
            k = t / 0.5
            c = tuple(int(stops[0][i] + (stops[1][i] - stops[0][i]) * k) for i in range(3))
        else:
            k = (t - 0.5) / 0.5
            c = tuple(int(stops[1][i] + (stops[2][i] - stops[1][i]) * k) for i in range(3))
        for y in range(h):
            px[x, y] = c

    canvas.paste(strip, (xy[0] + bbox[0], xy[1] + bbox[1]), mask)
    return (xy[0] + bbox[0], xy[1] + bbox[1], w, h)


def main() -> None:
    canvas = Image.new("RGBA", (W, H), BG + (255,))

    blob(canvas, (120, 40), 460, (124, 58, 237), 150)
    blob(canvas, (1080, 120), 420, (8, 145, 178), 130)
    blob(canvas, (760, 640), 380, (219, 39, 119), 90)
    grid(canvas)

    draw = ImageDraw.Draw(canvas)

    # 左上角标记
    draw.rounded_rectangle((72, 64, 136, 128), radius=18, fill=(139, 92, 246, 255))
    logo_font = load_font("bold", 34)
    draw.text((104, 96), "段", font=logo_font, fill=(255, 255, 255, 255), anchor="mm")
    draw.text((152, 96), "lczhuigz", font=load_font("bold", 26), fill=(236, 237, 245, 255), anchor="lm")

    # 主标题：中文名 + 英文 handle（跟在名字右下，基线对齐）
    name_box = gradient_text(
        canvas,
        (72, 186),
        "段辉园",
        load_font("bold", 148),
        [(167, 139, 250), (139, 92, 246), (34, 211, 238)],
    )
    if name_box:
        draw.text(
            (name_box[0] + name_box[2] + 24, name_box[1] + name_box[3] - 6),
            "@lczhuigz",
            font=load_font("mono", 32),
            fill=(150, 155, 178, 255),
            anchor="ls",
        )

    draw.text(
        (74, 410),
        "计算机专业在读，什么都想试一点的折腾型选手",
        font=load_font("regular", 30),
        fill=(200, 203, 218, 255),
    )

    draw.text(
        (74, 462),
        "博客 · 运动数据 · 自建图床 · 51 单片机",
        font=load_font("regular", 24),
        fill=(132, 137, 158, 255),
    )

    # 底部一条渐变分割线
    line = Image.new("RGB", (W - 144, 3))
    lp = line.load()
    for x in range(line.width):
        t = x / max(line.width - 1, 1)
        lp[x, 0] = (int(139 + (34 - 139) * t), int(92 + (211 - 92) * t), int(246 + (238 - 246) * t))
        lp[x, 1] = lp[x, 2] = lp[x, 0]
    canvas.paste(line, (72, 540))
    canvas.paste(line, (72, 542))

    draw.text((72, 566), "me.lczhuigz.cn", font=load_font("mono", 24), fill=(236, 237, 245, 255))
    draw.text(
        (W - 72, 566),
        "Astro · Vercel",
        font=load_font("mono", 20),
        fill=(125, 130, 150, 255),
        anchor="ra",
    )

    canvas.convert("RGB").save("public/og.png", optimize=True)
    print("public/og.png", os.path.getsize("public/og.png"), "bytes")


if __name__ == "__main__":
    main()
