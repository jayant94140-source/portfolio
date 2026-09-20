import React from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { Terminal, Calendar, Tag, CheckCircle2 } from 'lucide-react';

export const BuildLog: React.FC = () => {
  const { config } = useOwnerConfig();

  if (!config.sections.buildLog) return null;

  // Filter ONLY approved build log entries
  const approvedLogs = config.buildLog.filter((log) => log.approved);

  return (
    <section id="build-log" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Terminal className="w-3.5 h-3.5" /> Manual Approval Log
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Public Build Log
        </h2>
        <p className="text-sm text-zinc-400">
          A living, hand-curated chronological record of project milestones and experiments.
        </p>
      </div>

      {/* Timeline entries */}
      <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
        {approvedLogs.map((log) => (
          <div key={log.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 sm:-left-8 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-purple-500 transition-colors">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5" /> {log.date}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Approved Entry
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {log.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {log.summary}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {log.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {approvedLogs.length === 0 && (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          No approved build log entries visible.
        </div>
      )}
    </section>
  );
};
