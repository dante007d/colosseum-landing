import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Find the orphaned return around line 107 (index 106)
    if i == 106 and 'return (' in line and 'function' not in lines[i-1]:
        new_lines.append('function ColosseumSVG({ className = "" }: { className?: string }) {\n')
        new_lines.append('  const tier = (y: number, h: number, count: number, w: number) => {\n')
        new_lines.append('    const total = 1200;\n')
        new_lines.append('    const gap = (total - count * w) / (count + 1);\n')
        new_lines.append('    return Array.from({ length: count }).map((_, i) => {\n')
        new_lines.append('      const x = gap + i * (w + gap);\n')
        new_lines.append('      const top = y;\n')
        new_lines.append('      const bottom = y + h;\n')
        new_lines.append('      const cx = x + w / 2;\n')
        new_lines.append('      return (\n')
        new_lines.append('        <path\n')
        new_lines.append('          key={`${y}-${i}`}\n')
        new_lines.append('          d={`M${x},${bottom} L${x},${top + w / 2} Q${cx},${top - 10} ${x + w},${top + w / 2} L${x + w},${bottom} Z`}\n')
        new_lines.append('          fill="none"\n')
        new_lines.append('          stroke="currentColor"\n')
        new_lines.append('          strokeWidth="1.5"\n')
        new_lines.append('        />\n')
        new_lines.append('      );\n')
        new_lines.append('    });\n')
        new_lines.append('  };\n')
        new_lines.append(line)
    else:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Success")
