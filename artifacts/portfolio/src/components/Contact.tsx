import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate opening mail client
    window.location.href = `mailto:pranyl.basnyat@example.com?subject=Contact from ${formData.name}&body=${formData.message} (%0A%0AReply to: ${formData.email})`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-20 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-mono mb-6 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Opportunities
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's Build the Future.</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you have a groundbreaking startup idea, need a robust AI system, or want to collaborate on a challenging technical problem—I'm ready.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <a href="https://github.com/Pranyl1basnyat" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors border border-white/10">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-secondary/20 hover:text-secondary transition-colors border border-white/10">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-accent/20 hover:text-accent transition-colors border border-white/10">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              <Button 
                variant="outline" 
                className="w-fit mt-4 border-white/10 hover:bg-white/10"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download Resume
              </Button>
            </div>
          </div>

          <div className="bg-card border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
            <h3 className="text-2xl font-bold mb-6">Initialize Communication</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <Input 
                  required 
                  placeholder="John Doe" 
                  className="bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input 
                  required 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <Textarea 
                  required 
                  placeholder="Tell me about your project..." 
                  className="min-h-[150px] bg-background/50 border-white/10 focus-visible:ring-primary/50 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2 group"
                disabled={submitted}
              >
                {submitted ? (
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Transmitted</span>
                ) : (
                  <span className="flex items-center gap-2">Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
