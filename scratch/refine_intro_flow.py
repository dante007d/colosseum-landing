import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the text overlay on the intro video
content = content.replace(
    '<div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">\n          <h1 className="font-display text-gold text-4xl md:text-6xl tracking-[0.4em] animate-pulse-glow">COLOSSEUM 2026</h1>\n        </div>',
    ''
)

# 2. Ensure audio ends exactly when intro ends (already implemented but I will make it more immediate)
content = content.replace(
    'if (audioRef.current) {\n        audioRef.current.pause();\n      }\n      setShowIntro(false);',
    'if (audioRef.current) {\n        audioRef.current.pause();\n        audioRef.current.currentTime = 0;\n      }\n      setShowIntro(false);'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
