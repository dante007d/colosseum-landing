import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Wreath SVG component
wreath_svg = """
const Wreath = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 85 Q30 85 20 60 Q15 40 25 15" strokeLinecap="round" />
    <path d="M50 85 Q70 85 80 60 Q85 40 75 15" strokeLinecap="round" />
    <circle cx="25" cy="20" r="3" fill="currentColor" />
    <circle cx="75" cy="20" r="3" fill="currentColor" />
    <circle cx="20" cy="40" r="3" fill="currentColor" />
    <circle cx="80" cy="40" r="3" fill="currentColor" />
    <circle cx="22" cy="60" r="3" fill="currentColor" />
    <circle cx="78" cy="60" r="3" fill="currentColor" />
  </svg>
);
"""

content = content.replace('function ColosseumSVG', wreath_svg + '\nfunction ColosseumSVG')

# 2. Add Wreaths to Hero Title
content = content.replace(
    '<h1 className="font-display font-black text-gold-gradient leading-[1.2] pb-6 px-4 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] w-full block"',
    '<div className="flex items-center justify-center gap-4 md:gap-12 mb-6">\n            <Wreath className="hidden md:block w-24 h-24 text-gold/40 -rotate-12" />\n            <h1 className="font-display font-black text-gold-gradient leading-[1.2] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"'
)
content = content.replace('COLOSSEUM\n          </h1>', 'COLOSSEUM\n            </h1>\n            <Wreath className="hidden md:block w-24 h-24 text-gold/40 rotate-12" />\n          </div>')

# 3. Add Column borders to content
content = content.replace(
    '<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">',
    '<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center border-x border-gold/10 px-8 md:px-20 relative">\n          {/* Decorative Column base/cap */}\n          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />\n          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />'
)

# 4. Update EventCard for neoclassical feel
content = content.replace(
    'className="group relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/20 bg-stone-mid/95 p-8 md:p-14 backdrop-blur-2xl transition-colors hover:border-gold/40"',
    'className="group relative w-full max-w-4xl overflow-hidden border-y border-gold/30 bg-stone-mid/95 p-8 md:p-20 backdrop-blur-2xl transition-all hover:bg-stone-rome/80 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
