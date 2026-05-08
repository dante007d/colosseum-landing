import sys
import re

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the Quote Section
quote_section = """
      {/* QUOTE BANNER */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: "var(--gradient-crimson)" }}>
        <span className="absolute -left-4 top-0 font-display text-parchment/[0.04] select-none pointer-events-none" style={{ fontSize: "20rem", lineHeight: 1 }}>❝</span>
        <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
          <p className="font-body italic text-parchment" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", lineHeight: 1.3 }}>
            “Where engineering minds clash with complex problems and creative souls dazzle with brilliance.”
          </p>
          <div className="h-px w-20 bg-gold/30 mx-auto mt-10" />
          <p className="font-heading text-gold/80 tracking-[0.4em] text-[0.65rem] uppercase mt-8">The Philosophy of Colosseum</p>
        </div>
      </section>
"""

if '{/* QUOTE BANNER */}' not in content:
    content = content.replace('</header>', '</header>\n' + quote_section)

# 2. Re-implement Stack Scroll for Events
event_card_comp = """
const EventCard = ({ event, index, total }: { event: any; index: number; total: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.article 
        style={{ scale, opacity, top: `calc(-5% + ${index * 25}px)` }}
        className="group relative w-full max-w-4xl overflow-hidden border border-gold/20 bg-stone-rome/90 p-8 md:p-20 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
      >
        <div className="marble-texture" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="relative">
             <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-150 animate-pulse-glow" />
             <img src={event.icon} alt="" className="relative w-40 h-40 md:w-64 md:h-64 object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="font-heading text-crimson-bright tracking-[0.5em] text-[0.65rem] uppercase mb-4 block">{event.type}</span>
            <h3 className="font-display text-gold-gradient text-3xl md:text-5xl mb-6 tracking-wide">{event.name}</h3>
            <div className="h-px w-20 bg-gold/30 mb-8 mx-auto md:mx-0" />
            <p className="font-body text-parchment/80 text-lg leading-relaxed">{event.desc}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
"""

if 'const EventCard' not in content:
    content = content.replace('function Colosseum() {', event_card_comp + '\nfunction Colosseum() {')

# Update the Events section to use the stack scroll
events_section_new = """      {/* EVENTS SECTION - STACK SCROLL */}
      <section id="events" className="relative bg-ash">
        <div className="max-w-7xl mx-auto px-6 pt-32 text-center mb-[-10vh]">
          <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">Competitive Arena</p>
          <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>Featured Events</h2>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          {EVENTS.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} total={EVENTS.length} />
          ))}
        </div>
      </section>"""

# Replace the gallery grid or old events section with the new stack scroll
if 'id="events"' in content:
    content = re.sub(r'<section id="events".*?</section>', events_section_new, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
