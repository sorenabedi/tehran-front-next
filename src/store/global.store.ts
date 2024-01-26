import { create } from "zustand";

export type TRGlobalStore = {
  loadingLayoutStatus: boolean;
  LoadingLayoutShow: () => void;
  LoadingLayoutHide: () => void;
  LoadingLayoutToggle: () => void;
};

export const useGlobalStore = create<TRGlobalStore>((set) => ({
  loadingLayoutStatus: false,
  LoadingLayoutShow: () => set(() => ({ loadingLayoutStatus: true })),
  LoadingLayoutHide: () => set(() => ({ loadingLayoutStatus: false })),
  LoadingLayoutToggle: () =>
    set((state) => ({ loadingLayoutStatus: !state.loadingLayoutStatus })),
}));
