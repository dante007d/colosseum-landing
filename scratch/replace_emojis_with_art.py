import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update EVENTS icons
content = content.replace('icon: "💻"', 'icon: "/roman-art/helmet.png"')
content = content.replace('icon: "🏰"', 'icon: "/roman-art/shield.png"')
content = content.replace('icon: "🤖"', 'icon: "/roman-art/ballista.png"')
content = content.replace('icon: "🧱"', 'icon: "/roman-art/arch.png"')
content = content.replace('icon: "📸"', 'icon: "/roman-art/mosaic.png"')
content = content.replace('icon: "✨"', 'icon: "/roman-art/lyre.png"')

# 2. Update EventCard to render image
content = content.replace(
    '{event.icon}',
    '{event.icon.startsWith("/") ? <img src={event.icon} alt="" className="w-24 h-24 md:w-48 md:h-48 object-contain" /> : event.icon}'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
