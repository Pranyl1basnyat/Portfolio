import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "What are your top skills?",
  "Tell me about your AI projects",
  "Are you available for hire?",
  "What's your tech stack?",
];

const KB: Record<string, string> = {
  skills: "Pranyl's core skills are: AI/ML (LangChain, RAG, OpenAI, Python), Full Stack (React, Next.js, Node.js, TypeScript), Mobile (Flutter, Dart, WebRTC), and Cloud (Firebase, Vercel). He specializes in building intelligent systems that bridge AI and real-world applications.",
  ai: "Pranyl has built several AI systems: an intelligent RAG Chatbot System for document Q&A, a Voice AI Assistant using Whisper and ElevenLabs, and various LLM-powered tools using LangChain and vector databases. AI engineering is his primary focus.",
  projects: "Pranyl's key projects include: (1) AI RAG Chatbot System — LangChain + OpenAI, (2) Voice AI Assistant — Whisper + ElevenLabs + FastAPI, (3) Health Service Web App — Next.js + PostgreSQL, (4) Online Voting System — React + MongoDB, (5) Cross-Platform E-commerce — Flutter + Firebase, (6) Hardware-AI Node — Arduino + Python + MQTT.",
  hire: "Yes! Pranyl is actively open to opportunities. He's available for AI Engineering, Full Stack Development, Flutter Apps, Chatbot/RAG systems, and Automation projects. Reach out via the contact form below or on GitHub @Pranyl1basnyat.",
  contact: "You can reach Pranyl through the Contact section on this page, or directly on GitHub at github.com/Pranyl1basnyat. He's based in Nepal (UTC+5:45) and responds quickly to serious inquiries.",
  stack: "Pranyl's tech stack: Frontend — React, Next.js, TypeScript, Tailwind CSS, Framer Motion. Backend — Node.js, Express, Python, FastAPI. Mobile — Flutter, Dart. AI — LangChain, OpenAI, RAG, Vector DBs. Cloud — Firebase, Vercel. Databases — PostgreSQL, MongoDB.",
  flutter: "Pranyl is an experienced Flutter developer. He's built cross-platform mobile apps with complex UIs, Firebase integration, WebRTC for real-time communication, and state management using Riverpod/BLoC. His apps target both iOS and Android.",
  rag: "RAG (Retrieval-Augmented Generation) is Pranyl's specialty. He builds systems that ingest custom documents, embed them into vector databases, and use LLMs to provide accurate, context-aware answers. This dramatically reduces AI hallucination.",
  experience: "Pranyl has been coding for 2+ years, progressing from web fundamentals → Flutter/mobile → AI engineering. He's completed 5+ projects, built 3+ AI systems, and 2+ mobile apps. His roadmap includes launching an AI-powered startup.",
  webrtc: "Pranyl has implemented WebRTC in Flutter apps for real-time peer-to-peer communication features — video/audio calls and data streaming. This is part of his real-time application stack alongside Firebase.",
};

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (q.match(/skill|know|tech|language|framework/)) return KB.skills;
  if (q.match(/ai|ml|llm|gpt|chatbot|rag|retriev|langchain|openai|machine/)) {
    if (q.match(/rag|retriev/)) return KB.rag;
    return KB.ai;
  }
  if (q.match(/project|built|made|work|portfolio|system/)) return KB.projects;
  if (q.match(/hire|avail|work together|opportunit|job|freelance|collab/)) return KB.hire;
  if (q.match(/contact|reach|email|dm|message|talk/)) return KB.contact;
  if (q.match(/stack|tool|use|build with/)) return KB.stack;
  if (q.match(/flutter|mobile|app|dart|android|ios/)) return KB.flutter;
  if (q.match(/webrtc|realtime|real.time|call|video/)) return KB.webrtc;
  if (q.match(/experienc|year|long|journey|background|story/)) return KB.experience;
  if (q.match(/hello|hi|hey|who|what|pranyl|about/)) {
    return "Hey! I'm Pranyl's AI assistant. Pranyl is an AI Engineer, Full Stack Developer, and Technopreneer from Nepal. He builds intelligent systems powered by LLMs, RAG architectures, and modern web/mobile tech. Ask me anything about his skills, projects, or availability!";
  }
  return "Great question! I can answer questions about Pranyl's skills, projects, tech stack, experience, Flutter work, AI/RAG systems, and availability for work. What would you like to know?";
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      text: "Hey! I'm Pranyl's AI assistant. Ask me anything about his skills, projects, or how to work with him.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: reply, timestamp: new Date() },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        data-testid="button-ai-chat-toggle"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_45px_rgba(139,92,246,0.6)] transition-shadow duration-300"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary/40"
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-6 z-[998] w-[360px] max-h-[520px] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
            style={{ background: "rgba(10, 10, 26, 0.92)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-gradient-to-r from-primary/10 to-secondary/10 shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Pranyl's AI Assistant</div>
                <div className="text-xs text-green-400 font-mono">Online · Powered by RAG</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-white transition-colors p-1" data-testid="button-chat-close">
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-primary to-secondary" : "bg-white/10 border border-white/15"}`}>
                    {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white/5 border border-white/8 text-foreground rounded-tl-sm"
                      : "bg-primary/20 border border-primary/30 text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-2.5 items-end"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 bg-primary/60 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all"
                    data-testid={`quick-prompt-${q.slice(0, 10).toLowerCase().replace(/ /g, "-")}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="px-4 pb-4 pt-2 shrink-0 border-t border-white/5">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Ask me anything..."
                    data-testid="input-chat-message"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground/50 resize-none outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all leading-relaxed"
                    style={{ maxHeight: 100 }}
                  />
                </div>
                <motion.button
                  onClick={() => send(input)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={!input.trim() || typing}
                  data-testid="button-chat-send"
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
