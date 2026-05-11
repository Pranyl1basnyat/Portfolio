import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive =
        el?.closest("a, button, [data-testid], input, textarea, select") !== null;
      setHovering(isInteractive);
    };

    const loop = () => {
      trailPos.current.x += (posRef.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (posRef.current.y - trailPos.current.y) * 0.12;
      setTrail({ x: trailPos.current.x, y: trailPos.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-none mix-blend-screen"
        style={{
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          background: "transparent",
          border: `1.5px solid ${hovering ? "rgba(139,92,246,0.7)" : "rgba(59,130,246,0.5)"}`,
          transform: `translate(${trail.x - (hovering ? 20 : 16)}px, ${trail.y - (hovering ? 20 : 16)}px)`,
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          boxShadow: hovering ? "0 0 12px rgba(139,92,246,0.4)" : "0 0 8px rgba(59,130,246,0.3)",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-screen"
        animate={{
          scale: clicking ? 0.6 : hovering ? 1.4 : 1,
          backgroundColor: hovering ? "rgba(139,92,246,0.9)" : "rgba(59,130,246,0.9)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          width: 8,
          height: 8,
          x: pos.x - 4,
          y: pos.y - 4,
          boxShadow: "0 0 10px rgba(59,130,246,0.8)",
        }}
      />
    </>
  );
}
