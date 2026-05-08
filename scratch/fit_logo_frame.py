import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Adjust the About image frame to fit the infographic perfectly
content = content.replace(
    '<div className="reveal relative aspect-[4/5] rounded-sm border border-gold/25 p-6 bg-stone-rome/60 shadow-imperial"',
    '<div className="reveal relative aspect-square rounded-sm border border-gold/25 overflow-hidden bg-[#f5f2e8] shadow-imperial"'
)

content = content.replace(
    '<img src="/bec-logo.jpg" alt="BEC Creative Spectrum" className="w-full h-full object-contain p-4" />',
    '<img src="/bec-logo.jpg" alt="BEC Creative Spectrum" className="w-full h-full object-contain" />'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
