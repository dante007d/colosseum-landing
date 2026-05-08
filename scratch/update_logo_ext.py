import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update About Section logo path to .jpg
content = content.replace('src="/bec-logo.png"', 'src="/bec-logo.jpg"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
