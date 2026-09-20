import React from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { ArrowUpRight, Zap } from 'lucide-react';

export const Capabilities: React.FC = () => {
  const { config } = useOwnerConfig();

  if (!config.sections.capabilities) return null;

  const enabledCapabilities = config.capabilities.filter((c) => c.enabled);

  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Light high-contrast card container matching video 00:07-00:09 */}
      <div className="bg-zinc-100 text-black rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Decorative subtle background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-8 border-b-2 border-zinc-300">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2">
              Capabilities & Focus Areas
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tighter uppercase">
              CAPABILITIES
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-600 max-w-xs">
            What I'm currently practicing, building, and exploring in my daily workflow.
          </div>
        </div>

        {/* Capabilities List */}
        <div className="space-y-12">
          {enabledCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="group py-6 border-b border-zinc-300/80 last:border-0 transition-all duration-300 hover:pl-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="lg:col-span-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-400 group-hover:text-purple-600 transition-colors">
                    {cap.number}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-10 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight group-hover:text-purple-700 transition-colors">
                      {cap.title}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>

                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-3xl font-normal">
                    {cap.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-200 text-zinc-800 group-hover:bg-purple-100 group-hover:text-purple-900 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
