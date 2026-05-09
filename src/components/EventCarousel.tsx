import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  desc: string;
}

interface CardProps {
  card: CardData;
  index: number;
  activeIndex: number;
  totalCards: number;
  onClick: () => void;
}

const cardData: CardData[] = [
  {
    id: 1,
    imageUrl: "/roman-art/helmet.png",
    title: "ROYAL RUMBLE",
    type: "Technical Battle Royale",
    desc: "A high-octane Battle Royale where teams answer technical questions to earn points and attack rival teams.",
  },
  {
    id: 2,
    imageUrl: "/roman-art/shield.png",
    title: "CLASH ROYALE",
    type: "Technical Team Battle",
    desc: "Teams solve technical questions to activate troop cards and deploy them against opponents in a strategic head-to-head battle.",
  },
  {
    id: 3,
    imageUrl: "/roman-art/ballista.png",
    title: "ROBOWARS",
    type: "Virtual Robot Combat",
    desc: "Construct virtual robots by selecting bodies and weapons, then battle in a 1v1 elimination bracket.",
  },
  {
    id: 4,
    imageUrl: "/roman-art/arch.png",
    title: "DOMINO EFFECT",
    type: "Innovation Challenge",
    desc: "A progressive challenge facing increasingly powerful 'Boss Encounters'. Solve problems under pressure to defeat the Final Boss.",
  },
  {
    id: 5,
    imageUrl: "/roman-art/mosaic.png",
    title: "FRAME THE CHAOS",
    type: "Photography Sprint",
    desc: "A 60-minute photography sprint across the campus to capture beauty, stillness, and meaning in the chaos.",
  },
  {
    id: 6,
    imageUrl: "/roman-art/lyre.png",
    title: "BEC'S GOT LATENT",
    type: "Open Talent Showcase",
    desc: "An open platform for any student to showcase unique talents—singing, comedy, magic, or instrumental performance.",
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

export default function EventCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 5000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex]);

  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
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
          <motion.div
            className="w-full h-full flex items-center justify-center relative"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {cardData.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                activeIndex={activeIndex}
                totalCards={cardData.length}
                onClick={() => changeSlide(index === activeIndex ? activeIndex + 1 : index)}
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
            {cardData.map((_, index) => (
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

function Card({ card, index, activeIndex, totalCards, onClick }: CardProps) {
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

          <p className="font-body text-parchment/90 text-sm md:text-base leading-relaxed max-w-[90%] italic">
            {card.desc}
          </p>

          {/* Luxury Signature Line */}
          <div className="absolute bottom-8 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none z-30" />
      </div>
    </motion.div>
  );
}
