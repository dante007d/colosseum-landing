import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'

content = """import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Colosseum,
  head: () => ({
    meta: [
      { title: "COLOSSEUM 2026 — Techno-Cultural Festival" },
      { name: "description", content: "The inaugural Techno-Cultural Festival of BEC Creative Spectrum at Basaveshwar Engineering College." },
      { property: "og:title", content: "COLOSSEUM 2026 — BEC Creative Spectrum" },
    ],
  }),
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
];

const EVENTS = [
  { name: "ROYAL RUMBLE", type: "Technical Battle Royale", icon: "/roman-art/helmet.png", desc: "A high-octane Battle Royale where teams answer technical questions to earn points and attack rival teams. The last team standing wins." },
  { name: "CLASH ROYALE", type: "Technical Team Battle", icon: "/roman-art/shield.png", desc: "Teams solve technical questions to activate troop cards and deploy them against opponents in a strategic head-to-head battle." },
  { name: "ROBOWARS", type: "Virtual Robot Combat", icon: "/roman-art/ballista.png", desc: "Construct virtual robots by selecting bodies and weapons, then battle in a 1v1 elimination bracket to outmaneuver opponents." },
  { name: "DOMINO EFFECT", type: "Innovation Challenge", icon: "/roman-art/arch.png", desc: "A progressive challenge facing increasingly powerful 'Boss Encounters'. Solve problems under pressure to defeat the Final Boss." },
  { name: "FRAME THE CHAOS", type: "Photography sprint", icon: "/roman-art/mosaic.png", desc: "A 60-minute photography sprint across the campus to capture beauty, stillness, and meaning in the chaos of the festival." },
  { name: "BEC'S GOT LATENT", type: "Open Talent Showcase", icon: "/roman-art/lyre.png", desc: "An open platform for any student to showcase unique talents—singing, comedy, magic, or instrumental performance." },
];

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

function Colosseum() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      if (heroRef.current) heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.15}px) scale(1.02)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showIntro]);

  const handleIntroComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setShowIntro(false);
    }, 1000);
  };

  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 z-[200] bg-ash flex items-center justify-center">
        <div className="text-center p-8 border border-gold/20 rounded-sm backdrop-blur-xl bg-stone-rome/40 relative overflow-hidden">
          <div className="marble-texture" />
          <h2 className="font-display text-gold-gradient text-3xl mb-8 tracking-[0.2em]">COLOSSEUM 2026</h2>
          <button 
            onClick={() => {
              setHasInteracted(true);
              if (audioRef.current) audioRef.current.play().catch(e => console.log("Audio play blocked", e));
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.play().catch(e => console.log("Video play blocked", e));
              }
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

  if (showIntro) {
    return (
      <div className={`fixed inset-0 z-[100] bg-ash flex items-center justify-center transition-opacity duration-1000 ${isExiting ? "opacity-0" : "opacity-100"}`}>
        <audio ref={audioRef} src="/intro-audio.mp3" autoPlay />
        <video ref={videoRef} muted autoPlay playsInline onEnded={handleIntroComplete} className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <button onClick={handleIntroComplete} className="absolute bottom-10 right-10 z-[110] font-heading text-gold/60 hover:text-gold tracking-[0.3em] text-[0.6rem] uppercase border border-gold/20 px-4 py-2 backdrop-blur-sm transition-all hover:bg-gold/10">
          Skip Intro
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen animate-fade-in" style={{ animationDuration: "1.5s" }}>
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-gold/20" style={{ background: "oklch(0.10 0.01 60 / 0.92)" }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-display font-black text-gold tracking-widest text-lg">⚔ COLOSSEUM</a>
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

      <header className="relative h-screen overflow-hidden flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <Particles />
        <div ref={heroRef} className="relative z-20 text-center px-6 w-full max-w-none">
          <p className="font-heading text-gold tracking-[0.4em] text-xs uppercase mb-6" style={{ animation: mounted ? "fadeUp 0.9s 0.3s both" : undefined, opacity: 1 }}>
            16th & 17th May 2026 · BEC Creative Spectrum
          </p>
          <h1 className="font-display font-black text-gold-gradient leading-[1.2] pb-6 px-4 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]" style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", animation: mounted ? "fadeUp 1s 0.5s both" : undefined, opacity: 1 }}>
            COLOSSEUM
          </h1>
          <p className="font-body italic text-parchment/80 mt-6" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", animation: mounted ? "fadeUp 1s 0.8s both" : undefined, opacity: 1 }}>
            Where engineering minds clash and creative souls dazzle.
          </p>
          <div className="mx-auto mt-10" style={{ width: 180, height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", animation: mounted ? "fadeUp 1s 1s both" : undefined, opacity: 1 }} />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gold/70">
          <span className="font-heading tracking-[0.4em] text-[0.6rem] uppercase">Scroll</span>
          <span className="block w-px h-12 bg-gold/60 origin-top" style={{ animation: "elongate 2.4s ease-in-out infinite" }} />
        </div>
      </header>

      <section id="about" className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="marble-texture" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center border-x border-gold/10 px-8 md:px-20 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="reveal">
            <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">The Legacy</p>
            <h2 className="font-display text-gold-gradient mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>About the Festival</h2>
            <p className="font-body text-parchment/80 text-lg leading-relaxed mb-5">
              COLOSSEUM 2026 is the inaugural Techno-Cultural Festival of BEC Creative Spectrum—the first student-led creative association in the 60-year history of Basaveshwar Engineering College.
            </p>
            <p className="font-body text-parchment/75 leading-relaxed">
              The festival spans two days, blending the technical rigour of competitive gaming and robotics with the creative richness of music, dance, drama, and photography.
            </p>
          </div>
          <div className="reveal relative aspect-square rounded-sm border border-gold/25 overflow-hidden bg-[#f5f2e8] shadow-imperial">
            <img src="/bec-logo.jpg" alt="BEC Creative Spectrum" className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      <section id="events" className="relative py-32 px-6 bg-ash overflow-hidden">
        <div className="marble-texture" />
        <div className="max-w-7xl mx-auto border-x border-gold/10 px-8 md:px-20 relative">
          <div className="text-center mb-24">
            <p className="font-heading text-gold tracking-[0.5em] text-[0.7rem] uppercase mb-6">The Arena of Excellence</p>
            <h2 className="font-display font-black text-gold-gradient" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>Featured Events</h2>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {EVENTS.map((event) => (
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
              </article>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
"""

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
