import { create } from 'zustand';

interface AppShellState {
  isMobileNavOpen: boolean;
  isSidebarCollapsed: boolean;
  isQuickConsultationOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setQuickConsultationOpen: (open: boolean) => void;
}

export const useAppShellStore = create<AppShellState>()((set) => ({
  isMobileNavOpen: false,
  isSidebarCollapsed: false,
  isQuickConsultationOpen: false,
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setQuickConsultationOpen: (open) => set({ isQuickConsultationOpen: open }),
}));
