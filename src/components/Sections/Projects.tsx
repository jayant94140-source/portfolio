import React, { useState } from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { usePermission } from '../../context/PermissionContext';
import type { ProjectItem } from '../../config/siteConfig';
import { GithubIcon } from '../Common/SocialIcons';
import { FolderGit2, ExternalLink, BookOpen, ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const { config } = useOwnerConfig();
  const { requestPermission } = usePermission();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!config.sections.projects) return null;

  // Filter ONLY approved projects for public display
  const approvedProjects = config.projects.filter((p) => p.approved);

  const categories = [
    'All',
    'Web Projects',
    'AI Tools',
    'YouTube Systems',
    'Automation',
    'Digital Products',
    'Experiments'
  ];

  const filteredProjects = activeCategory === 'All'
    ? approvedProjects
    : approvedProjects.filter((p) => p.category === activeCategory);

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Live':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Building':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Prototype':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Idea':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Archived':
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const handleExternalClick = (title: string, url: string, type: 'live' | 'github') => {
    requestPermission({
      title: `Open External ${type === 'live' ? 'Live Site' : 'GitHub Repository'}`,
      actionType: 'external_link',
      description: `You are requesting to leave this portfolio and open an external web page for project: "${title}".`,
      targetDestination: url,
      onAllow: () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  };

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Giant Stroke Header matching video 00:10 */}
      <div className="text-center mb-16 space-y-4">
        <h2 
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          style={{
            WebkitTextStroke: '1.5px #ffffff',
            color: 'transparent'
          }}
        >
          PROJECTS
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Handcrafted web applications, faceless content systems, and digital experiments built while learning.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-white text-black font-extrabold shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List matching video 00:10-00:13 */}
      <div className="space-y-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 space-y-6 group"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold font-mono text-zinc-500 group-hover:text-purple-400 transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                    {project.category} • {project.tagline}
                  </span>
                </div>
              </div>

              {/* Action buttons matching video 00:11 */}
              <div className="flex items-center gap-3 shrink-0">
                {project.githubUrl && (
                  <button
                    onClick={() => handleExternalClick(project.name, project.githubUrl!, 'github')}
                    className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold flex items-center gap-2 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-300" /> Repo
                  </button>
                )}

                {project.liveUrl && (
                  <button
                    onClick={() => handleExternalClick(project.name, project.liveUrl!, 'live')}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>LIVE PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl">
              {project.description}
            </p>

            {/* What I learned */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1">
                <BookOpen className="w-3.5 h-3.5" /> WHAT I LEARNED
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                {project.whatILearned}
              </p>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-zinc-500 font-mono text-sm">
          No approved projects in this category yet.
        </div>
      )}
    </section>
  );
};
