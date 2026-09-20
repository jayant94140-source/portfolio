import React from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { FlaskConical, Sparkles, Compass, ArrowRight, Lightbulb } from 'lucide-react';

export const Experiments: React.FC = () => {
  const { config } = useOwnerConfig();

  if (!config.sections.experiments) return null;

  const activeExperiments = config.experiments.filter((exp) => exp.enabled);

  return (
    <section id="experiments" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <FlaskConical className="w-3.5 h-3.5" /> Lab & R&D
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          CURRENTLY EXPERIMENTING
        </h2>
        <p className="text-sm text-zinc-400">
          Active tech & content explorations currently being tested in my local lab.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeExperiments.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-amber-400 border border-zinc-700">
                  {exp.category}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {exp.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                {exp.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {exp.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">Key Takeaway</span>
              <p className="text-zinc-400 italic">
                "{exp.learnings}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {activeExperiments.length === 0 && (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          No active experiments currently visible.
        </div>
      )}
    </section>
  );
};
