import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Name: DECODE OR DEATH -> ROYAL RUMBLE
content = content.replace('name: "DECODE OR DEATH"', 'name: "ROYAL RUMBLE"')

# 2. Improve EventCard interactivity
new_event_card_comp = """
function EventCard({ event, index, total }: { event: any, index: number, total: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, 0]);
  
  // Mouse tracking for 3D tilt and glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div ref={container} className="h-[110vh] flex items-center justify-center sticky top-0">
      <motion.article
        onMouseMove={handleMouseMove}
        style={{ 
          scale, 
          rotate,
          top: `calc(10% + ${index * 25}px)`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
        }}
        whileHover={{ 
          scale: (1 - (total - index) * 0.05) + 0.02,
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="group relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/20 bg-stone-mid/95 p-8 md:p-14 backdrop-blur-2xl transition-colors hover:border-gold/40"
      >
        {/* Dynamic Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.74 0.14 75 / 0.1), transparent 40%)`
          }}
        />
        
        <div className="relative flex flex-col md:flex-row gap-10 items-center text-center md:text-left z-10">
          <motion.div 
            initial={{ rotate: -10, scale: 0.8 }}
            whileInView={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-8xl md:text-[10rem] filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
          >
            {event.icon}
          </motion.div>
          
          <div className="flex-1">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="inline-block px-4 py-1.5 text-[0.7rem] tracking-[0.5em] uppercase font-heading bg-crimson-bright text-parchment rounded-sm mb-6 shadow-lg"
            >
              {event.type}
            </motion.span>
            <h3 className="font-display font-black text-gold-gradient text-4xl md:text-6xl mb-6 tracking-tight group-hover:tracking-normal transition-all duration-500">
              {event.name}
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-transparent mb-8 mx-auto md:mx-0 rounded-full" />
            <p className="font-body text-parchment/90 text-xl md:text-2xl leading-relaxed max-w-2xl">
              {event.desc}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--gold)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-3 border border-gold/40 font-heading text-gold text-xs uppercase tracking-[0.3em] hover:text-ash transition-all rounded-sm"
            >
              Enter Arena
            </motion.button>
          </div>
        </div>
        
        {/* Background Decorative Text */}
        <span className="absolute -right-10 -bottom-10 font-display text-[15rem] leading-none text-gold/[0.03] select-none pointer-events-none group-hover:text-gold/[0.05] transition-colors duration-700">
          {index + 1}
        </span>
      </motion.article>
    </div>
  );
}
"""

# Replace the previous EventCard component
import re
pattern = r'function EventCard\(.*?\n\}\n(?=function ColosseumSVG)'
content = re.sub(pattern, new_event_card_comp + '\n', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
