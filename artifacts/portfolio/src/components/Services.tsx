import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Layers,
  Smartphone,
  MessageSquare,
  Settings,
  CloudLightning,
  PenTool,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    title: "AI Development",
    description: "Custom LLM integrations, RAG pipelines, and intelligent automation that makes your product think.",
    icon: Bot,
    color: "text-primary",
    borderColor: "border-primary/30",
    glow: "rgba(59,130,246,0.12)",
    glowHover: "rgba(59,130,246,0.25)",
    bgIcon: "bg-primary/10",
    tag: "Most Requested",
    tagColor: "text-primary bg-primary/10 border-primary/30",
    featured: true,
  },
  {
    title: "Full Stack Development",
    description: "End-to-end web applications — from pixel-perfect frontends to scalable, battle-tested backends.",
    icon: Layers,
    color: "text-accent",
    borderColor: "border-accent/30",
    glow: "rgba(6,182,212,0.12)",
    glowHover: "rgba(6,182,212,0.22)",
    bgIcon: "bg-accent/10",
    tag: null,
    featured: false,
  },
  {
    title: "Flutter Mobile Apps",
    description: "High-performance cross-platform apps for iOS and Android with beautiful adaptive UIs.",
    icon: Smartphone,
    color: "text-secondary",
    borderColor: "border-secondary/30",
    glow: "rgba(139,92,246,0.12)",
    glowHover: "rgba(139,92,246,0.22)",
    bgIcon: "bg-secondary/10",
    tag: null,
    featured: false,
  },
  {
    title: "RAG Chatbot Systems",
    description: "Context-aware conversational agents trained on your data — zero hallucination, maximum accuracy.",
    icon: MessageSquare,
    color: "text-primary",
    borderColor: "border-primary/30",
    glow: "rgba(59,130,246,0.12)",
    glowHover: "rgba(59,130,246,0.22)",
    bgIcon: "bg-primary/10",
    tag: "AI Specialty",
    tagColor: "text-secondary bg-secondary/10 border-secondary/30",
    featured: true,
  },
  {
    title: "Automation Systems",
    description: "Connect APIs, hardware, and AI logic to eliminate repetitive workflows at every layer.",
    icon: Settings,
    color: "text-accent",
    borderColor: "border-accent/30",
    glow: "rgba(6,182,212,0.12)",
    glowHover: "rgba(6,182,212,0.22)",
    bgIcon: "bg-accent/10",
    tag: null,
    featured: false,
  },
  {
    title: "UI/UX Design",
    description: "Premium interface design that balances aesthetics and usability — from wireframe to production.",
    icon: PenTool,
    color: "text-secondary",
    borderColor: "border-secondary/30",
    glow: "rgba(139,92,246,0.12)",
    glowHover: "rgba(139,92,246,0.22)",
    bgIcon: "bg-secondary/10",
    tag: null,
    featured: false,
  },
  {
    title: "Cloud Deployment",
    description: "Deploy, scale, and monitor applications securely on modern cloud infrastructure.",
    icon: CloudLightning,
    color: "text-primary",
    borderColor: "border-primary/30",
    glow: "rgba(59,130,246,0.12)",
    glowHover: "rgba(59,130,246,0.22)",
    bgIcon: "bg-primary/10",
    tag: null,
    featured: false,
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="container mx-auto px-6 py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
          <span className="text-xs font-mono text-accent uppercase tracking-widest">What I Build</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Core{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Competencies
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              High-impact technical services across the full software spectrum. From idea to deployed product.
            </p>
          </div>

          <motion.button
            onClick={scrollTo}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-work-together"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all whitespace-nowrap shrink-0"
          >
            Work Together <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {SERVICES.map((service, index) => {
            const isHovered = hovered === index;
            const isFeatured = service.featured;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
                data-testid={`service-card-${index}`}
                className={`group relative rounded-2xl p-6 border transition-all duration-300 cursor-default overflow-hidden ${
                  isFeatured ? "sm:col-span-2" : ""
                } ${service.borderColor} bg-card/40 backdrop-blur-md`}
                style={{
                  boxShadow: isHovered
                    ? `0 0 35px ${service.glowHover}, 0 15px 40px rgba(0,0,0,0.4)`
                    : `0 0 0 transparent`,
                  background: isHovered
                    ? `radial-gradient(circle at 30% 30%, ${service.glow}, rgba(10,10,26,0.9))`
                    : undefined,
                }}
              >
                {/* Tag */}
                {service.tag && (
                  <span className={`inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-full border mb-4 ${service.tagColor}`}>
                    {service.tag}
                  </span>
                )}

                {/* Icon */}
                <motion.div
                  animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 8 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex p-3 rounded-xl ${service.bgIcon} ${service.color} mb-5`}
                >
                  <service.icon className="w-6 h-6" />
                </motion.div>

                <h3 className={`text-lg font-bold text-white mb-2 group-hover:${service.color} transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                  className={`mt-4 flex items-center gap-1 text-xs font-mono ${service.color}`}
                >
                  Get a quote <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                  style={{ background: service.glowHover }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
