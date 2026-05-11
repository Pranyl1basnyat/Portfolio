import { motion } from "framer-motion";
import { BrainCircuit, Database, Server, Smartphone, Quote } from "lucide-react";

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/Pranyl1basnyat";

const stats = [
  { label: "Projects Completed", value: "5+", icon: Database, color: "text-primary", bg: "bg-primary/10" },
  { label: "AI Systems Built", value: "3+", icon: BrainCircuit, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Years Experience", value: "2+", icon: Server, color: "text-accent", bg: "bg-accent/10" },
  { label: "Mobile Apps", value: "2+", icon: Smartphone, color: "text-primary", bg: "bg-primary/10" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="container mx-auto px-6 py-24 relative">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Section label */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-14">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-widest">About Me</span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Photo column */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
            <div className="relative group">
              {/* Glow bg */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-xl scale-110 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-300 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <img
                  src={GITHUB_AVATAR}
                  alt="Pranyl Basnyat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://ui-avatars.com/api/?name=Pranyl+Basnyat&background=0a0a1a&color=3b82f6&size=400&bold=true&font-size=0.4";
                  }}
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Name card */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white font-mono">Pranyl Basnyat</h3>
              <p className="text-sm text-primary font-mono mt-1">AI Engineer & Technopreneer</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-muted-foreground font-mono">Nepal — UTC+5:45</span>
              </div>
            </div>

            {/* Quote card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full bg-white/3 border border-white/8 rounded-xl p-4 relative overflow-hidden"
            >
              <Quote className="absolute top-3 right-3 w-5 h-5 text-primary/20" />
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "Build it like it already changed the world."
              </p>
              <p className="text-xs text-primary/60 mt-2 font-mono">— Pranyl</p>
            </motion.div>
          </motion.div>

          {/* Text + Stats column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Architecting the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Intelligent Future
              </span>
            </h2>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a <span className="text-white font-semibold">Technopreneer</span> and Full Stack Developer heavily focused on AI Engineering. My core expertise lies in architecting intelligent systems — specifically Retrieval-Augmented Generation (RAG) pipelines and interactive chatbots that don't just respond, they <span className="text-primary italic">think</span>.
              </p>
              <p>
                Beyond AI, I build robust, real-time applications using{" "}
                <span className="text-primary font-mono text-sm px-2 py-0.5 bg-primary/10 rounded-md">Flutter</span>{" "}
                <span className="text-secondary font-mono text-sm px-2 py-0.5 bg-secondary/10 rounded-md">WebRTC</span>{" "}
                <span className="text-accent font-mono text-sm px-2 py-0.5 bg-accent/10 rounded-md">Firebase</span>{" "}
                — bridging complex ML models with seamless user experiences.
              </p>
              <p>
                When I'm not coding, I'm analyzing emerging tech trends and conceptualizing the next startup idea. My goal is to build products that push the boundaries of what's possible.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
                  className="bg-white/4 border border-white/8 rounded-xl p-4 backdrop-blur-md hover:border-white/20 transition-all group cursor-default"
                >
                  <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div className={`text-2xl font-bold font-mono mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground/70 uppercase tracking-wider leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech strip */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Python", "TypeScript", "React", "Next.js", "Flutter", "LangChain", "Firebase", "Node.js", "PostgreSQL"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(59,130,246,0.12)" }}
                  className="px-3 py-1 text-xs font-mono text-muted-foreground border border-white/8 rounded-full bg-white/3 hover:border-primary/40 hover:text-white transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
