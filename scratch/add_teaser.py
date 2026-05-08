import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

footer_jsx = """
      {/* FINAL TEASER SECTION */}
      <section className="relative py-40 px-6 bg-ash overflow-hidden border-t border-gold/10">
        <div className="marble-texture" />
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="font-heading text-gold/40 tracking-[0.6em] text-[0.65rem] uppercase mb-12">The Convergence Awaits</p>
          <h2 className="font-display text-gold-gradient leading-tight mb-16" style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)", letterSpacing: "0.1em" }}>
            SOMETHING BIG <br /> IS COMING
          </h2>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-12" />
          <p className="font-heading text-parchment/40 tracking-[0.4em] text-[0.6rem] uppercase">
            Basaveshwar Engineering College <br />
            <span className="text-gold/50">BEC Creative Spectrum · MMXXVI</span>
          </p>
        </div>
      </section>
"""

# Insert before the last closing </div>
content = content.replace('    </div>\n  );\n}', footer_jsx + '    </div>\n  );\n}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
