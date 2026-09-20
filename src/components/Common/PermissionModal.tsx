import React from 'react';
import { usePermission } from '../../context/PermissionContext';
import { Shield, ShieldAlert, ExternalLink, Send, ArrowRight, X, Lock } from 'lucide-react';

export const PermissionModal: React.FC = () => {
  const { pendingAction, confirmAction, cancelAction } = usePermission();

  if (!pendingAction) return null;

  const getActionIcon = () => {
    switch (pendingAction.actionType) {
      case 'external_link':
        return <ExternalLink className="w-6 h-6 text-purple-400" />;
      case 'contact_form':
        return <Send className="w-6 h-6 text-emerald-400" />;
      case 'export_data':
        return <ArrowRight className="w-6 h-6 text-amber-400" />;
      default:
        return <Shield className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#141418] border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden text-zinc-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="permission-modal-title"
      >
        {/* Top accent glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500" />
        
        <button
          onClick={cancelAction}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Cancel permission"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
            {getActionIcon()}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1">
              <Lock className="w-3 h-3" /> EXPLICIT PERMISSION REQUIRED
            </div>
            <h3 id="permission-modal-title" className="text-xl font-bold text-white tracking-tight">
              {pendingAction.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
          {pendingAction.description}
        </p>

        {pendingAction.targetDestination && (
          <div className="mb-4 p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl font-mono text-xs text-zinc-300 break-all">
            <span className="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Target Destination</span>
            <span className="text-purple-300">{pendingAction.targetDestination}</span>
          </div>
        )}

        {pendingAction.payloadPreview && (
          <div className="mb-4">
            <span className="text-zinc-500 block mb-1 font-mono uppercase tracking-wider text-[10px]">Data Payload Preview</span>
            <pre className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto max-h-40">
              {JSON.stringify(pendingAction.payloadPreview, null, 2)}
            </pre>
          </div>
        )}

        <div className="p-3 mb-6 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3 text-xs text-zinc-400">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            The site will not proceed or connect to external services until you click <strong>Allow</strong> below.
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800">
          <button
            onClick={cancelAction}
            className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="px-5 py-2 text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            <span>Allow Action</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
