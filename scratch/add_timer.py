import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 'window.removeEventListener("scroll", onScroll);' in line:
        new_lines.append('      window.removeEventListener("scroll", onScroll);\n')
        new_lines.append('      clearTimeout(timer);\n')
    elif 'window.addEventListener("scroll", onScroll, { passive: true });' in line:
        new_lines.append('    window.addEventListener("scroll", onScroll, { passive: true });\n')
        new_lines.append('    const timer = setTimeout(() => { if (showIntro) handleIntroComplete(); }, 8000);\n')
    elif '}, []);' in line and i > 140:
        new_lines.append('  }, [showIntro]);\n')
    else:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Success")
