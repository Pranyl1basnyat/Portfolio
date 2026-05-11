import React from "react";
import { motion } from "framer-motion";
import { Code, Server, BrainCircuit, Rocket } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    year: "Phase 1: Foundations",
    title: "Learning Journey & Full Stack Web",
    description: "Started the journey by diving deep into modern web development. Mastered HTML, CSS, JavaScript, and eventually React, Node.js, and databases to build robust full-stack applications.",
    icon: Code,
    color: "text-blue-400",
  },
  {
    year: "Phase 2: Mobile Expansion",
    title: "Flutter Developer Journey",
    description: "Expanded into cross-platform mobile development using Flutter and Dart. Built complex UIs, integrated Firebase for real-time data, and implemented WebRTC for seamless communication features.",
    icon: Server,
    color: "text-cyan-400",
  },
  {
    year: "Phase 3: The AI Shift",
    title: "AI Engineering Progression",
    description: "Pivoted focus toward Artificial Intelligence. Explored LLMs, prompt engineering, and LangChain. Built intelligent RAG systems that process custom data and provide context-aware responses.",
    icon: BrainCircuit,
    color: "text-violet-400",
  },
  {
    year: "Phase 4: The Future",
    title: "Startup Vision & AI Products",
    description: "Looking ahead: combining AI engineering with full-stack capabilities to launch innovative products. The goal is to build a startup that leverages AI to solve complex, real-world problems.",
    icon: Rocket,
    color: "text-primary",
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Evolution & Roadmap</h2>
          <p className="text-muted-foreground">The journey from writing the first line of code to building intelligent AI systems.</p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-1/2 md:-translate-x-px">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative pl-8 md:pl-0 mb-12 flex flex-col md:flex-row md:items-center ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Connector Dot */}
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

              {/* Content Card */}
              <div className={`md:w-5/12 bg-card/50 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-white/20 transition-all ${
                index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
              }`}>
                <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`p-2 rounded-lg bg-white/5 ${event.color}`}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{event.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
