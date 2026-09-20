import React, { useState, useEffect } from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { ArrowRight, Sparkles, Terminal, Code2, Cpu, Box, Film, Wand2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { config } = useOwnerConfig();
  const owner = config.owner;

  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    if (!owner.rotatingCategories || owner.rotatingCategories.length === 0) return;
    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % owner.rotatingCategories.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [owner.rotatingCategories]);

  const marqueeLogos = [
    { name: 'TYPESCRIPT', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { name: 'PYTHON', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    { name: 'BLENDER 3D', icon: <Box className="w-4 h-4 text-amber-400" /> },
    { name: 'FFMPEG', icon: <Film className="w-4 h-4 text-red-400" /> },
    { name: 'AI AUTOMATION', icon: <Wand2 className="w-4 h-4 text-purple-400" /> },
    { name: 'REACT & VITE', icon: <Cpu className="w-4 h-4 text-blue-400" /> },
  ];

  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between bg-grid-pattern overflow-hidden">
      
      {/* Background glowing lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full my-auto py-12">
        
        {/* Giant Header matching video 00:01 */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-none">
            {owner.headline}
          </h1>
        </div>

        {/* Central 3D Avatar & Two Columns layout matching video 00:01 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Subtitle */}
          <div className="md:col-span-4 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Class 12 High School Builder
            </div>
            <p className="text-sm sm:text-base font-bold text-zinc-300 leading-snug tracking-wide uppercase">
              EXPLORING WEB DEV, AI TOOLS, CONTENT AUTOMATION & DIGITAL PRODUCTS ⚡
            </p>
            <div className="text-xs font-mono text-emerald-400 flex items-center justify-center md:justify-start gap-1.5 pt-1">
              <span>Building →</span>
              <span className="text-white font-semibold transition-all">
                {owner.rotatingCategories[categoryIndex]}
              </span>
            </div>
          </div>

          {/* Center Column: 3D Render Avatar Character */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              {/* Outer neon glow ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-70 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
              
              {/* Avatar frame */}
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-zinc-950 border-4 border-zinc-800 p-2 overflow-hidden shadow-2xl">
                <img
                  src="/assets/avatar.jpg"
                  alt="Jayant 3D Builder Avatar"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact CTA Pill Button matching video 00:01 */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105 transition-all flex items-center gap-3 border border-pink-400/30"
            >
              <span>CONTACT ME</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="text-center md:text-right">
              <span className="text-[11px] font-mono text-zinc-500 block">
                Open for ideas & collaborations
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Marquee Banner matching video 00:02 */}
      <div className="w-full border-y border-zinc-900 bg-zinc-950/80 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-around gap-6 text-xs font-mono text-zinc-400 uppercase tracking-widest overflow-x-auto whitespace-nowrap">
          {marqueeLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 shrink-0 hover:text-white transition-colors">
              {logo.icon}
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
