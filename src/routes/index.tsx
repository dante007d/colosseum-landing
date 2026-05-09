import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import DotField from "../components/DotField";
import Magnetic from "../components/Magnetic";
import Lenis from "lenis";
import EventCarousel from "../components/EventCarousel";

export const Route = createFileRoute("/")({
  component: Colosseum,
  head: () => ({
    meta: [
      { title: "COLOSSEUM 2026 — Techno-Cultural Festival" },
      {
        name: "description",
        content:
          "The inaugural Techno-Cultural Festival of BEC Creative Spectrum at Basaveshwar Engineering College.",
      },
      { property: "og:title", content: "COLOSSEUM 2026 — BEC Creative Spectrum" },
    ],
  }),
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
];

const EVENTS = [
  {
    name: "ROYAL RUMBLE",
    type: "Technical Battle Royale",
    icon: "/roman-art/helmet.png",
    desc: "A high-octane Battle Royale where teams answer technical questions to earn points and attack rival teams. The last team standing wins.",
  },
  {
    name: "CLASH ROYALE",
    type: "Technical Team Battle",
    icon: "/roman-art/shield.png",
    desc: "Teams solve technical questions to activate troop cards and deploy them against opponents in a strategic head-to-head battle.",
  },
  {
    name: "ROBOWARS",
    type: "Virtual Robot Combat",
    icon: "/roman-art/ballista.png",
    desc: "Construct virtual robots by selecting bodies and weapons, then battle in a 1v1 elimination bracket to outmaneuver opponents.",
  },
  {
    name: "DOMINO EFFECT",
    type: "Innovation Challenge",
    icon: "/roman-art/arch.png",
    desc: "A progressive challenge facing increasingly powerful 'Boss Encounters'. Solve problems under pressure to defeat the Final Boss.",
  },
  {
    name: "FRAME THE CHAOS",
    type: "Photography sprint",
    icon: "/roman-art/mosaic.png",
    desc: "A 60-minute photography sprint across the campus to capture beauty, stillness, and meaning in the chaos of the festival.",
  },
  {
    name: "BEC'S GOT LATENT",
    type: "Open Talent Showcase",
    icon: "/roman-art/lyre.png",
    desc: "An open platform for any student to showcase unique talents—singing, comedy, magic, or instrumental performance.",
  },
];

const Wreath = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
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
      { threshold: 0.08 },
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

function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll();

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
      style={{ scaleX: scrollYProgress, boxShadow: "0 0 15px var(--gold)" }}
    />
  );
}

function TsunamiEffect({ children }: { children: React.ReactNode }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  const smoothY = useSpring(lineY, { stiffness: 100, damping: 20 });

  return (
    <div ref={container} className="relative overflow-hidden group">
      {/* The Tsunami Scanning Line */}
      <motion.div
        style={{ top: smoothY }}
        className="absolute left-0 w-full h-[2px] z-30 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80"
      />
      {/* The Glow Aura that follows the line */}
      <motion.div
        style={{ top: smoothY }}
        className="absolute left-0 w-full h-20 -translate-y-1/2 z-20 bg-gradient-to-b from-transparent via-gold/10 to-transparent pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function FloatingArtifacts({ scrollY }: { scrollY: MotionValue<number> }) {
  const y1 = useTransform(scrollY, [0, 5000], [0, -1000]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
  const r1 = useTransform(scrollY, [0, 5000], [0, 45]);
  const r2 = useTransform(scrollY, [0, 5000], [0, -300]);

  const sy1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const sy2 = useSpring(y2, { stiffness: 50, damping: 20 });
  const sr1 = useSpring(r1, { stiffness: 50, damping: 20 });
  const sr2 = useSpring(r2, { stiffness: 50, damping: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.img
        style={{ y: sy1, rotate: sr1 }}
        src="/roman-art/helmet.png"
        className="absolute top-[20%] -left-20 w-64 md:w-96 opacity-10 filter blur-[2px]"
      />
      <motion.img
        style={{ y: sy2, rotate: sr2 }}
        src="/roman-art/shield.png"
        className="absolute top-[60%] -right-20 w-80 md:w-[32rem] opacity-10 filter blur-[1px]"
      />
    </div>
  );
}

function Colosseum() {
  useReveal();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroParallax = useTransform(smoothScrollY, [0, 800], [0, 300]);
  const heroOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);
  const bgScale = useTransform(smoothScrollY, [0, 1000], [1, 1.1]);

  const handleIntroComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 z-[200] bg-ash flex items-center justify-center">
        <div className="text-center p-8 border border-gold/20 rounded-sm backdrop-blur-xl bg-stone-rome/40 relative overflow-hidden">
          <div className="marble-texture" />
          <h2 className="font-display text-gold-gradient text-3xl mb-8 tracking-[0.2em]">
            COLOSSEUM 2026
          </h2>
          <button
            onClick={() => {
              setHasInteracted(true);
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.play().catch((e) => console.log("Video play blocked", e));
              }
            }}
            className="group relative px-12 py-4 bg-crimson text-parchment font-heading text-xs tracking-[0.4em] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <Magnetic strength={0.3}>
              <span className="relative z-10">Enter the Arena</span>
            </Magnetic>
            <div className="absolute inset-0 bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div
        className={`fixed inset-0 z-[100] bg-ash flex items-center justify-center transition-opacity duration-1000 ${isExiting ? "opacity-0" : "opacity-100"}`}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          onEnded={handleIntroComplete}
          className="w-full h-full object-cover"
        >
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
        <button
          onClick={handleIntroComplete}
          className="absolute bottom-10 right-10 z-[110] font-heading text-gold/60 hover:text-gold tracking-[0.3em] text-[0.6rem] uppercase border border-gold/20 px-4 py-2 backdrop-blur-sm transition-all hover:bg-gold/10"
        >
          Skip Intro
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-gold/30 selection:text-gold">
      <FloatingArtifacts scrollY={smoothScrollY} />
      <ScrollProgress />
      <nav
        className="fixed top-0 inset-x-0 z-[100] backdrop-blur-md border-b border-gold/20"
        style={{ background: "oklch(0.10 0.01 60 / 0.95)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-black text-gold-gradient tracking-[0.2em] text-base md:text-lg hover:brightness-125 transition-all"
          >
            ⚔ COLOSSEUM
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-12">
            {NAV.map((n) => (
              <li key={n.href}>
                <Magnetic strength={0.2}>
                  <a
                    href={n.href}
                    className="font-heading text-[0.65rem] tracking-[0.4em] uppercase text-parchment/60 hover:text-gold transition-colors"
                  >
                    {n.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gold p-2 z-[110]"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-ash/95 backdrop-blur-xl z-[105] transition-all duration-500 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"}`}
        >
          <div className="marble-texture" />
          <ul className="h-full flex flex-col items-center justify-center gap-12">
            {NAV.map((n, i) => (
              <motion.li
                key={n.href}
                initial={{ opacity: 0, y: 20 }}
                animate={mobileMenuOpen ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={n.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl tracking-[0.3em] uppercase text-gold-gradient hover:scale-110 transition-transform inline-block"
                >
                  {n.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: bgScale, opacity: heroOpacity }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <Particles />
        <motion.div
          style={{ y: heroParallax, opacity: heroOpacity }}
          className="relative z-20 text-center px-6 w-full max-w-none"
        >
          <p
            className="font-heading text-gold tracking-[0.4em] text-xs uppercase mb-6"
            style={{ animation: mounted ? "fadeUp 0.9s 0.3s both" : undefined, opacity: 1 }}
          >
            16th & 17th May 2026 · BEC Creative Spectrum
          </p>
          <div className="py-8 overflow-hidden">
            <h1
              className="font-display text-imperial text-gold-gradient leading-[1.1] pb-8 px-4 flex justify-center flex-wrap gap-x-1 md:gap-x-2"
              style={{ fontSize: "clamp(2.5rem, 12vw, 12rem)" }}
            >
              {"COLOSSEUM".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, scaleY: 2, scaleX: 0.5 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </div>
          <p
            className="font-body italic text-parchment/80 mt-6"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              animation: mounted ? "fadeUp 1s 0.8s both" : undefined,
              opacity: 1,
            }}
          >
            Where engineering minds clash and creative souls dazzle.
          </p>
          <div
            className="mx-auto mt-10"
            style={{
              width: 180,
              height: 1,
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              animation: mounted ? "fadeUp 1s 1s both" : undefined,
              opacity: 1,
            }}
          />
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gold/70">
          <span className="font-heading tracking-[0.4em] text-[0.6rem] uppercase">Scroll</span>
          <span
            className="block w-px h-12 bg-gold/60 origin-top"
            style={{ animation: "elongate 2.4s ease-in-out infinite" }}
          />
        </div>
      </header>

      {/* QUOTE BANNER */}
      <section className="relative py-40 px-6 overflow-hidden bg-ash">
        <DotField
          dotRadius={2.5}
          dotSpacing={16}
          glowRadius={220}
          bulgeStrength={100}
          sparkle={true}
          gradientFrom="rgba(212, 175, 55, 0.6)"
          gradientTo="rgba(212, 175, 55, 0.2)"
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p
              className="font-body italic text-parchment drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)", lineHeight: 1.3 }}
            >
              “Where engineering minds clash with complex problems and creative souls dazzle with
              brilliance.”
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-px bg-gold/40 mx-auto mt-12"
            />
            <p className="font-heading text-gold/90 tracking-[0.6em] text-[0.8rem] uppercase mt-10">
              The Philosophy of Colosseum
            </p>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative py-32 md:py-48 px-6 overflow-hidden">
        <div className="marble-texture" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center border-x border-gold/10 px-8 md:px-20 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-heading text-gold tracking-[0.5em] text-[0.8rem] uppercase mb-6">
              The Legacy
            </p>
            <h2
              className="font-display text-gold-gradient mb-10"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              About the Festival
            </h2>
            <p className="font-body text-parchment/90 text-xl leading-relaxed mb-8">
              COLOSSEUM 2026 is the inaugural Techno-Cultural Festival of BEC Creative Spectrum—the
              first student-led creative association in the 60-year history of Basaveshwar
              Engineering College.
            </p>
            <p className="font-body text-parchment/80 text-lg leading-relaxed">
              The festival spans two days, blending the technical rigour of competitive gaming and
              robotics with the creative richness of music, dance, drama, and photography.
            </p>
          </motion.div>

          <TsunamiEffect>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ y: [0, -20, 0] }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 1 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative aspect-square rounded-sm border-2 border-gold/40 overflow-hidden bg-stone-rome/40 backdrop-blur-md shadow-[0_0_80px_rgba(212,175,55,0.1)] group"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-gold/15 to-transparent -translate-x-full"
                  style={{ animation: "shimmer 4s infinite ease-in-out" }}
                />
              </div>

              <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors duration-1000" />
              <img
                src="/logo.png"
                alt="BEC Creative Spectrum"
                className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </TsunamiEffect>
        </div>
      </section>

      {/* EVENTS SECTION - CAROUSEL */}
      <section id="events" className="relative bg-ash py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">
            Competitive Arena
          </p>
          <h2
            className="font-display font-black text-gold-gradient"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Featured Events
          </h2>
        </div>

        <EventCarousel />
      </section>

      <section className="relative py-40 px-6 bg-ash overflow-hidden border-t border-gold/10">
        <div className="marble-texture" />
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="font-heading text-gold/40 tracking-[0.6em] text-[0.65rem] uppercase mb-12">
            The Convergence Awaits
          </p>
          <h2
            className="font-display text-gold-gradient leading-tight mb-16"
            style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)", letterSpacing: "0.1em" }}
          >
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
