import React, { useState } from 'react';
import { usePermission } from '../../context/PermissionContext';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { Sliders, CheckCircle2, XCircle, Download, Copy, RefreshCw, X, Shield, Eye, FileJson } from 'lucide-react';

export const OwnerConfigModal: React.FC = () => {
  const { isOwnerModalOpen, setIsOwnerModalOpen } = usePermission();
  const { 
    config, 
    toggleSection, 
    toggleProjectApproved, 
    toggleSkillEnabled, 
    toggleExperimentEnabled,
    toggleBuildLogApproved,
    toggleSocialEnabled,
    resetToDefaults, 
    exportConfigJson 
  } = useOwnerConfig();

  const [activeTab, setActiveTab] = useState<'projects' | 'sections' | 'skills' | 'experiments' | 'buildLog' | 'json'>('projects');
  const [copied, setCopied] = useState(false);

  if (!isOwnerModalOpen) return null;

  const handleCopyJson = () => {
    const jsonStr = exportConfigJson();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden flex flex-col text-zinc-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-modal-title"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <Sliders className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="owner-modal-title" className="text-xl font-bold text-white">
                  Owner Dashboard & Controls
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Manual Approval System
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Control section visibility, project approvals, and skill listings in real-time.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOwnerModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-zinc-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Project Approvals ({config.projects.filter(p => p.approved).length}/{config.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sections' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Section Toggles
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'skills' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Skills ({config.skills.filter(s => s.enabled).length}/{config.skills.length})
          </button>
          <button
            onClick={() => setActiveTab('experiments')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'experiments' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Experiments
          </button>
          <button
            onClick={() => setActiveTab('buildLog')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'buildLog' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Build Log
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'json' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" /> Export Config JSON
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-4">
          {activeTab === 'projects' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 mb-2">
                Only projects with <code className="text-emerald-400">approved: true</code> are publicly displayed.
              </p>
              {config.projects.map((proj) => (
                <div 
                  key={proj.id}
                  className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white text-sm">{proj.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">
                        {proj.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        proj.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        proj.status === 'Building' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{proj.tagline}</p>
                  </div>
                  <button
                    onClick={() => toggleProjectApproved(proj.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                      proj.approved 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30' 
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {proj.approved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Public (Approved)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-zinc-500" />
                        <span>Hidden (Unapproved)</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.keys(config.sections) as Array<keyof typeof config.sections>).map((secKey) => (
                <div
                  key={secKey}
                  className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between"
                >
                  <span className="capitalize font-medium text-sm text-zinc-200">
                    {secKey.replace(/([A-Z])/g, ' $1')} Section
                  </span>
                  <button
                    onClick={() => toggleSection(secKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      config.sections[secKey]
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                    }`}
                  >
                    {config.sections[secKey] ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm font-medium text-white block">{skill.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{skill.category} • {skill.level}</span>
                  </div>
                  <button
                    onClick={() => toggleSkillEnabled(skill.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      skill.enabled 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                    }`}
                  >
                    {skill.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experiments' && (
            <div className="space-y-3">
              {config.experiments.map((exp) => (
                <div key={exp.id} className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-white">{exp.title}</h4>
                    <p className="text-xs text-zinc-400">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => toggleExperimentEnabled(exp.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                      exp.enabled ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {exp.enabled ? 'Active' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'buildLog' && (
            <div className="space-y-3">
              {config.buildLog.map((log) => (
                <div key={log.id} className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400">{log.date}</span>
                    <h4 className="font-semibold text-sm text-white">{log.title}</h4>
                    <p className="text-xs text-zinc-400">{log.summary}</p>
                  </div>
                  <button
                    onClick={() => toggleBuildLogApproved(log.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                      log.approved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {log.approved ? 'Approved' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'json' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">
                  Copy or save this JSON to update <code className="text-purple-400">src/config/siteConfig.ts</code> permanently.
                </span>
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied to Clipboard!' : 'Copy Config JSON'}
                </button>
              </div>
              <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-purple-300 overflow-x-auto max-h-96">
                {exportConfigJson()}
              </pre>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={resetToDefaults}
            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={() => setIsOwnerModalOpen(false)}
            className="px-5 py-2 text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
