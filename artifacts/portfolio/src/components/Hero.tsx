import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Download, Mail, Github, ExternalLink } from "lucide-react";
import NeuralSphere3D from "@/components/NeuralSphere3D";

const TITLES = ["AI Engineer", "Full Stack Developer", "Flutter Developer", "Technopreneer"];
const QUOTE = "I don't just write code — I architect possibilities.";
const GITHUB_AVATAR = "https://avatars.githubusercontent.com/Pranyl1basnyat";

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => { setDisplayText(currentTitle.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 80);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => { setDisplayText(currentTitle.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 45);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex(prev => (prev + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">

      {/* Soft ambient glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT — Text */}
          <div className="flex flex-col order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-primary backdrop-blur-sm w-fit"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              System Online / Ready to Build
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-white leading-[1.05]"
            >
              Pranyl{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Basnyat</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[48px] mb-4"
            >
              <p className="text-2xl md:text-3xl text-muted-foreground font-light">
                <span className="font-mono text-secondary font-medium">
                  {displayText}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} className="text-primary">|</motion.span>
                </span>
              </p>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="relative mb-8 pl-5 border-l-2 border-primary/50"
            >
              <p className="text-muted-foreground/80 italic text-base md:text-lg font-light leading-relaxed">"{QUOTE}"</p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground/70 max-w-xl mb-10 leading-relaxed"
            >
              Building AI-powered systems, intelligent applications, and future-ready experiences at the intersection of machine learning and full-stack architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => scrollTo("#projects")} data-testid="button-view-projects"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] transition-all duration-300 rounded-full gap-2">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" data-testid="button-download-resume"
                  className="border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full gap-2 hover:border-white/30 transition-all duration-300"
                  onClick={() => window.open("/resume.pdf", "_blank")}>
                  <Download className="w-4 h-4" /> Resume
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="ghost" data-testid="button-contact" onClick={() => scrollTo("#contact")}
                  className="text-muted-foreground hover:text-white rounded-full gap-2 transition-all duration-300">
                  <Mail className="w-4 h-4" /> Contact
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-5 mt-10"
            >
              <span className="text-xs text-muted-foreground/50 uppercase tracking-widest font-mono">Find me</span>
              <div className="h-px w-8 bg-white/10" />
              <a href="https://github.com/Pranyl1basnyat" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-github-hero">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://github.com/Pranyl1basnyat" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                @Pranyl1basnyat <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — 3D Neural Sphere + Profile */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 70 }}
          >
            {/* 3D Neural Sphere — main visual */}
            <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]">
              <Suspense fallback={null}>
                <NeuralSphere3D className="w-full h-full" />
              </Suspense>

              {/* Profile photo floating in center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-28 h-28 md:w-36 md:h-36">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                      opacity: 0.5,
                      filter: "blur(6px)",
                    }}
                  />
                  <img
                    src={GITHUB_AVATAR}
                    alt="Pranyl Basnyat"
                    className="w-full h-full rounded-full object-cover border-2 border-primary/40 relative z-10"
                    style={{ boxShadow: "0 0 40px rgba(59,130,246,0.4)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Pranyl+Basnyat&background=0a0a1a&color=3b82f6&size=200&bold=true";
                    }}
                  />
                </div>
              </div>

              {/* Floating availability badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-background/90 backdrop-blur-md border border-green-500/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-green-400">Open to Work</span>
              </motion.div>

              {/* Tech chips */}
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 -right-2 bg-background/90 border border-primary/30 rounded-xl px-3 py-1.5 text-xs font-mono text-primary backdrop-blur-md shadow-lg z-20"
              >
                AI / LLMs
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute top-1/3 -left-2 bg-background/90 border border-secondary/30 rounded-xl px-3 py-1.5 text-xs font-mono text-secondary backdrop-blur-md shadow-lg z-20"
              >
                Flutter
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0], x: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-8 left-6 bg-background/90 border border-accent/30 rounded-xl px-3 py-1.5 text-xs font-mono text-accent backdrop-blur-md shadow-lg z-20"
              >
                RAG
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-primary opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
