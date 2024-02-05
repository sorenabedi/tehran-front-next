import { TRUserStore, useGlobalStore } from "@/store";
import { fetcher } from "@/utilities";
import { CancelTokenSource } from "axios";

export enum UserRole {
  ADMIN = "ADMIN",
  SUPERVISOR = "SUPERVISOR",
  CONSULTANT = "CONSULTANT",
  OPERATOR = "OPERATOR",
}

export interface UserListSearchQueryParams {
  page?: number;
  itemCount?: number;
  query?: string;
  role?: UserRole;
}
export interface UserListResponse {
  allUsersCount: number;
  users: {
    createdAt: Date;
    firstName: string;
    id: string;
    lastName?: string;
    phoneNumber?: string;
    role: UserRole;
    updatedAt: Date;
    username: string;
  }[];
  currentPage: number;
  pages: number;
}
export interface UserCreateRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  password?: string;
  username: string;
}
export const UserCreate = async (
  params: UserCreateRequest,
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.post<UserListResponse["users"][0]>(
      "/user/create",
      params,
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const UserUpdate = async (
  params: UserCreateRequest & { userId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.put<UserListResponse["users"][0]>(
      "/user/update",
      params,
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const UserGetItem = async (
  { userId }: { userId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.get<UserListResponse["users"][0]>("/user/item", {
      params: { userId },
      cancelToken: CancelTokenSource?.token,
    });

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const UserGetAll = async (
  { itemCount, page, query, role }: UserListSearchQueryParams,
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.get<UserListResponse>(
      "/user/list",

      {
        params: { itemCount, page, query, role },
        cancelToken: CancelTokenSource?.token,
      }
    );
    return data.data;
  } catch (error) {
    //@ts-expect-error asdasd
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
