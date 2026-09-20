import React from 'react';
import { usePermission } from '../../context/PermissionContext';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { ShieldCheck, Lock, EyeOff, ServerOff, Database, X } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen } = usePermission();
  const { config } = useOwnerConfig();

  if (!isPrivacyModalOpen) return null;

  const policy = config.privacyPolicy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto text-zinc-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <button
          onClick={() => setIsPrivacyModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Close privacy modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Privacy & Consent</span>
            <h2 id="privacy-modal-title" className="text-2xl font-bold text-white tracking-tight">
              Privacy Architecture
            </h2>
          </div>
        </div>

        <p className="text-xs font-mono text-zinc-400 mb-6">
          Last verified: {policy.lastUpdated}
        </p>

        <div className="space-y-4 mb-8 text-sm">
          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Zero Silent Data Collection</h4>
              <p className="text-zinc-300 leading-relaxed text-xs md:text-sm">
                {policy.dataCollection}
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start gap-3">
            <ServerOff className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">No Tracking Analytics</h4>
              <p className="text-zinc-300 leading-relaxed text-xs md:text-sm">
                {policy.analyticsStatus}
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Cookie & Local Storage Policy</h4>
              <p className="text-zinc-300 leading-relaxed text-xs md:text-sm">
                {policy.cookiesStatus}
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Contact Submission Transparency</h4>
              <p className="text-zinc-300 leading-relaxed text-xs md:text-sm">
                {policy.contactStorageStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-mono">
            Permission Guard active
          </span>
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            className="px-5 py-2 text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded-xl transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
