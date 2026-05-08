import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the opacity: 0 fallback
text = text.replace('opacity: mounted ? undefined : 0', 'opacity: 1')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Success")
