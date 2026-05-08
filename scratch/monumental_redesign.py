import sys
import re

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove ColosseumSVG component and its usage
content = re.sub(r'function ColosseumSVG\(.*?\n\}\n', '', content, flags=re.DOTALL)
content = re.sub(r'<div ref={bgRef}.*?<ColosseumSVG.*?<\/div>', '', content, flags=re.DOTALL)

# 2. Redesign Events section to remove "AI slop"
# Replace the stack scroll with a monumental Neoclassical Gallery
content = re.sub(r'function EventCard\(.*?\n\}\n(?=function Colosseum)', '', content, flags=re.DOTALL)

# Update the Events section JSX
events_new_jsx = """      {/* EVENTS SECTION - NEOCLASSICAL GALLERY */}
      <section id="events" className="relative py-32 px-6 bg-ash overflow-hidden">
        <div className="marble-texture" />
        <div className="max-w-7xl mx-auto border-x border-gold/10 px-8 md:px-20 relative">
          <div className="text-center mb-24">
            <p className="font-heading text-gold tracking-[0.5em] text-[0.7rem] uppercase mb-6">The Arena of Excellence</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>Featured Events</h2>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {EVENTS.map((event, i) => (
              <article key={event.name} className="group relative">
                <div className="aspect-[3/4] overflow-hidden border border-gold/20 bg-stone-rome/40 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-stone-rome/60">
                  <div className="h-full w-full flex flex-col items-center justify-center p-10 text-center">
                    <img src={event.icon} alt="" className="w-32 h-32 md:w-40 md:h-40 object-contain mb-8 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110" />
                    <span className="font-heading text-crimson-bright tracking-[0.4em] text-[0.6rem] uppercase mb-3">{event.type}</span>
                    <h3 className="font-display text-parchment text-2xl mb-4 group-hover:text-gold transition-colors">{event.name}</h3>
                    <div className="h-px w-12 bg-gold/30 mb-6 transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
                    <p className="font-body text-parchment/60 text-sm leading-relaxed line-clamp-4">{event.desc}</p>
                  </div>
                </div>
                {/* Neoclassical Column Accents */}
                <div className="absolute -left-2 top-4 bottom-4 w-px bg-gold/10 group-hover:bg-gold/30 transition-colors" />
                <div className="absolute -right-2 top-4 bottom-4 w-px bg-gold/10 group-hover:bg-gold/30 transition-colors" />
              </article>
            ))}
          </div>
        </div>
      </section>"""

# Replace the stack scroll section
content = re.sub(r'\{\/\* EVENTS SECTION - STACK SCROLL \*\/ \}.*?<\/section>', events_new_jsx, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
