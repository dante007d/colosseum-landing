import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the accidental white backgrounds and ensure full dark mode
content = content.replace('bg-white', 'bg-ash')
content = content.replace('rgba(255, 255, 255, 0.85)', 'oklch(0.10 0.01 60 / 0.92)')
content = content.replace('bg-neutral-50/50', 'bg-ash/40')
content = content.replace('text-neutral-700', 'text-parchment/80')
content = content.replace('text-neutral-600', 'text-parchment/60')
content = content.replace('text-white', 'text-parchment')

# Enhance Neoclassical Elements
content = content.replace(
    '<section id="about" className="relative py-20 md:py-32 px-6">',
    '<section id="about" className="relative py-20 md:py-32 px-6 overflow-hidden">'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update styles.css for global dark neoclassical theme
css_path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Ensure global background is dark
css = css.replace('body { background: white; }', 'body { background: var(--ash); color: var(--parchment); }')
# Add marble texture utility
marble_style = """
.marble-texture {
  position: absolute;
  inset: 0;
  background-image: url('https://www.transparenttextures.com/patterns/marble-similar.png');
  opacity: 0.03;
  pointer-events: none;
}
"""
if '.marble-texture' not in css:
    css += marble_style

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Success")
