import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import DotField from "../components/DotField";
import Magnetic from "../components/Magnetic";
import Lenis from "lenis";
import EventCarousel from "../components/EventCarousel";
import EventModal from "../components/EventModal";
import { ScrollText, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Colosseum,
  head: () => ({
    meta: [
      { title: "COLOSSEUM 2026 — BEC Creative Spectrum" },
      {
        name: "description",
        content:
          "The inaugural Techno-Cultural Festival of BEC Creative Spectrum at Basaveshwar Engineering College. Where engineering minds clash and creative souls dazzle.",
      },
      { property: "og:title", content: "COLOSSEUM 2026 — BEC Creative Spectrum" },
      { name: "theme-color", content: "#0c0c0e" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    ],
  }),
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#technical", label: "Technical" },
  { href: "#stage", label: "Stage" },
  { href: "#schedule", label: "Schedule" },
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

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(1);
  const schedule = {
    day1: [
      { 
        time: "1:00 PM", 
        duration: "Opening",
        type: "Ceremony", 
        title: "Inauguration", 
        location: "Gallery Hall",
        desc: "Official opening ceremony of COLOSSEUM 2026 — marking the beginning of two days of competition, culture, and creativity."
      },
      { 
        time: "2:00 – 4:00 PM", 
        duration: "2 hrs",
        type: "Tech Combat · Colosseum Club", 
        title: "Royal Rumble", 
        location: "Gallery Hall",
        players: "2 – 4 Players",
        fee: "₹25 / person",
        desc: "A two-stage tech competition where teams battle using knowledge — answering questions to earn points, attack rivals, and ultimately outlast opponents."
      },
      { 
        time: "4:00 – 5:00 PM", 
        duration: "1 hr · Finals",
        type: "Stage 2 — Finals", 
        title: "Clash Royale", 
        location: "Gallery Hall",
        desc: "Top 8 teams from Royal Rumble advance to this head-to-head tactical finals — a card-based combat showdown where the last team standing is crowned champion."
      },
      { 
        time: "5:00 – 5:30 PM", 
        duration: "30 mins",
        type: "Break", 
        title: "— Break —", 
        location: "",
        desc: "Short interval to recharge before the cultural sessions."
      },
      { 
        time: "5:30 – 6:30 PM", 
        duration: "1 hr",
        type: "Cultural · Music Club", 
        title: "Open Jamming Session", 
        location: "Gallery Hall",
        players: "Open to All",
        desc: "A fun, informal musical break where anyone can take the stage and perform. A lively 60-minute celebration of talent and good vibes."
      },
      { 
        time: "6:30 – 7:00 PM", 
        duration: "30 mins",
        type: "Performance · Nataraj Dance Club", 
        title: "Dance Battle", 
        location: "Gallery Hall",
        players: "Performance Only",
        desc: "An exciting solo showdown between four Nataraj Club members. Two semi-finals lead to a thrilling final — judged on energy and creativity."
      },
    ],
    day2: [
      { 
        time: "9:00 – 10:00 AM", 
        duration: "1 hr",
        type: "Session · Robotics & Drone Club", 
        title: "Robotics Conclave", 
        location: "Gallery Hall",
        players: "Open to All",
        desc: "An engaging educational session covering the fundamentals of robotics — anatomy, sensors, and actuators. Sets the stage for ROBOWARS."
      },
      { 
        time: "10:00 – 10:15 AM", 
        duration: "15 mins",
        type: "Break", 
        title: "— Transition Break —", 
        location: "",
        desc: ""
      },
      { 
        time: "10:15 AM – 12:00 PM", 
        duration: "1 hr 45 mins",
        type: "Combat · Robotics & Drone Club", 
        title: "ROBOWARS", 
        location: "Gallery Hall",
        players: "Solo",
        fee: "₹25 / person",
        prize: "₹6,000 Pool",
        desc: "A virtual robot-building and combat competition where teams strategically assemble their robots and battle head-to-head in a 1v1 format."
      },
      { 
        time: "12:00 – 1:30 PM", 
        duration: "1.5 hrs",
        type: "Break", 
        title: "— Lunch Break —", 
        location: "",
        desc: ""
      },
      { 
        time: "2:00 – 4:00 PM", 
        duration: "2 hrs",
        type: "Challenge · Innovation Club", 
        title: "Domino Effect", 
        location: "Gallery Hall",
        players: "2 – 4 Players",
        fee: "₹25 / person",
        prize: "₹9,000 Pool",
        desc: "A progressive boss-battle challenge where teams solve questions to advance through levels and face increasingly difficult boss encounters."
      },
      { 
        time: "4:15 – 5:00 PM", 
        duration: "45 mins",
        type: "Photography · Photo & Video Club", 
        title: "Frame The Chaos", 
        location: "Gallery Hall",
        players: "Individual",
        fee: "₹25 / person",
        prize: "₹3,000 Pool",
        desc: "A 45-minute open photography sprint where participants capture their best shot across Portrait, Product, and Street themes."
      },
      { 
        time: "5:00 – 5:15 PM", 
        duration: "15 mins",
        type: "Break", 
        title: "— Break —", 
        location: "",
        desc: ""
      },
      { 
        time: "5:15 – 6:15 PM", 
        duration: "1 hr",
        type: "Talent Showcase · Cultural", 
        title: "BEC's Got Latent", 
        location: "Gallery Hall",
        players: "Open to All",
        desc: "An open, non-competitive talent showcase where any BEC student can take the stage and perform for up to 5 minutes."
      },
      { 
        time: "6:20 – 8:00 PM", 
        duration: "1 hr 40 mins",
        type: "Grand Finale · Music · Dance · Drama", 
        title: "Grand Cultural Concert", 
        location: "Gallery Hall",
        prize: "Closing Ceremony",
        desc: "The spectacular closing event featuring curated performances by the Music, Dance, and Drama clubs. A powerful statement of identity."
      },
    ],
  };

  const currentSchedule = activeDay === 1 ? schedule.day1 : schedule.day2;

  return (
    <section id="schedule" className="relative py-40 px-6 bg-ash/50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 reveal">
          <span className="font-heading text-gold/60 tracking-[0.4em] text-[0.6rem] uppercase block mb-4">The Chronology</span>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mb-8 tracking-widest uppercase">Event Schedule</h2>
          
          {/* Day Toggles */}
          <div className="flex justify-center gap-4 mt-12">
            {[1, 2].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-10 py-3 font-heading text-xs tracking-[0.3em] uppercase transition-all duration-500 border ${
                  activeDay === day 
                    ? "bg-gold text-ash border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                    : "text-gold/60 border-gold/20 hover:border-gold/50"
                }`}
              >
                Day 0{day}
              </button>
            ))}
          </div>
          <p className="mt-6 font-body italic text-parchment/40 text-sm">
            {activeDay === 1 ? "Saturday, May 16, 2026" : "Sunday, May 17, 2026"}
          </p>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-4"
            >
              {currentSchedule.map((item, idx) => {
                const isBreak = item.type === "Break";
                return (
                  <div 
                    key={idx}
                    className={`group flex flex-col md:grid md:grid-cols-[160px_1fr_auto] items-start gap-6 p-6 md:p-8 transition-all relative overflow-hidden ${
                      isBreak 
                        ? "bg-gold/[0.01] border border-dashed border-gold/10 opacity-60" 
                        : "bg-gold/[0.03] border border-gold/10 hover:border-gold/30 hover:bg-gold/[0.07] shadow-sm hover:shadow-gold/5"
                    }`}
                  >
                    {!isBreak && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-gold/0 group-hover:bg-gold transition-all duration-500" />
                    )}
                    
                    {/* Time */}
                    <div className="w-full shrink-0 flex flex-col gap-1">
                      <span className="font-display text-lg text-gold tracking-tighter block leading-none">{item.time}</span>
                      <span className="font-heading text-[0.6rem] text-gold/40 tracking-widest uppercase">
                        {item.duration}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-grow text-left">
                      <span className={`text-[0.6rem] font-heading tracking-[0.2em] uppercase mb-2 block ${
                        ["Technical", "Tech Combat", "Combat", "Challenge"].some(t => item.type?.includes(t)) ? "text-crimson" : 
                        ["Cultural", "Talent", "Finale", "Performance", "Session"].some(t => item.type?.includes(t)) ? "text-blue-400" : 
                        item.type === "Ceremony" ? "text-gold" :
                        "text-gold/40"
                      }`}>
                        {item.type}
                      </span>
                      <h4 className={`font-display text-xl text-parchment tracking-wide uppercase mb-2 ${isBreak ? "italic text-parchment/40" : ""}`}>
                        {item.title}
                      </h4>
                      {item.desc && (
                        <p className="font-body text-parchment/60 text-sm leading-relaxed max-w-2xl mb-4">
                          {item.desc}
                        </p>
                      )}
                      {item.location && (
                        <p className="font-heading text-[0.6rem] tracking-widest text-gold/30 uppercase flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold/20" />
                          {item.location}
                        </p>
                      )}
                    </div>

                    {/* Meta Pills */}
                    <div className="flex flex-wrap md:flex-col gap-2 items-end mt-4 md:mt-0">
                      {item.players && (
                        <span className="text-[0.55rem] font-heading tracking-widest uppercase px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full">
                          {item.players}
                        </span>
                      )}
                      {item.fee && (
                        <span className="text-[0.55rem] font-heading tracking-widest uppercase px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full">
                          Fee: {item.fee}
                        </span>
                      )}
                      {item.prize && (
                        <span className="text-[0.55rem] font-heading tracking-widest uppercase px-3 py-1 bg-crimson/10 text-crimson border border-crimson/20 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                          {item.prize}
                        </span>
                      )}
                    </div>

                    {/* Icon/Decoration */}
                    {!isBreak && (
                      <div className="opacity-[0.03] group-hover:opacity-[0.08] transition-opacity absolute -right-4 -bottom-4 hidden md:block">
                        <ScrollText size={100} className="text-gold" />
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const targetDate = new Date("2026-05-16T13:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl md:text-4xl text-gold-gradient font-bold tracking-tighter">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="font-heading text-[0.5rem] md:text-[0.6rem] text-gold/40 tracking-[0.3em] uppercase mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="flex justify-center items-center gap-4 md:gap-8 mt-12 mb-8 bg-gold/5 backdrop-blur-sm border border-gold/10 px-8 py-4 rounded-sm"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="h-8 w-px bg-gold/20" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="h-8 w-px bg-gold/20" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="h-8 w-px bg-gold/20" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  desc: string;
  fullBrief: string;
  rules: string[];
  registerUrl: string;
  contacts: { name: string; phone: string }[];
}

function Colosseum() {
  useReveal();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle background scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [isModalOpen]);

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

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
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
            <span className="relative z-10">Enter the Arena</span>
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
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-black text-gold-gradient tracking-[0.2em] text-sm md:text-lg hover:brightness-125 transition-all flex items-center gap-2"
          >
            <span className="hidden sm:inline">⚔</span> COLOSSEUM
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-12">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="font-heading text-[0.65rem] tracking-[0.4em] uppercase text-parchment/60 hover:text-gold transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gold p-3 z-[110] -mr-2 touch-manipulation"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-transform duration-500 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-transform duration-500 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
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
          className="relative z-20 text-center px-4 w-full"
        >
          <p
            className="font-heading text-gold tracking-[0.5em] text-[0.6rem] md:text-xs uppercase mb-2"
            style={{ animation: mounted ? "fadeUp 0.9s 0.3s both" : undefined, opacity: 1 }}
          >
            BEC Creative Spectrum Presents
          </p>
          <div 
            className="py-4 md:py-8 flex flex-col justify-center items-center"
          >
            <h1
              className="font-display text-gold leading-[1.1] pb-2 px-2 flex justify-center items-center flex-nowrap gap-0 md:gap-2 relative z-[50]"
              style={{ 
                fontSize: "min(13vw, 12rem)",
                textShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
              }}
            >
              COLOSSEUM
            </h1>
            <h2 className="font-display text-gold-gradient text-2xl md:text-5xl tracking-[0.4em] -mt-2 md:-mt-4">
              2026
            </h2>
          </div>
          <p
            className="font-heading text-gold/80 tracking-[0.3em] text-[0.6rem] md:text-xs uppercase mb-8"
            style={{ animation: mounted ? "fadeUp 1s 0.6s both" : undefined, opacity: 1 }}
          >
            16th & 17th May 2026 · Gallery Hall, BEC
          </p>
          <Countdown />
          <p
            className="font-body italic text-parchment/80 mt-6 max-w-sm md:max-w-none mx-auto"
            style={{
              fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
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
          dotRadius={3}
          dotSpacing={16}
          glowRadius={220}
          bulgeStrength={120}
          sparkle={true}
          gradientFrom="rgba(212, 175, 55, 0.8)"
          gradientTo="rgba(212, 175, 55, 0.3)"
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
              For over sixty years, Basaveshwar Engineering College has stood as a bastion of technical excellence. Today, we're writing a new chapter. 
              BEC Creative Spectrum, the college's first-ever student-led creative movement, presents Colosseum 2026. 
            </p>
            <p className="font-body text-parchment/70 text-lg leading-relaxed mb-8">
              This isn't just another festival; it's a two-day collision of technical grit and artistic soul. We're bridging the gap between the precision 
              of robotics and the raw energy of performance, proving that true engineering is as much about the heart as it is about the mind.
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

      {/* TECHNICAL EVENTS SECTION */}
      <section id="technical" className="relative bg-ash pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">
            The Competitive Arena
          </p>
          <h2
            className="font-display font-black text-gold-gradient"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Technical Events
          </h2>
        </div>
        <EventCarousel filterType="TECHNICAL EVENTS" onSelect={handleEventSelect} />
      </section>

      {/* STAGE EVENTS SECTION */}
      <section id="stage" className="relative bg-ash pt-10 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <p className="font-heading text-gold tracking-[0.4em] text-[0.7rem] uppercase mb-4">
            The Spotlight Awaits
          </p>
          <h2
            className="font-display font-black text-gold-gradient"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Stage Events
          </h2>
        </div>
        <EventCarousel filterType="STAGE EVENTS" onSelect={handleEventSelect} />
      </section>

      <section className="relative py-40 px-6 bg-ash overflow-hidden border-t border-gold/10">
        <div className="marble-texture opacity-[0.03]" />
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <p className="font-heading text-[#d4af37] tracking-[0.6em] text-[0.8rem] uppercase mb-12 font-bold">
            The Gladiators' Call
          </p>
          <h2
            className="font-display leading-tight mb-16"
            style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)", letterSpacing: "0.1em" }}
          >
            <span className="font-heading text-[0.35em] md:text-[0.3em] text-[#d4af37] tracking-[0.5em] block mb-4 font-black uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              THIS IS THE CALL FOR GLADIATORS
            </span>
            <span className="font-heading text-[0.2em] md:text-[0.18em] text-[#d4af37] tracking-[0.7em] block mb-10 md:mb-14 font-bold uppercase italic drop-shadow-md">
              BE THE ONE TO SAY
            </span>
            <span className="text-gold-gradient">
              "VENI, VIDI, VICI"
            </span>
          </h2>
          <div className="h-px w-24 bg-[#d4af37]/40 mx-auto mb-12 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          <p className="font-heading text-parchment/90 tracking-[0.4em] text-[0.8rem] uppercase">
            Basaveshwar Engineering College <br />
            <span className="text-[#d4af37]">BEC Creative Spectrum · MMXXVI</span>
          </p>
        </div>
      </section>

      <ScheduleSection />

      <section className="relative py-24 px-6 bg-ash overflow-hidden border-t border-gold/10">
        <div className="marble-texture opacity-[0.02]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          
          {/* Left Footer */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h3 className="font-display text-gold/80 text-xl md:text-2xl tracking-[0.2em] mb-2 uppercase">
              COLOSSEUM 2026
            </h3>
            <p className="font-heading text-gold/40 text-[0.65rem] tracking-[0.4em] uppercase">
              Basaveshwar Engineering College
            </p>
          </div>

          {/* Center Decoration */}
          <div className="order-1 md:order-2">
            <Wreath className="w-16 h-16 text-gold/10" />
          </div>

          {/* Right Footer */}
          <div className="text-center md:text-right order-3">
            <p className="font-heading text-parchment/60 text-[0.7rem] tracking-[0.3em] uppercase mb-4 leading-relaxed">
              BEC Campus, Vidyagiri <br />
              Bagalkot, Karnataka
            </p>
            <a 
              href="tel:7483416231"
              className="group flex items-center justify-center md:justify-end gap-3 text-gold hover:text-parchment transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="font-heading text-[0.55rem] tracking-[0.4em] uppercase text-gold/40 group-hover:text-gold/60 transition-colors">
                  Helpline
                </span>
                <span className="font-body text-xl tracking-widest font-bold">
                  7483416231
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-ash transition-all">
                <Phone size={16} />
              </div>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gold/20 font-heading text-[0.5rem] tracking-[0.5em] uppercase">
          <span>MMXXVI · BEC Creative Spectrum</span>
          <span>Incurred in Engineering · Dazzled in Creativity</span>
        </div>
      </section>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
