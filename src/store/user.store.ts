import { toast } from "@/components/ui/toast";
import { fetcher } from "@/utilities/fetcher";
import { CancelTokenSource } from "axios";
import { create } from "zustand";
import { useGlobalStore } from "./global.store";

export type TRUserStore = {
  user?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
    role: "ADMIN" | "SUPERVISOR" | "CONSULTANT" | "OPERATOR";
  };
  loginUser: (data: TRUserStore) => void;
  logoutUser: (CancelTokenSource?: CancelTokenSource) => Promise<void>;
  checkAuthentication: (
    CancelTokenSource?: CancelTokenSource
  ) => Promise<Record<string, string>>;
};

export const useUserStore = create<TRUserStore>((set) => ({
  user: undefined,
  loginUser: (data: TRUserStore) => set(() => data),
  logoutUser: async () => {
    try {
      useGlobalStore.getState().LoadingLayoutShow();
      const data = () =>
        new Promise((res) => {
          setTimeout(() => res(true), 1000);
        });
      await data();
      // const response = await fetcher.get("/user/info", {
      //   cancelToken: CancelTokenSource.token,
      // });
      set((state) => ({ ...state, user: undefined }));
    } catch (error) {
      toast.error("error");
    }
    useGlobalStore.getState().LoadingLayoutHide();
  },
  checkAuthentication: async (CancelTokenSource?: CancelTokenSource) => {
    try {
      useGlobalStore.getState().LoadingLayoutShow();
      const data = () =>
        new Promise((res) => {
          setTimeout(() => res(true), 1000);
        });
      // await data();
      const response = await fetcher.get(
        // "hjsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/users/1",
        {
          cancelToken: CancelTokenSource?.token,
        }
      );
      set((state) => ({
        ...state,
        user: {
          firstName: "سورن",
          lastName: "عابدی",
          phoneNumber: "۰۹۹۰۱۸۸۹۵۵۷",
          role: "SUPERVISOR",
          avatar: "https://i.pravatar.cc/350?img=22",
        },
      }));
      useGlobalStore.getState().LoadingLayoutHide();
      return response.data;
    } catch (error) {
      useGlobalStore.getState().LoadingLayoutHide();
      throw new Error((error as Error)?.message);
    }
  },
}));
