import React, { useState } from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import type { SkillItem } from '../../config/siteConfig';
import { Code2, Wand2, Box, TrendingUp, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const { config } = useOwnerConfig();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!config.sections.skills) return null;

  const enabledSkills = config.skills.filter((skill) => skill.enabled);

  const categories = ['All', 'Development', 'Creative', 'AI / Automation', 'Business'];

  const filteredSkills = activeCategory === 'All'
    ? enabledSkills
    : enabledSkills.filter((s) => s.category === activeCategory);

  const getLevelColor = (level: SkillItem['level']) => {
    switch (level) {
      case 'Building':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Practicing':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Learning':
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    Development: <Code2 className="w-4 h-4 text-purple-400" />,
    Creative: <Box className="w-4 h-4 text-cyan-400" />,
    'AI / Automation': <Wand2 className="w-4 h-4 text-emerald-400" />,
    Business: <TrendingUp className="w-4 h-4 text-amber-400" />,
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Layers className="w-3.5 h-3.5" /> Honest Skill Levels
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Tools & Capabilities Matrix
        </h2>
        <p className="text-sm text-zinc-400">
          Rated using realistic stages: <span className="text-cyan-300 font-mono">Learning</span> → <span className="text-purple-300 font-mono">Practicing</span> → <span className="text-emerald-300 font-mono">Building</span>. No fake expert labels.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-zinc-100 text-black font-semibold shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            }`}
          >
            {categoryIcons[cat]}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 group flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {skill.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 block mb-3">
                {skill.category}
              </span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border shrink-0 ${getLevelColor(
                skill.level
              )}`}
            >
              {skill.level}
            </span>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          No skills configured in this category yet.
        </div>
      )}
    </section>
  );
};
