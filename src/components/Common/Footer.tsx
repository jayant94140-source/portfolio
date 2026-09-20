import React from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { usePermission } from '../../context/PermissionContext';
import { ShieldCheck, Sliders, ArrowUp, Star, Circle, Square, Hexagon, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config } = useOwnerConfig();
  const { setIsPrivacyModalOpen, setIsOwnerModalOpen, requestPermission } = usePermission();

  const enabledSocials = config.socialLinks.filter((s) => s.enabled);

  const handleSocialClick = (platform: string, url: string) => {
    requestPermission({
      title: `Open External Profile (${platform})`,
      actionType: 'external_link',
      description: `You requested to leave this portfolio to visit ${platform}.`,
      targetDestination: url,
      onAllow: () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900 text-zinc-400 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Giant Brand Name matching video 00:19 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Class 12 Student Builder • India
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
              {config.owner.name}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Privacy Architecture
            </button>

            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-purple-400 border border-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4" /> Owner Dashboard
            </button>
          </div>
        </div>

        {/* Abstract shape icons & Links grid matching video 00:19 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Abstract geometric shape badges matching video 00:19 */}
          <div className="md:col-span-6 flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-purple-400">
              <Star className="w-6 h-6 fill-purple-400/20" />
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-pink-400">
              <Circle className="w-6 h-6 fill-pink-400/20" />
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-cyan-400">
              <Square className="w-6 h-6 fill-cyan-400/20" />
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-amber-400">
              <Hexagon className="w-6 h-6 fill-amber-400/20" />
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Social links matching video 00:19 */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs font-mono">
            {enabledSocials.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSocialClick(s.platform, s.url)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {s.platform}
              </button>
            ))}

            <a
              href="#top"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="text-center md:text-left text-xs font-mono text-zinc-600 pt-4 border-t border-zinc-900">
          © {new Date().getFullYear()} {config.owner.name}. All rights reserved. Permission-First Builder Architecture.
        </div>

      </div>
    </footer>
  );
};
