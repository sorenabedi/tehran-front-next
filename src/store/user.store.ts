import { toast } from "@/components/ui/toast";
import { fetcher } from "@/utilities/fetcher";
import { Axios, AxiosError, CancelTokenSource } from "axios";
import { create } from "zustand";
import { useGlobalStore } from "./global.store";

export type TRUserStore = {
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
    username: string;
    createdAt: Date;
    role: "ADMIN" | "SUPERVISOR" | "CONSULTANT" | "OPERATOR";
  };
  loginUser: (data: {
    CancelTokenSource?: CancelTokenSource;
    username: string;
    password: string;
  }) => Promise<void>;
  logoutUser: (CancelTokenSource?: CancelTokenSource) => Promise<void>;
  checkAuthentication: (
    CancelTokenSource?: CancelTokenSource
  ) => Promise<Record<string, any> | undefined>;
};

export const useUserStore = create<TRUserStore>((set) => ({
  user: undefined,
  loginUser: async ({ CancelTokenSource, username, password }) => {
    try {
      const data = await fetcher.post<TRUserStore["user"]>(
        "/auth/signin",
        { username, passwd: password },
        {
          cancelToken: CancelTokenSource?.token,
        }
      );
      set((state) => ({ ...state, user: data.data }));
    } catch (error) {
      //@ts-expect-error
      throw new Error((error as AxiosError)?.response?.data.message);
    }
  },
  logoutUser: async (CancelTokenSource) => {
    try {
      await fetcher.post(
        "/auth/signout",
        {},
        {
          cancelToken: CancelTokenSource?.token,
        }
      );
      set((state) => ({ ...state, user: undefined }));
    } catch (error) {
      //@ts-expect-error
      throw new Error((error as AxiosError)?.response?.data.message);
    }
  },
  checkAuthentication: async (CancelTokenSource?: CancelTokenSource) => {
    try {
      useGlobalStore.getState().LoadingLayoutShow();
      const data = await fetcher.get<TRUserStore["user"]>(
        "/auth",

        {
          cancelToken: CancelTokenSource?.token,
        }
      );
      set((state) => ({
        ...state,
        user: data.data,
      }));
      useGlobalStore.getState().LoadingLayoutHide();
      return data.data;
    } catch (error) {
      useGlobalStore.getState().LoadingLayoutHide();
      //@ts-expect-error
      throw new Error((error as AxiosError)?.response?.data.message);
    }
  },
}));
