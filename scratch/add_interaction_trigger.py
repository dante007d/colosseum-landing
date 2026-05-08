import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add interaction state
content = content.replace(
    'const [isExiting, setIsExiting] = useState(false);',
    'const [isExiting, setIsExiting] = useState(false);\n  const [hasInteracted, setHasInteracted] = useState(false);'
)

# Overlay for interaction
interaction_overlay = """
  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 z-[200] bg-ash flex items-center justify-center">
        <div className="text-center p-8 border border-gold/20 rounded-sm backdrop-blur-xl bg-stone-rome/40 relative overflow-hidden">
          <div className="marble-texture" />
          <Wreath className="w-16 h-16 text-gold/30 mx-auto mb-6" />
          <h2 className="font-display text-gold-gradient text-3xl mb-8 tracking-[0.2em]">COLOSSEUM 2026</h2>
          <button 
            onClick={() => {
              setHasInteracted(true);
              if (audioRef.current) audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            }}
            className="group relative px-12 py-4 bg-crimson text-parchment font-heading text-xs tracking-[0.4em] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Enter the Arena</span>
            <div className="absolute inset-0 bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    );
  }
"""

# Insert overlay logic before return (showIntro)
content = content.replace('if (showIntro) {', interaction_overlay + '\n  if (showIntro) {')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
