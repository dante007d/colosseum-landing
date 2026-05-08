import sys
import re

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    # Fix the useEffect syntax error (missing return)
    if 'window.addEventListener("scroll", onScroll, { passive: true });' in line:
        new_lines.append(line)
        new_lines.append('    const timer = setTimeout(() => { if (showIntro) handleIntroComplete(); }, 8000);\n')
        new_lines.append('    return () => {\n')
        continue
    if 'const timer = setTimeout(() => { if (showIntro) handleIntroComplete(); }, 8000);' in line:
        continue # handled above
    
    # Remove the deleted sections from JSX
    if '{/* SCHEDULE SECTION */}' in line or '<section id="schedule"' in line:
        skip = True
    if '{/* COMMITTEE SECTION */}' in line or '<section id="committee"' in line:
        skip = True
    if '{/* FOOTER */}' in line or '<footer' in line:
        skip = True
    
    if not skip:
        new_lines.append(line)
    
    # Check for end of sections to stop skipping
    if skip and '</section>' in line:
        skip = False
    if skip and '</footer>' in line:
        skip = False

# Final cleanup of the end of the file
final_lines = []
for line in new_lines:
    if 'SCHEDULE.map' in line or 'COMMITTEE.map' in line:
        continue
    final_lines.append(line)

# Ensure the last div is closed
if '    </div>' not in final_lines[-1] and '  );' not in final_lines[-1]:
    final_lines.append('    </div>\n  );\n}\n')

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print("Success")
