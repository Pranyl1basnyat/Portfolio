import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, Zap, Globe, Cpu, Smartphone } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "Web", "Mobile", "Innovation"];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "AI/ML": Cpu,
  Web: Globe,
  Mobile: Smartphone,
  Innovation: Zap,
};

const PROJECTS = [
  {
    title: "AI RAG Chatbot System",
    description:
      "An intelligent Retrieval-Augmented Generation chatbot capable of ingesting vast amounts of document data and providing highly accurate, context-aware answers. Built to reduce hallucination and improve enterprise search.",
    category: "AI/ML",
    tech: ["Python", "LangChain", "OpenAI", "Vector DB", "React"],
    github: "https://github.com/Pranyl1basnyat",
    featured: true,
    gradient: "from-primary/20 via-primary/5 to-transparent",
    accentColor: "rgba(59,130,246,0.5)",
    accentText: "text-primary",
    accentBorder: "border-primary/30",
    accentBg: "bg-primary/10",
  },
  {
    title: "Health Service Web App",
    description:
      "A comprehensive full-stack health service platform enabling patients to book appointments, manage records, and connect with healthcare providers securely and seamlessly.",
    category: "Web",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Pranyl1basnyat",
    featured: false,
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accentColor: "rgba(6,182,212,0.5)",
    accentText: "text-accent",
    accentBorder: "border-accent/30",
    accentBg: "bg-accent/10",
  },
  {
    title: "Online Voting System",
    description:
      "A secure, robust digital voting platform designed to ensure election integrity with encrypted data storage, real-time vote counting, and administrative dashboards.",
    category: "Web",
    tech: ["React", "Express", "MongoDB", "JWT Auth"],
    github: "https://github.com/Pranyl1basnyat",
    featured: false,
    gradient: "from-secondary/20 via-secondary/5 to-transparent",
    accentColor: "rgba(139,92,246,0.5)",
    accentText: "text-secondary",
    accentBorder: "border-secondary/30",
    accentBg: "bg-secondary/10",
  },
  {
    title: "AI Assistant with Voice",
    description:
      "A personal AI assistant that integrates voice recognition and speech synthesis to perform daily tasks, control local environments, and fetch real-time information.",
    category: "AI/ML",
    tech: ["Python", "Whisper", "ElevenLabs", "FastAPI"],
    github: "https://github.com/Pranyl1basnyat",
    featured: true,
    gradient: "from-primary/20 via-primary/5 to-transparent",
    accentColor: "rgba(59,130,246,0.5)",
    accentText: "text-primary",
    accentBorder: "border-primary/30",
    accentBg: "bg-primary/10",
  },
  {
    title: "Cross-Platform E-commerce",
    description:
      "A high-performance Flutter mobile application for e-commerce, featuring real-time inventory updates, secure payment integration, and a beautiful adaptive UI.",
    category: "Mobile",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    github: "https://github.com/Pranyl1basnyat",
    featured: false,
    gradient: "from-secondary/20 via-secondary/5 to-transparent",
    accentColor: "rgba(139,92,246,0.5)",
    accentText: "text-secondary",
    accentBorder: "border-secondary/30",
    accentBg: "bg-secondary/10",
  },
  {
    title: "Hardware-meets-AI Node",
    description:
      "An innovative project bridging custom electronics with edge AI, allowing hardware sensors to trigger LLM-based analysis and fully automated responses.",
    category: "Innovation",
    tech: ["C++", "Arduino", "Python", "MQTT"],
    github: "https://github.com/Pranyl1basnyat",
    featured: false,
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accentColor: "rgba(6,182,212,0.5)",
    accentText: "text-accent",
    accentBorder: "border-accent/30",
    accentBg: "bg-accent/10",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="projects" className="container mx-auto px-6 py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Work</span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Deployed{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Systems
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              A selection of my best work in AI, full-stack web, and mobile development. Each project solves a real problem.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  data-testid={`filter-${cat.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/8"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -6 }}
                data-testid={`project-card-${index}`}
                className={`group relative bg-card/50 border border-white/8 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                  hoveredIndex === index ? `border-opacity-60` : ""
                }`}
                style={{
                  boxShadow:
                    hoveredIndex === index
                      ? `0 0 30px ${project.accentColor}, 0 20px 60px rgba(0,0,0,0.4)`
                      : "0 4px 20px rgba(0,0,0,0.2)",
                  borderColor:
                    hoveredIndex === index
                      ? project.accentColor.replace("0.5", "0.4")
                      : undefined,
                }}
              >
                {/* Top gradient bar */}
                <div
                  className={`h-0.5 w-full bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
                />

                <div className="p-6 flex flex-col flex-grow relative z-10">
                  {/* Header row */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className={`inline-flex items-center gap-1 text-xs font-mono ${project.accentText} ${project.accentBg} ${project.accentBorder} border px-2.5 py-1 rounded-full`}>
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                      )}
                      {!project.featured && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full border border-white/8">
                          {CATEGORY_ICONS[project.category] && (() => {
                            const Icon = CATEGORY_ICONS[project.category];
                            return <Icon className="w-3 h-3" />;
                          })()}
                          {project.category}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        className={`p-1.5 rounded-lg ${project.accentBg} ${project.accentText} transition-colors`}
                        data-testid={`link-github-project-${index}`}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        className="p-1.5 rounded-lg bg-white/5 text-muted-foreground hover:text-white transition-colors"
                        data-testid={`link-external-project-${index}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:${project.accentText} transition-colors duration-300`}>
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-xs font-mono px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-muted-foreground group-hover:border-white/15 group-hover:text-white/80 transition-all`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${project.accentColor.replace("0.5", "0.08")}, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com/Pranyl1basnyat"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-testid="link-view-all-github"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 text-sm font-mono backdrop-blur-md"
          >
            <Github className="w-4 h-4" />
            View all repositories on GitHub
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
