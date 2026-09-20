import React, { useState, useEffect } from 'react';
import { usePermission } from '../../context/PermissionContext';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { ShieldCheck, Sliders, Menu, X, Terminal, Sparkles, Circle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setIsPrivacyModalOpen, setIsOwnerModalOpen } = usePermission();
  const { config } = useOwnerConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', enabled: config.sections.about },
    { name: 'Skills', href: '#skills', enabled: config.sections.skills },
    { name: 'Projects', href: '#projects', enabled: config.sections.projects },
    { name: 'Experiments', href: '#experiments', enabled: config.sections.experiments },
    { name: 'Build Log', href: '#build-log', enabled: config.sections.buildLog },
    { name: 'Contact', href: '#contact', enabled: config.sections.contact },
  ].filter(link => link.enabled);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Class 12 Tag */}
        <a 
          href="#top" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-mono text-sm font-bold group-hover:border-purple-500/50 transition-all shadow-inner">
            <Terminal className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              {config.owner.name}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Class 12
              </span>
            </span>
            <span className="text-[11px] text-zinc-400 font-mono block -mt-0.5">
              Student Builder
            </span>
          </div>
        </a>

        {/* Desktop Status Pill */}
        {config.owner.statusIndicator.active && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-500">Building →</span>
            <span className="text-zinc-200 truncate max-w-[200px]">{config.owner.statusIndicator.text}</span>
          </div>
        )}

        {/* Nav Links & Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-xs font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-zinc-800" />

          {/* Privacy & Owner Control buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="p-2 text-zinc-400 hover:text-emerald-400 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all text-xs flex items-center gap-1.5"
              title="Privacy Architecture & Controls"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline text-[11px] font-mono text-emerald-400/90">Privacy Guard</span>
            </button>

            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="p-2 text-zinc-400 hover:text-purple-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all text-xs flex items-center gap-1.5"
              title="Owner Settings & Approval Controls"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="hidden xl:inline text-[11px] font-mono text-purple-400/90">Owner Controls</span>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="p-2 text-emerald-400 bg-zinc-900 border border-zinc-800 rounded-xl"
            aria-label="Privacy settings"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOwnerModalOpen(true)}
            className="p-2 text-purple-400 bg-zinc-900 border border-zinc-800 rounded-xl"
            aria-label="Owner settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-zinc-800 px-6 py-5 mt-3 space-y-4 animate-fade-in">
          {config.owner.statusIndicator.active && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-zinc-500">Currently:</span>
              <span className="text-zinc-200 truncate">{config.owner.statusIndicator.text}</span>
            </div>
          )}

          <nav className="flex flex-col space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
