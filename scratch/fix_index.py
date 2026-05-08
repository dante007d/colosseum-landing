import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    new_lines.append(line)
    # After line 165 (index 164) which is </video>
    if i == 164 and '</video>' in line:
        new_lines.append('        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">\n')
        new_lines.append('          <h1 className="font-display text-gold text-4xl md:text-6xl tracking-[0.4em] animate-pulse-glow">COLOSSEUM 2026</h1>\n')
        new_lines.append('        </div>\n')

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Success")
