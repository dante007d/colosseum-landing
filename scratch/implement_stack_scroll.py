import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add framer-motion imports
content = content.replace(
    'import { useEffect, useRef, useState } from "react";',
    'import { useEffect, useRef, useState } from "react";\nimport { motion, useScroll, useTransform } from "framer-motion";'
)

# New EventCard component with stack effect
event_card_comp = """
function EventCard({ event, index, total }: { event: any, index: number, total: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.article
        style={{ scale, top: `calc(10% + ${index * 25}px)` }}
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-gold/20 bg-stone-mid/90 p-8 md:p-12 backdrop-blur-xl shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
        <div className="relative flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          <div className="text-7xl md:text-9xl filter drop-shadow-2xl">{event.icon}</div>
          <div className="flex-1">
            <span className="inline-block px-3 py-1 text-[0.65rem] tracking-[0.4em] uppercase font-heading bg-crimson-bright text-parchment rounded-sm mb-4">
              {event.type}
            </span>
            <h3 className="font-display font-black text-gold-gradient text-3xl md:text-5xl mb-4">{event.name}</h3>
            <div className="h-px w-20 bg-gold/40 mb-6 mx-auto md:mx-0" />
            <p className="font-body text-parchment/90 text-lg md:text-xl leading-relaxed">{event.desc}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
"""

# Find place to insert EventCard component
content = content.replace('function ColosseumSVG', event_card_comp + '\nfunction ColosseumSVG')

# Replace the Events section grid with the stack scroll effect
events_section_old = """      {/* EVENTS SECTION */}
      <section id="events" className="relative py-20 md:py-32 px-6 bg-stone-rome/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center reveal mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">Competitive Arena</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Featured Events</h2>
            <p className="font-body italic text-parchment/70 mt-4 max-w-2xl mx-auto">From high-octane battle royales to creative photography sprints.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((e, i) => (
              <article
                key={e.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="reveal relative overflow-hidden rounded-sm border border-gold/20 bg-stone-mid/70 p-8 transition-all duration-500"
                style={{
                  transform: hovered === i ? "translateY(-8px)" : undefined,
                  boxShadow: hovered === i ? "var(--shadow-imperial), 0 0 0 1px var(--gold)" : "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "var(--gradient-crimson)", opacity: hovered === i ? 0.35 : 0 }} />
                <div className="relative">
                  <div className="text-5xl mb-4">{e.icon}</div>
                  <h3 className="font-heading font-bold text-gold-light text-2xl">{e.name}</h3>
                  <span className="inline-block mt-2 px-2 py-1 text-[0.6rem] tracking-[0.3em] uppercase font-heading bg-crimson-bright/80 text-parchment rounded-sm">
                    {e.type}
                  </span>
                  <div className="my-5 h-px w-10 bg-gold" />
                  <p className="font-body text-parchment/80 leading-relaxed">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>"""

events_section_new = """      {/* EVENTS SECTION - STACK SCROLL */}
      <section id="events" className="relative bg-stone-rome/40 pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-32">
          <div className="text-center mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">Competitive Arena</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Featured Events</h2>
            <p className="font-body italic text-parchment/70 mt-4 max-w-2xl mx-auto">From high-octane battle royales to creative photography sprints.</p>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          {EVENTS.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} total={EVENTS.length} />
          ))}
        </div>
      </section>"""

content = content.replace(events_section_old, events_section_new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
