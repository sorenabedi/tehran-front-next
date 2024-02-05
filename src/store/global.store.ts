import { create } from "zustand";

export type TRGlobalStore = {
  loadingLayoutStatus: boolean;
  LoadingLayoutShow: () => void;
  LoadingLayoutHide: () => void;
  LoadingLayoutToggle: () => void;

  sidebarStatus: boolean;
  SidebarShow: () => void;
  SidebarClose: () => void;
  SidebarToggle: () => void;
};

export const useGlobalStore = create<TRGlobalStore>((set) => ({
  loadingLayoutStatus: false,
  LoadingLayoutShow: () => set(() => ({ loadingLayoutStatus: true })),
  LoadingLayoutHide: () => set(() => ({ loadingLayoutStatus: false })),
  LoadingLayoutToggle: () =>
    set((state) => ({ loadingLayoutStatus: !state.loadingLayoutStatus })),
  sidebarStatus: false,
  SidebarShow: () => set(() => ({ sidebarStatus: true })),
  SidebarClose: () => set(() => ({ sidebarStatus: false })),
  SidebarToggle: () => set((state) => ({ sidebarStatus: !state.sidebarStatus })),
}));
