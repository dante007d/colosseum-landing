import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if 'grid grid-cols-3 gap-6 text-center' in line:
        skip = True
    
    if not skip:
        # Also skip the separator line if it was missed
        if 'text-center text-gold tracking-[0.5em] my-10' not in line:
            new_lines.append(line)
    
    if skip and '</div>' in line and '          </div>' in line: # This marks the end of that specific block
        skip = False

# Wait, the previous logic might be tricky with nested divs.
# I'll just look for the specific leftover patterns.

cleaned_lines = []
for line in new_lines:
    if '{s.n}' in line or '{s.l}' in line or '))} ' in line or '  { n: ' in line or ' Prize Pool ' in line:
        continue
    cleaned_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(cleaned_lines)

print("Success")
