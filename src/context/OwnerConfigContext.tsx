import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteConfig } from '../config/siteConfig';
import { initialSiteConfig } from '../config/siteConfig';

interface OwnerConfigContextType {
  config: SiteConfig;
  updateOwnerInfo: (fields: Partial<SiteConfig['owner']>) => void;
  toggleSection: (sectionKey: keyof SiteConfig['sections']) => void;
  toggleProjectApproved: (id: string) => void;
  toggleSkillEnabled: (id: string) => void;
  toggleExperimentEnabled: (id: string) => void;
  toggleBuildLogApproved: (id: string) => void;
  toggleSocialEnabled: (id: string) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
}

const STORAGE_KEY = 'portfolio_owner_config_v2';

const OwnerConfigContext = createContext<OwnerConfigContextType | undefined>(undefined);

export const OwnerConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('portfolio_owner_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.owner?.name === 'JAYAN') {
          parsed.owner.name = 'JAYANT';
          parsed.owner.headline = "HI, I'M JAYANT";
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load local config, using defaults:', e);
    }
    return initialSiteConfig;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save config locally:', e);
    }
  }, [config]);

  const updateOwnerInfo = (fields: Partial<SiteConfig['owner']>) => {
    setConfig(prev => ({
      ...prev,
      owner: {
        ...prev.owner,
        ...fields
      }
    }));
  };

  const toggleSection = (sectionKey: keyof SiteConfig['sections']) => {
    setConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey]
      }
    }));
  };

  const toggleProjectApproved = (id: string) => {
    setConfig(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, approved: !p.approved } : p)
    }));
  };

  const toggleSkillEnabled = (id: string) => {
    setConfig(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    }));
  };

  const toggleExperimentEnabled = (id: string) => {
    setConfig(prev => ({
      ...prev,
      experiments: prev.experiments.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e)
    }));
  };

  const toggleBuildLogApproved = (id: string) => {
    setConfig(prev => ({
      ...prev,
      buildLog: prev.buildLog.map(b => b.id === id ? { ...b, approved: !b.approved } : b)
    }));
  };

  const toggleSocialEnabled = (id: string) => {
    setConfig(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    }));
  };

  const resetToDefaults = () => {
    setConfig(initialSiteConfig);
  };

  const exportConfigJson = () => {
    return JSON.stringify(config, null, 2);
  };

  return (
    <OwnerConfigContext.Provider
      value={{
        config,
        updateOwnerInfo,
        toggleSection,
        toggleProjectApproved,
        toggleSkillEnabled,
        toggleExperimentEnabled,
        toggleBuildLogApproved,
        toggleSocialEnabled,
        resetToDefaults,
        exportConfigJson
      }}
    >
      {children}
    </OwnerConfigContext.Provider>
  );
};

export const useOwnerConfig = (): OwnerConfigContextType => {
  const context = useContext(OwnerConfigContext);
  if (!context) {
    throw new Error('useOwnerConfig must be used within an OwnerConfigProvider');
  }
  return context;
};
