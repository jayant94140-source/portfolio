import React from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { config } = useOwnerConfig();
  const owner = config.owner;

  if (!config.sections.about) return null;

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900 overflow-hidden">
      
      {/* Floating 3D Star Element on Left matching video 00:05 */}
      <div className="absolute top-12 -left-6 sm:left-4 w-24 h-24 sm:w-32 sm:h-32 opacity-80 pointer-events-none animate-float">
        <img
          src="/assets/star.jpg"
          alt="3D Metallic Star"
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        />
      </div>

      {/* Floating 3D Gem Element on Right matching video 00:05 */}
      <div className="absolute bottom-12 -right-6 sm:right-4 w-24 h-24 sm:w-32 sm:h-32 opacity-80 pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
        <img
          src="/assets/gem.jpg"
          alt="3D Purple Gem"
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        
        {/* Giant Outlined Typography Header matching video 00:04 */}
        <h2 
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          style={{
            WebkitTextStroke: '1.5px #ffffff',
            color: 'transparent'
          }}
        >
          ABOUT ME
        </h2>

        {/* Bio Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          {owner.bioParagraphs.map((para, i) => (
            <p key={i}>
              {para}
            </p>
          ))}
        </div>

        {/* Action Button matching video 00:06 */}
        <div className="pt-4 flex justify-center">
          <a
            href="#contact"
            className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:scale-105 rounded-full shadow-lg transition-all flex items-center gap-2"
          >
            <span>CONTACT ME</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Student Builder Timeline */}
        <div className="pt-12 text-left">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-base font-bold text-white mb-6 uppercase font-mono tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Student Execution Timeline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {owner.timeline.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
                    {item.stage}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
