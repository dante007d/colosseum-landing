import sys
import re

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the stats block
pattern = r'<div className="grid grid-cols-3 gap-6 text-center">.*?<\/div>'
# Need to use re.DOTALL to match across lines
content = re.sub(pattern, '', content, flags=re.DOTALL)

# Also remove the separator if it exists
content = content.replace('<p className="text-center text-gold tracking-[0.5em] my-10">— ✦ —</p>', '')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
