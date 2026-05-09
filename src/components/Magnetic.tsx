import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const center = {
      x: left + width / 2,
      y: top + height / 2
    };

    const dist = {
      x: clientX - center.x,
      y: clientY - center.y
    };

    // Only apply if mouse is relatively close to the element
    const threshold = 150;
    if (Math.abs(dist.x) < threshold && Math.abs(dist.y) < threshold) {
      mouseX.set(dist.x * strength);
      mouseY.set(dist.y * strength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ x: mouseX, y: mouseY }}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
