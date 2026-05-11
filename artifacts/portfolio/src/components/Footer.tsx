import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-lg relative z-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <div className="text-xl font-bold font-mono tracking-tighter mb-2">
              <span className="text-primary">&lt;</span>
              Pranyl
              <span className="text-primary">/&gt;</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with React & deployed on Replit.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("#about")} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollTo("#projects")} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollTo("#experience")} className="hover:text-white transition-colors">Experience</button>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/Pranyl1basnyat" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground/50">
          © 2026 Pranyl Basnyat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
