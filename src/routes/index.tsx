import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Colosseum,
  head: () => ({
    meta: [
      { title: "COLOSSEUM — The Eternal Heart of Rome" },
      { name: "description", content: "A digital monument to the Flavian Amphitheatre, gladiators, Roman art, architecture, and the emperors who ruled the eternal city." },
      { property: "og:title", content: "COLOSSEUM — The Eternal Heart of Rome" },
      { property: "og:description", content: "Where gods were made of men, and men were consumed by legend." },
    ],
  }),
});

const NAV = [
  { href: "#colosseum", label: "The Arena" },
  { href: "#gladiators", label: "Gladiators" },
  { href: "#art", label: "Art" },
  { href: "#architecture", label: "Architecture" },
  { href: "#emperors", label: "Emperors" },
];

const GLADIATORS = [
  { name: "Murmillo", type: "Heavy Infantry", icon: "⚔️", desc: "Gallic fish-crested helmet, rectangular scutum shield, short gladius. The archetypal Roman gladiator — powerful, heavily armored, built for attrition." },
  { name: "Retiarius", type: "Net & Trident", icon: "🔱", desc: "Weighted net to ensnare, trident to finish. Lightly armored and theatrical — scorned by peers for lacking a helmet, beloved by the crowd." },
  { name: "Secutor", type: "The Pursuer", icon: "🛡️", desc: "Smooth egg-shaped helmet with tiny eyeholes, immune to nets. Designed specifically to counter the Retiarius. Their rivalry was the arena's greatest show." },
  { name: "Thraex", type: "Thracian Blade", icon: "⚡", desc: "Curved sica blade to hook around shields, small round buckler. Agile, angular, unpredictable. Caligula dressed his guards as Thraeces." },
];

const ART = [
  { name: "Augustus of Prima Porta", era: "1st century AD", icon: "🏛️", className: "md:row-span-2 md:col-span-1" },
  { name: "Battle of Issus Mosaic", era: "Pompeii, c. 100 BC", icon: "🎭", className: "" },
  { name: "Garden of Livia Fresco", era: "Villa of Livia", icon: "🌿", className: "" },
  { name: "Trajan's Column Relief", era: "113 AD", icon: "⚔️", className: "" },
  { name: "Marcus Aurelius Equestrian", era: "175 AD, Bronze", icon: "🗿", className: "" },
];

const ORDERS = [
  { numeral: "I", icon: "🏛️", name: "Doric", desc: "The plainest, sturdiest order. Crowns the Colosseum's ground tier — fluted columns of unadorned strength carrying the weight of empire." },
  { numeral: "II", icon: "🌿", name: "Ionic", desc: "Slender shafts and volute scrolls. The second tier of the amphitheatre breathes lighter, an Athenian grace pressed into Roman service." },
  { numeral: "III", icon: "🌸", name: "Corinthian", desc: "Acanthus-leaved capitals of luxuriant detail. The third level reaches skyward, ornate as a victor's crown above the arena's roar." },
];

const EMPERORS = [
  { years: "27 BC – 14 AD", name: "Augustus Caesar", desc: "Found Rome a city of brick, left it marble. The Pax Romana begins under his unrivaled hand." },
  { years: "54 – 68 AD", name: "Nero", desc: "Domus Aurea built upon Rome's ashes. Its reclaimed lake would become the Colosseum's foundation." },
  { years: "69 – 79 AD", name: "Vespasian", desc: "Founder of the Flavian dynasty. Commissioned the great amphitheatre in 72 AD as a gift to the Roman people." },
  { years: "79 – 81 AD", name: "Titus", desc: "Inaugurated the Colosseum in 80 AD with a hundred days of games. Vesuvius erupted in his reign — beloved still, as Rome's darling." },
  { years: "161 – 180 AD", name: "Marcus Aurelius", desc: "Philosopher-emperor. Wrote the Meditations on campaign. His bronze equestrian statue endures upon the Capitoline." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Particles() {
  const items = Array.from({ length: 25 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const dur = 4 + Math.random() * 6;
        const delay = Math.random() * 8;
        const dx = (Math.random() - 0.5) * 120;
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              ["--dx" as string]: `${dx}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function ColosseumSVG({ className = "" }: { className?: string }) {
  // 3 tiers of arches
  const tier = (y: number, h: number, count: number, w: number) => {
    const total = 1200;
    const gap = (total - count * w) / (count + 1);
    return Array.from({ length: count }).map((_, i) => {
      const x = gap + i * (w + gap);
      const top = y;
      const bottom = y + h;
      const cx = x + w / 2;
      return (
        <path
          key={`${y}-${i}`}
          d={`M${x},${bottom} L${x},${top + w / 2} Q${cx},${top - 10} ${x + w},${top + w / 2} L${x + w},${bottom} Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      );
    });
  };
  return (
    <svg viewBox="0 0 1200 600" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="oklch(0.74 0.14 75)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.10 0.01 60)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="540" width="1200" height="60" fill="url(#glow)" />
      <g style={{ color: "var(--gold)" }}>
        {tier(400, 150, 14, 70)}
        {tier(270, 130, 15, 60)}
        {tier(175, 95, 19, 45)}
        <rect x="40" y="155" width="1120" height="14" fill="currentColor" opacity="0.35" />
        <rect x="40" y="540" width="1120" height="6" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  );
}

function Colosseum() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      if (heroRef.current) heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.15}px) scale(1.02)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-gold/20"
        style={{ background: "linear-gradient(to bottom, oklch(0.10 0.01 60 / 0.92), oklch(0.10 0.01 60 / 0.4))" }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-display font-black text-gold tracking-widest text-lg">
            ⚔ COLOSSEUM
          </a>
          <ul className="hidden md:flex gap-8">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-parchment/80 hover:text-gold-light transition-colors relative group">
                  {n.label}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-screen overflow-hidden flex items-center justify-center">
        <div ref={bgRef} className="absolute inset-0 opacity-[0.18]" style={{ filter: "sepia(0.4)", animation: "breathe 8s ease-in-out infinite" }}>
          <ColosseumSVG className="w-full h-full" />
        </div>
        <Particles />
        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-5xl">
          <p
            className="font-heading text-gold tracking-[0.4em] text-xs uppercase mb-6"
            style={{ animation: mounted ? "fadeUp 0.9s 0.3s both" : undefined, opacity: mounted ? undefined : 0 }}
          >
            Founded 72 AD · Eternal City of Rome
          </p>
          <h1
            className="font-display font-black text-gold-gradient leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", animation: mounted ? "fadeUp 1s 0.5s both" : undefined, opacity: mounted ? undefined : 0 }}
          >
            COLOSSEUM
          </h1>
          <p
            className="font-body italic text-parchment/85 mt-6"
            style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", animation: mounted ? "fadeUp 1s 0.8s both" : undefined, opacity: mounted ? undefined : 0 }}
          >
            Where gods were made of men, and men were consumed by legend.
          </p>
          <div
            className="mx-auto mt-10"
            style={{ width: 180, height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", animation: mounted ? "fadeUp 1s 1s both" : undefined, opacity: mounted ? undefined : 0 }}
          />
          <p className="font-body italic text-parchment/60 mt-8 max-w-xl mx-auto">
            “While stands the Colosseum, Rome shall stand; when falls the Colosseum, Rome shall fall; and when Rome falls — the world.”
            <br />
            <span className="font-heading not-italic text-gold tracking-[0.3em] text-[0.65rem] uppercase mt-3 inline-block">— The Venerable Bede</span>
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gold/70">
          <span className="font-heading tracking-[0.4em] text-[0.6rem] uppercase">Descend</span>
          <span className="block w-px h-12 bg-gold/60 origin-top" style={{ animation: "elongate 2.4s ease-in-out infinite" }} />
        </div>
      </header>

      {/* QUOTE BANNER */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: "var(--gradient-crimson)" }}>
        <span className="absolute -left-4 top-0 font-display text-parchment/[0.04] select-none pointer-events-none" style={{ fontSize: "20rem", lineHeight: 1 }}>❝</span>
        <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
          <p className="font-body italic text-parchment" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", lineHeight: 1.3 }}>
            Panem et circenses — bread and games. The empire fed its people stone, blood, and spectacle, and they called it eternity.
          </p>
          <p className="mt-8 font-heading text-gold tracking-[0.3em] text-xs uppercase">— Juvenal, Satires</p>
        </div>
      </section>

      {/* COLOSSEUM DEEP DIVE */}
      <section id="colosseum" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" /> The Arena <span className="h-px w-10 bg-gold/60" />
            </p>
            <h2 className="font-display font-black text-gold-gradient mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1 }}>
              The Flavian Amphitheatre
            </h2>
            <p className="font-body text-parchment/85 text-lg leading-relaxed mb-5">
              Commissioned by Vespasian in 72 AD upon the drained lake of Nero's hated Domus Aurea, the Colosseum was Rome's atonement in travertine — a gift of spectacle returned to the people.
            </p>
            <p className="font-body text-parchment/75 leading-relaxed">
              Eighty arches admitted fifty thousand citizens through a system of <em>vomitoria</em> so swift the entire arena could empty in fifteen minutes. Beneath the sand lay the <em>hypogeum</em> — a labyrinth of cells, lifts, and trapdoors from which beasts and men erupted as if by the will of gods.
            </p>
            <p className="text-center text-gold tracking-[0.5em] my-10">— ✦ —</p>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { n: "80", l: "Arches" },
                { n: "50K", l: "Spectators" },
                { n: "188m", l: "Long" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-black text-gold-gradient text-4xl md:text-5xl" style={{ filter: "drop-shadow(0 4px 20px oklch(0.74 0.14 75 / 0.3))" }}>{s.n}</div>
                  <div className="font-heading text-parchment/70 tracking-[0.25em] text-[0.7rem] uppercase mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative aspect-[4/5] rounded-sm border border-gold/25 p-6 bg-stone-rome/60 shadow-imperial"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.74 0.14 75 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.14 75 / 0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              boxShadow: "var(--shadow-imperial)",
            }}>
            <svg viewBox="0 0 400 500" className="w-full h-full" style={{ color: "var(--gold)" }}>
              {/* tiered seating */}
              {[200, 170, 140, 110].map((r, i) => (
                <ellipse key={i} cx="200" cy="270" rx={r} ry={r * 0.55} fill="none" stroke="currentColor" strokeWidth="1" opacity={0.4 + i * 0.1} />
              ))}
              {/* arena floor */}
              <ellipse cx="200" cy="270" rx="80" ry="44" fill="oklch(0.55 0.10 70 / 0.25)" stroke="currentColor" strokeWidth="1.5" />
              {/* hypogeum tunnels */}
              <g opacity="0.55">
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`h${i}`} x1="130" y1={250 + i * 10} x2="270" y2={250 + i * 10} stroke="currentColor" strokeDasharray="3 3" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`v${i}`} x1={140 + i * 24} y1="240" x2={140 + i * 24} y2="300" stroke="currentColor" strokeDasharray="3 3" />
                ))}
              </g>
              {/* arches sides */}
              {Array.from({ length: 3 }).map((_, i) => (
                <g key={`a${i}`} opacity="0.6">
                  <path d={`M${20 + i * 18},420 L${20 + i * 18},390 Q${28 + i * 18},378 ${36 + i * 18},390 L${36 + i * 18},420 Z`} fill="none" stroke="currentColor" />
                  <path d={`M${346 - i * 18},420 L${346 - i * 18},390 Q${354 - i * 18},378 ${362 - i * 18},390 L${362 - i * 18},420 Z`} fill="none" stroke="currentColor" />
                </g>
              ))}
              {/* gladiator silhouette */}
              <g transform="translate(190, 100)" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="10" cy="14" r="9" />
                <path d="M2,8 Q10,-2 18,8" /> {/* crest */}
                <line x1="10" y1="23" x2="10" y2="55" />
                <line x1="10" y1="32" x2="-6" y2="42" /> {/* shield arm */}
                <rect x="-14" y="32" width="10" height="22" fill="oklch(0.74 0.14 75 / 0.25)" />
                <line x1="10" y1="32" x2="26" y2="20" /> {/* sword arm */}
                <line x1="26" y1="20" x2="34" y2="8" strokeWidth="3" />
                <line x1="10" y1="55" x2="2" y2="78" />
                <line x1="10" y1="55" x2="18" y2="78" />
              </g>
              <text x="200" y="478" textAnchor="middle" fill="currentColor" className="font-heading" style={{ fontSize: "10px", letterSpacing: "0.3em" }}>
                CROSS-SECTION · HYPOGEUM
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* GLADIATORS */}
      <section id="gladiators" className="relative py-32 px-6 bg-stone-rome/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center reveal mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">The Fighters</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Gladiator Classes</h2>
            <p className="font-body italic text-parchment/70 mt-4 max-w-2xl mx-auto">Each class a discipline, each pairing a story carved in sand and blood.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GLADIATORS.map((g, i) => (
              <article
                key={g.name}
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
                  <div className="text-5xl mb-4">{g.icon}</div>
                  <h3 className="font-heading font-bold text-gold-light text-2xl">{g.name}</h3>
                  <span className="inline-block mt-2 px-2 py-1 text-[0.6rem] tracking-[0.3em] uppercase font-heading bg-crimson-bright/80 text-parchment rounded-sm">
                    {g.type}
                  </span>
                  <div className="my-5 h-px w-10 bg-gold" />
                  <p className="font-body text-parchment/80 leading-relaxed">{g.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ART */}
      <section id="art" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center reveal mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">The Hand of Rome</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Roman Art Gallery</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 reveal" style={{ gridAutoRows: "minmax(180px, auto)" }}>
            {ART.map((a, i) => (
              <div
                key={a.name}
                className={`group relative overflow-hidden rounded-sm border border-gold/20 bg-stone-mid/60 p-6 ${a.className}`}
                style={{ minHeight: i === 0 ? 380 : 200, background: "linear-gradient(160deg, oklch(0.27 0.03 60), oklch(0.18 0.04 30))" }}
              >
                <span className="absolute inset-0 grid place-items-center text-[8rem] opacity-[0.12] transition-transform duration-700 group-hover:scale-110" style={{ filter: "sepia(0.6)" }}>
                  {a.icon}
                </span>
                <div className="relative h-full flex flex-col justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                  <p className="font-heading text-gold tracking-[0.25em] text-[0.65rem] uppercase">{a.era}</p>
                  <h3 className="font-display text-parchment text-xl mt-2">{a.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="relative py-32 px-6 bg-stone-rome/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center reveal mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">The Three Orders</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Architectural Orders</h2>
            <p className="font-body italic text-parchment/70 mt-4 max-w-2xl mx-auto">Stacked one upon the other, the orders rise around the arena — a primer in stone for any who would look up.</p>
          </div>
          <div className="grid md:grid-cols-3 border border-gold/20 reveal">
            {ORDERS.map((o, i) => (
              <div key={o.name} className={`relative p-12 overflow-hidden ${i < 2 ? "md:border-r border-gold/20" : ""}`}>
                <span className="absolute right-4 -top-4 font-display text-[10rem] leading-none text-gold/[0.06] select-none pointer-events-none">
                  {o.numeral}
                </span>
                <div className="relative">
                  <div className="text-5xl mb-4">{o.icon}</div>
                  <h3 className="font-display text-gold-light text-3xl mb-3">{o.name}</h3>
                  <div className="h-px w-10 bg-gold mb-4" />
                  <p className="font-body text-parchment/80 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPERORS */}
      <section id="emperors" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center reveal mb-16">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">Imperial Lineage</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>The Emperors</h2>
          </div>
          <div className="relative pl-12 md:pl-20" style={{ borderLeft: "1px solid", borderImage: "linear-gradient(to bottom, transparent, var(--gold), transparent) 1" }}>
            {EMPERORS.map((e) => (
              <div key={e.name} className="relative reveal grid md:grid-cols-[160px_1fr] gap-6 mb-14">
                <span className="absolute -left-[14px] top-2 w-[10px] h-[10px] rounded-full bg-gold" style={{ boxShadow: "0 0 16px var(--gold)" }} />
                <p className="font-heading text-gold tracking-[0.2em] text-xs uppercase pt-1">{e.years}</p>
                <div>
                  <h3 className="font-display text-parchment text-2xl mb-2">{e.name}</h3>
                  <p className="font-body italic text-parchment/75 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-gold/20 px-6 py-16" style={{ background: "linear-gradient(to bottom, transparent, oklch(0.06 0.01 60))" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr_1fr] gap-10">
          <div>
            <p className="font-display font-black text-gold tracking-widest text-lg">⚔ COLOSSEUM</p>
            <p className="font-body italic text-parchment/60 mt-3 max-w-sm">A digital monument to the Eternal City — where stone, blood, and gold became myth.</p>
          </div>
          <div>
            <p className="font-heading text-gold tracking-[0.3em] text-[0.65rem] uppercase mb-4">Explore</p>
            <ul className="space-y-2 font-body text-parchment/70">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-gold-light transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-gold tracking-[0.3em] text-[0.65rem] uppercase mb-4">Eras</p>
            <ul className="space-y-2 font-body text-parchment/70">
              <li>Republican Rome</li>
              <li>Early Empire</li>
              <li>High Empire</li>
              <li>Late Antiquity</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gold/10 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <p className="font-body text-parchment/40">© MMXXVI · Carved in pixels, eternal as stone.</p>
          <p className="font-body italic text-gold/50">Dum Colosseum stabit, et Roma stabit.</p>
        </div>
      </footer>
    </div>
  );
}
