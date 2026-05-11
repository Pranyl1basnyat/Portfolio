import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Code, FolderOpen, Mail, Github, Download, Zap, User, Briefcase, X } from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
  shortcut?: string;
}

const scrollTo = (id: string) => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS: Command[] = [
    { id: "hero", label: "Go to Top", description: "Jump to the beginning", icon: Zap, action: () => scrollTo("hero"), category: "Navigate", shortcut: "H" },
    { id: "about", label: "About Pranyl", description: "Learn about my background", icon: User, action: () => scrollTo("about"), category: "Navigate", shortcut: "A" },
    { id: "skills", label: "Technical Skills", description: "Explore my tech arsenal", icon: Code, action: () => scrollTo("skills"), category: "Navigate", shortcut: "S" },
    { id: "projects", label: "Projects", description: "View deployed systems", icon: FolderOpen, action: () => scrollTo("projects"), category: "Navigate", shortcut: "P" },
    { id: "experience", label: "Experience & Roadmap", description: "My engineering journey", icon: Hash, action: () => scrollTo("experience"), category: "Navigate", shortcut: "E" },
    { id: "services", label: "Services", description: "What I can build for you", icon: Briefcase, action: () => scrollTo("services"), category: "Navigate" },
    { id: "contact", label: "Contact Me", description: "Start a conversation", icon: Mail, action: () => scrollTo("contact"), category: "Navigate", shortcut: "C" },
    { id: "github", label: "Open GitHub", description: "@Pranyl1basnyat", icon: Github, action: () => window.open("https://github.com/Pranyl1basnyat", "_blank"), category: "Action" },
    { id: "resume", label: "Download Resume", description: "Get my latest CV", icon: Download, action: () => window.open("/resume.pdf", "_blank"), category: "Action" },
  ];

  const filtered = COMMANDS.filter(
    (cmd) =>
      !query ||
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc: Record<string, Command[]>, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); if (filtered[selected]) { filtered[selected].action(); setOpen(false); } }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, filtered, selected]);

  useEffect(() => { setSelected(0); }, [query]);

  let globalIdx = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: -12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-full max-w-xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.8)]"
            style={{ background: "rgba(10, 10, 26, 0.97)", backdropFilter: "blur(30px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                data-testid="input-command-search"
                className="flex-1 bg-transparent text-white placeholder:text-muted-foreground/50 outline-none text-sm"
              />
              <button onClick={() => setOpen(false)} className="text-muted-foreground/50 hover:text-white transition-colors" data-testid="button-command-close">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category}>
                  <div className="px-4 py-1.5">
                    <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">{category}</span>
                  </div>
                  {cmds.map((cmd) => {
                    const idx = globalIdx++;
                    const isSelected = idx === selected;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => { cmd.action(); setOpen(false); }}
                        onMouseEnter={() => setSelected(idx)}
                        data-testid={`command-${cmd.id}`}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                          isSelected ? "bg-primary/15 border-l-2 border-primary" : "border-l-2 border-transparent hover:bg-white/4"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"}`}>
                          <cmd.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${isSelected ? "text-white" : "text-muted-foreground"}`}>{cmd.label}</div>
                          <div className="text-xs text-muted-foreground/50 truncate">{cmd.description}</div>
                        </div>
                        {cmd.shortcut && (
                          <kbd className="text-xs font-mono text-muted-foreground/40 bg-white/5 border border-white/8 rounded px-1.5 py-0.5 shrink-0">
                            {cmd.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-10 text-center text-muted-foreground/50 text-sm font-mono">
                  No commands found for "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-xs text-muted-foreground/40 font-mono">
              <span><kbd className="bg-white/8 border border-white/10 rounded px-1">↑↓</kbd> Navigate</span>
              <span><kbd className="bg-white/8 border border-white/10 rounded px-1">↵</kbd> Select</span>
              <span><kbd className="bg-white/8 border border-white/10 rounded px-1">Esc</kbd> Close</span>
              <span className="ml-auto opacity-60">⌘K to open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
