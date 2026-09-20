import React, { createContext, useContext, useState } from 'react';

export interface PendingAction {
  id: string;
  title: string;
  actionType: 'external_link' | 'contact_form' | 'api_connection' | 'export_data' | 'copy_data';
  description: string;
  targetDestination?: string;
  payloadPreview?: any;
  onAllow: () => void;
  onCancel?: () => void;
}

interface PermissionContextType {
  pendingAction: PendingAction | null;
  requestPermission: (action: Omit<PendingAction, 'id'>) => void;
  confirmAction: () => void;
  cancelAction: () => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  const requestPermission = (action: Omit<PendingAction, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setPendingAction({ ...action, id });
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction.onAllow();
      setPendingAction(null);
    }
  };

  const cancelAction = () => {
    if (pendingAction?.onCancel) {
      pendingAction.onCancel();
    }
    setPendingAction(null);
  };

  return (
    <PermissionContext.Provider
      value={{
        pendingAction,
        requestPermission,
        confirmAction,
        cancelAction,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};
