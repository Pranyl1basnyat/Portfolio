import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  Database,
  Smartphone,
  Cloud,
  ChevronDown,
} from "lucide-react";

const TorusKnot3D = lazy(() => import("@/components/TorusKnot3D"));

const SKILL_CATEGORIES = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "text-primary",
    borderColor: "border-primary/40",
    glowColor: "rgba(59,130,246,0.15)",
    bgColor: "bg-primary/10",
    skills: [
      { name: "LangChain", level: 85 },
      { name: "RAG Systems", level: 90 },
      { name: "OpenAI API", level: 88 },
      { name: "Vector DBs", level: 80 },
      { name: "Python", level: 92 },
      { name: "Prompt Engineering", level: 87 },
    ],
  },
  {
    title: "Frontend Development",
    icon: Code2,
    color: "text-secondary",
    borderColor: "border-secondary/40",
    glowColor: "rgba(139,92,246,0.15)",
    bgColor: "bg-secondary/10",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 78 },
      { name: "Zustand", level: 75 },
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    color: "text-accent",
    borderColor: "border-accent/40",
    glowColor: "rgba(6,182,212,0.15)",
    bgColor: "bg-accent/10",
    skills: [
      { name: "Node.js", level: 84 },
      { name: "Express", level: 86 },
      { name: "REST APIs", level: 90 },
      { name: "Firebase", level: 88 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "text-primary",
    borderColor: "border-primary/40",
    glowColor: "rgba(59,130,246,0.15)",
    bgColor: "bg-primary/10",
    skills: [
      { name: "Flutter", level: 87 },
      { name: "Dart", level: 85 },
      { name: "WebRTC", level: 76 },
      { name: "Cross-Platform UI", level: 88 },
      { name: "State Management", level: 82 },
      { name: "Mobile Auth", level: 80 },
    ],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    color: "text-secondary",
    borderColor: "border-secondary/40",
    glowColor: "rgba(139,92,246,0.15)",
    bgColor: "bg-secondary/10",
    skills: [
      { name: "Firebase", level: 88 },
      { name: "Git / GitHub", level: 92 },
      { name: "Docker (Basics)", level: 65 },
      { name: "Vercel", level: 85 },
      { name: "Linux", level: 78 },
      { name: "CI/CD", level: 70 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-muted-foreground group-hover:text-white transition-colors font-mono">{name}</span>
        <span className={`text-xs font-mono ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full relative`}
          style={{
            background: color.includes("primary")
              ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
              : color.includes("secondary")
              ? "linear-gradient(90deg, #8b5cf6, #a78bfa)"
              : "linear-gradient(90deg, #06b6d4, #22d3ee)",
            boxShadow: color.includes("primary")
              ? "0 0 8px rgba(59,130,246,0.6)"
              : color.includes("secondary")
              ? "0 0 8px rgba(139,92,246,0.6)"
              : "0 0 8px rgba(6,182,212,0.6)",
          }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 shadow-lg" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCard({ category, index }: { category: typeof SKILL_CATEGORIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`bg-card/40 border ${category.borderColor} rounded-2xl p-6 backdrop-blur-md transition-all duration-300 relative overflow-hidden group cursor-pointer`}
      style={{ boxShadow: `0 0 0 transparent` }}
      onClick={() => setExpanded(!expanded)}
      data-testid={`skill-card-${index}`}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${category.glowColor}, transparent 70%)` }}
      />

      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className={`inline-flex p-3 rounded-xl ${category.bgColor} ${category.color}`}>
          <category.icon className="w-5 h-5" />
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground mt-1"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      <h3 className={`text-lg font-bold text-white mb-5 relative z-10 group-hover:${category.color} transition-colors`}>
        {category.title}
      </h3>

      {/* Collapsed: pill tags */}
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-1.5 relative z-10"
          >
            {category.skills.slice(0, 4).map((s) => (
              <span
                key={s.name}
                className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-xs text-muted-foreground"
              >
                {s.name}
              </span>
            ))}
            {category.skills.length > 4 && (
              <span className={`px-2.5 py-1 ${category.bgColor} ${category.color} rounded-full text-xs font-mono border ${category.borderColor}`}>
                +{category.skills.length - 4} more
              </span>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="bars"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 relative z-10 overflow-hidden"
          >
            {category.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={category.color}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="container mx-auto px-6 py-24 relative">
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-secondary to-transparent" />
          <span className="text-xs font-mono text-secondary uppercase tracking-widest">Capabilities</span>
          <div className="h-px flex-1 bg-gradient-to-r from-secondary/20 to-transparent" />
        </div>

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technical{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Click any card to expand and see proficiency levels. A comprehensive toolkit focused on building scalable AI systems and full-stack applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
