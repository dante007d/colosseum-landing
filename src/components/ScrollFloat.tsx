import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  scrollStart = "top 80%",
  scrollEnd = "bottom 20%",
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="char inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      charElements.forEach((char) => {
        const randomY = 100 + Math.random() * 50;
        gsap.fromTo(
          char,
          {
            willChange: "opacity, transform",
            opacity: 0,
            yPercent: randomY,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: "50% 0%",
          },
          {
            duration: animationDuration,
            ease: "power3.out",
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              scroller: scroller,
              start: scrollStart,
              end: scrollEnd,
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float overflow-hidden ${containerClassName}`}>
      <span
        className={`scroll-float-text inline-block text-center leading-[1.5] ${textClassName}`}
        style={{ fontSize: "clamp(2.5rem, 12vw, 12rem)" }}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;
