import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  desc: string;
  fullBrief: string;
  rules: string[];
  registerUrl: string;
  fee?: string;
  prize?: string;
  players?: string;
  contacts: { name: string; phone: string }[];
}

interface CardProps {
  card: CardData;
  index: number;
  activeIndex: number;
  totalCards: number;
  onClick: () => void;
  onSelect?: (card: CardData) => void;
}

export const cardData: CardData[] = [
  {
    id: 1,
    imageUrl: "/roman-art/helmet.png",
    title: "ROYAL RUMBLE",
    type: "TECHNICAL EVENTS",
    desc: "A two-stage tech competition where teams battle using knowledge to attack rivals and outlast opponents.",
    fullBrief: "Royal Rumble is a high-octane two-stage tech competition where teams battle using knowledge. Stage 1 (Decode or Death) is a high-speed technical battle where teams earn points to survive. Stage 2 (Clash Royale) pits the Top 8 in a head-to-head tactical finals — a card-based combat showdown where the last team standing is crowned champion.",
    rules: [
      "2 – 4 Players per team.",
      "Registration Fee: ₹25 / person.",
      "Stage 1: Teams answer technical questions to earn Attack Points and survive elimination.",
      "Stage 2 (Clash Royale): Top 8 teams advance to a 1v1 bracket showdown using a Card-Based Combat system.",
      "Card System: Solve questions to charge Weapon Cards (Easy = small charge, Hard = massive charge).",
      "Elimination: Teams are knocked out when their Health Bar hits zero.",
      "Coordinators have final authority; no phones or AI tools allowed."
    ],
    registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd1lCb2Q28g_qxZW00HGZXY6CGyX7mE_RvRSLGtXnnQmPKIXw/viewform?usp=header",
    fee: "₹25 / person",
    prize: "Trophy & Certs",
    players: "2 – 4 Players",
    contacts: [
      { name: "GAURAV", phone: "9902354734" },
      { name: "VINOD", phone: "7483582091" }
    ],
  },
  {
    id: 3,
    imageUrl: "/roman-art/ballista.png",
    title: "ROBOWARS",
    type: "TECHNICAL EVENTS",
    desc: "A virtual robot-building and combat competition where smart builds and sharper tactics decide the winner.",
    fullBrief: "ROBOWARS is a virtual robot-building and combat competition where teams strategically assemble their robots and battle head-to-head in a 1v1 elimination format. From selecting the right chassis to choosing the perfect weapon systems within a budget, every decision counts in this simulated arena where the sharpest tactics walk away with the prize.",
    rules: [
      "Format: Solo participation.",
      "Registration Fee: ₹25 / person | Prize Pool: ₹6,000.",
      "Build Phase: Construct your virtual robot within the allotted budget.",
      "Combat Phase: 1v1 elimination bracket based on build performance and strategy.",
      "Every question solved provides resources for robot upgrades.",
      "Coordinators moderate all combat simulations; decisions are final."
    ],
    registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfp0JvD9thvhq0XnWzwuX0uwXADkT43zGpJMidxQ6MmaLnDsQ/viewform",
    fee: "₹25 / person",
    prize: "₹6,000 Pool",
    players: "Solo",
    contacts: [
      { name: "ANKIT", phone: "9964006126" },
      { name: "ADITYA", phone: "6363874472" }
    ],
  },
  {
    id: 4,
    imageUrl: "/roman-art/arch.png",
    title: "DOMINO EFFECT",
    type: "TECHNICAL EVENTS",
    desc: "A progressive boss-battle challenge where teams face increasingly difficult obstacles to reach the Final Boss.",
    fullBrief: "Domino Effect is a progressive boss-battle challenge where teams solve technical and logical questions to advance through levels. At every interval, teams face increasingly difficult boss encounters that test their problem-solving under pressure. The first team to defeat the Final Boss claims victory in this ultimate test of endurance and intellect.",
    rules: [
      "2 – 4 Players per team.",
      "Registration Fee: ₹25 / person | Prize Pool: ₹9,000.",
      "Progression: Answer questions correctly to advance to the next level.",
      "Boss Encounters: Multi-part problems that must be defeated to progress.",
      "Final Victory: The first team to conquer the Final Boss wins.",
      "Coordinators moderate all disputes; no external assistance allowed."
    ],
    registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe5B_mnYQx5QNeMkDfWJoqGrqQVZ0n7RsybuC8TotiCccldag/viewform",
    fee: "₹25 / person",
    prize: "₹9,000 Pool",
    players: "2 – 4 Players",
    contacts: [
      { name: "ABHISHEK", phone: "9353807050" },
      { name: "VINOD", phone: "7483582091" }
    ],
  },
  {
    id: 5,
    imageUrl: "/roman-art/mosaic.png",
    title: "FRAME THE CHAOS",
    type: "STAGE EVENTS",
    desc: "A 45-minute photography sprint capturing the campus across Portrait, Product, and Street themes.",
    fullBrief: "Frame The Chaos is an intense photography sprint where participants have 45 minutes to capture their best shots across three mandatory themes: Portrait, Product, and Street Photography. It's a test of vision, creativity, and storytelling under time pressure, pushing participants to find the extraordinary within the campus chaos.",
    rules: [
      "Individual participation.",
      "Registration Fee: ₹25 / person | Prize Pool: ₹3,000.",
      "Time Limit: 45 minutes to capture and submit one shot per theme.",
      "Themes: Portrait, Product, and Street Photography are mandatory.",
      "Verification: Must submit original unedited versions along with edited shots.",
      "Edits: Only basic color and exposure corrections allowed. No AI manipulation."
    ],
    registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfmyZPOcnAQ40F4v4wSyTyntaiS25JJti2iHXgV-scHS8EoPg/viewform",
    fee: "₹25 / person",
    prize: "₹3,000 Pool",
    players: "Individual",
    contacts: [
      { name: "SURAJ", phone: "7483416231" },
      { name: "ABHIGNYA", phone: "7259304433" }
    ],
  },
  {
    id: 6,
    imageUrl: "/roman-art/lyre.png",
    title: "BEC'S GOT LATENT",
    type: "STAGE EVENTS",
    desc: "An open talent showcase celebrating the hidden creativity of the BEC campus.",
    fullBrief: "BEC's Got Latent is an open, non-competitive talent showcase where any student can take the stage and perform. From singing and comedy to magic and beatboxing—this is a pure celebration of the diverse hidden talents across our campus. It's about participation, togetherness, and giving every creative soul a spotlight.",
    rules: [
      "Open to all BEC students (Individual or Group).",
      "Time Limit: Up to 5 minutes per performance.",
      "Talents: Singing, comedy, magic, dance, instrumentals, or any unique skill.",
      "Non-Competitive: A showcase of talent rather than a scored competition.",
      "Registration: Register online or on-the-spot (limited slots)."
    ],
    registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf8C3hy3RFMpJH-JMkAbgWAg6jFE2W_U9qZbwsE4TTfq67hhw/viewform",
    fee: "Free Entry",
    players: "Open to All",
    contacts: [
      { name: "GAURAV", phone: "9902354734" }
    ],
  },
  {
    id: 9,
    imageUrl: "/roman-art/ballista.png",
    title: "ROBOTICS CONCLAVE",
    type: "TECHNICAL EVENTS",
    desc: "An engaging educational session covering robot anatomy, sensors, and real-world applications.",
    fullBrief: "The Robotics Conclave is an engaging educational session designed for all skill levels. Covering everything from robot anatomy and sensors to advanced control systems and real-world industrial applications, this session sets the technical foundation for the ROBOWARS competition. It's where theory meets the arena.",
    rules: [
      "Open to all students and enthusiasts.",
      "Duration: 60 minutes of deep-dive learning.",
      "Covers: Anatomy, Sensors, Actuators, and Control Systems.",
      "Interactive Q&A session with club experts."
    ],
    registerUrl: "#",
    fee: "Free Session",
    players: "Open to All",
    contacts: [
      { name: "ANKIT", phone: "9964006126" }
    ],
  },
];

const WreathIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M30 80 Q10 70 15 30 Q20 10 50 15" strokeLinecap="round" />
    <path d="M70 80 Q90 70 85 30 Q80 10 50 15" strokeLinecap="round" />
    <path d="M25 60 L15 55 M22 45 L12 42 M28 32 L20 25" strokeLinecap="round" />
    <path d="M75 60 L85 55 M78 45 L88 42 M72 32 L80 25" strokeLinecap="round" />
  </svg>
);

export default function EventCarousel({ 
  onSelect, 
  filterType 
}: { 
  onSelect?: (card: CardData) => void;
  filterType?: string;
}) {
  const filteredData = filterType 
    ? cardData.filter(c => c.type === filterType) 
    : cardData;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 5000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredData.length);
  };

  useEffect(() => {
    if (!isPaused && filteredData.length > 1) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, filteredData.length]);

  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + filteredData.length) % filteredData.length;
    setActiveIndex(newSafeIndex);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const dragThreshold = 75;
    if (info.offset.x > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (info.offset.x < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  return (
    <section className="w-full py-24 overflow-hidden relative">
      <div
        className="w-full max-w-7xl mx-auto px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center pt-12">
          {/* Synchronized Background Classification Track */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-[300px] top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="whitespace-nowrap flex flex-col items-center justify-center"
              >
                <span className="font-display text-[8vw] md:text-[12vw] leading-none text-white/[0.03] uppercase tracking-[0.2em] font-black select-none">
                  {filteredData[activeIndex].type.split(" ")[0]}
                </span>
                <span className="font-display text-[4vw] md:text-[6vw] leading-none text-gold/[0.05] uppercase tracking-[1em] -mt-[2vw] select-none">
                  {filteredData[activeIndex].type.split(" ").slice(1).join(" ")}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="w-full h-full flex items-center justify-center relative z-10"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {filteredData.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                activeIndex={activeIndex}
                totalCards={filteredData.length}
                onClick={() => {
                  if (index === activeIndex) {
                    onSelect?.(card);
                  } else {
                    changeSlide(index);
                  }
                }}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        </div>

        {/* Pagination & Controls */}
        <div className="flex items-center justify-center gap-12 mt-16">
          <button
            onClick={() => changeSlide(activeIndex - 1)}
            className="w-14 h-14 rounded-full border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:border-gold/40 transition-all duration-500 group relative overflow-hidden"
            aria-label="Previous Event"
          >
            <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current fill-none relative z-10 transition-transform group-hover:-translate-x-1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-4">
            {filteredData.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`group relative h-12 flex items-center justify-center transition-all duration-500`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIndex === index ? "w-16 bg-gold" : "w-6 bg-gold/10 group-hover:bg-gold/30"
                  }`}
                />
                {activeIndex === index && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute -top-6 font-heading text-[0.6rem] text-gold tracking-widest uppercase"
                  >
                    0{index + 1}
                  </motion.span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => changeSlide(activeIndex + 1)}
            className="w-14 h-14 rounded-full border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:border-gold/40 transition-all duration-500 group relative overflow-hidden"
            aria-label="Next Event"
          >
            <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current fill-none relative z-10 transition-transform group-hover:translate-x-1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ card, index, activeIndex, totalCards, onClick, onSelect }: CardProps) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }

  const isCenter = offset === 0;
  const isVisible = Math.abs(offset) <= 2;

  const animate = {
    x: `${offset * 85}%`,
    scale: isCenter ? 1 : 0.75,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 - Math.abs(offset) * 0.4 : 0,
    rotateY: offset * 25,
    filter: isCenter ? "blur(0px)" : "blur(4px)",
  };

  return (
    <motion.div
      className="absolute w-[90%] md:w-[500px] h-full cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
        WebkitFontSmoothing: "antialiased",
      }}
      onClick={onClick}
      animate={animate}
      initial={false}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
    >
      {/* LUXURY ROMAN CARD */}
      <div className="relative w-full h-full bg-[#0c0c0e] border-[0.5px] border-gold/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group">
        {/* Subtle Background Art - Roman Patterns */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
          }}
        />

        {/* Inner Frame - Roman Border */}
        <div className="absolute inset-3 border-[0.5px] border-gold/10 pointer-events-none" />

        {/* Corner Motifs */}
        <WreathIcon className="absolute top-6 left-6 w-12 h-12 text-gold/20 group-hover:text-gold/40 transition-colors duration-1000" />
        <WreathIcon className="absolute bottom-6 right-6 w-12 h-12 text-gold/20 group-hover:text-gold/40 transition-colors duration-1000 rotate-180" />

        {/* Artifact Showcase */}
        <div className="h-[55%] w-full flex items-center justify-center p-12 relative overflow-hidden">
          {/* Soft Ambient Glow - No glass, just light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            animate={isCenter ? { y: [0, -15, 0] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full max-h-[250px] object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Numbering - Roman Style */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-[6rem] text-white/[0.04] pointer-events-none select-none italic">
            {index + 1}
          </div>
        </div>

        {/* Elegant Content Area */}
        <div className="h-[45%] p-8 flex flex-col items-center text-center relative bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e] to-transparent z-20">
          <div className="w-12 h-[1px] bg-gold/40 mb-6" />

          <span className="font-heading text-gold/90 tracking-[0.4em] text-[0.7rem] uppercase mb-4 block font-semibold">
            {card.type}
          </span>

          <h4 className="font-display text-parchment text-3xl md:text-4xl font-bold mb-4 tracking-wider uppercase drop-shadow-md">
            {card.title}
          </h4>

          <p className="font-body text-parchment/90 text-sm md:text-base leading-relaxed max-w-[90%] italic mb-6">
            {card.desc}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4 w-full px-4 mb-6">
            {card.players && (
              <div className="flex flex-col items-center p-2 border border-gold/10 bg-gold/[0.02]">
                <span className="font-heading text-[0.5rem] text-gold/40 tracking-widest uppercase mb-1">Players</span>
                <span className="font-display text-xs text-parchment tracking-wide">{card.players}</span>
              </div>
            )}
            {card.fee && (
              <div className="flex flex-col items-center p-2 border border-gold/10 bg-gold/[0.02]">
                <span className="font-heading text-[0.5rem] text-gold/40 tracking-widest uppercase mb-1">Entry</span>
                <span className="font-display text-xs text-parchment tracking-wide">{card.fee}</span>
              </div>
            )}
            {card.prize && (
              <div className="col-span-2 flex flex-col items-center p-2 border border-gold/10 bg-gold/[0.02]">
                <span className="font-heading text-[0.5rem] text-gold/40 tracking-widest uppercase mb-1">Prize Pool</span>
                <span className="font-display text-xs text-crimson tracking-widest font-bold">{card.prize}</span>
              </div>
            )}
          </div>

          {/* CTA for center card */}
          {isCenter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex flex-col items-center gap-2"
            >
              <div className="h-px w-8 bg-gold/30" />
              <span className="font-heading text-[0.6rem] text-gold tracking-[0.3em] uppercase animate-pulse">
                Details & Rules
              </span>
            </motion.div>
          )}

          {/* Luxury Signature Line */}
          <div className="absolute bottom-8 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none z-30" />
      </div>
    </motion.div>
  );
}

