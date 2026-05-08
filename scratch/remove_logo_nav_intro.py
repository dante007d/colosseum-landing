import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert Navigation Logo to text-only
content = content.replace(
    '<a href="#" className="flex items-center gap-3 font-display font-black text-gold tracking-widest text-lg">\n            <img src="/bec-logo.png" alt="BEC Logo" className="h-10 w-auto rounded-full border border-gold/30 shadow-imperial" />\n            COLOSSEUM\n          </a>',
    '<a href="#" className="font-display font-black text-gold tracking-widest text-lg">\n            ⚔ COLOSSEUM\n          </a>'
)

# 2. Revert Intro Logo to text-only
content = content.replace(
    '<img src="/bec-logo.png" alt="BEC Logo" className="h-32 md:h-48 w-auto mb-8 animate-pulse-glow" />\n          <h1 className="font-display text-gold text-4xl md:text-6xl tracking-[0.5em]">COLOSSEUM 2026</h1>',
    '<h1 className="font-display text-gold text-4xl md:text-6xl tracking-[0.5em] animate-pulse-glow">COLOSSEUM 2026</h1>'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
