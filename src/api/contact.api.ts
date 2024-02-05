"use client";
import { fetcher } from "@/utilities";
import { CancelTokenSource } from "axios";

export interface contactListSearchQueryParams {
  page?: number;
  itemCount?: number;
  query?: string;
  followupStatus?: "inProgress" | "waiting";
  consultantId?: string;
}

export interface contactGetAllResponse {
  allContactsCount: number;
  pages: number;
  currentPage: number;
  contacts: {
    id: string;
    medicalRecords: Record<string, string>[];
    birthDate?: Date;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    followup?: { contactAnswerStatus: boolean }[];
    socialMedia?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    followups?: {
      contactAnswerStatus: boolean;
      followupStatus: string;
    }[];
    assignedTo?: { firstName: string; lastName: string };
  }[];
}

export const contactGetAll = async (
  {
    page = 0,
    itemCount = 50,
    query,
    followupStatus,
    consultantId,
  }: contactListSearchQueryParams,
  CancelTokenSource?: CancelTokenSource,
  full: boolean = false
) => {
  try {
    const data = await fetcher.get<contactGetAllResponse>(
      `/contact/list${full ? "/all" : ""}`,

      {
        cancelToken: CancelTokenSource?.token,
        params: {
          page,
          itemCount,
          query,
          followupStatus,
          consultantId,
        },
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};

export interface contactCreateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emergencyPhoneNumber?: string;
  landLineNumber?: string;
  nationalId?: string;
  birthDate?: Date;
  Address?: {
    state: string;
    city: string;
    street?: string;
    ally?: string;
    block?: string;
    unit?: string;
    postalCode?: string;
  };
  socialMedia?: Record<string, string>;
  occupation?: string;
  nextFollowupDate?: Date;
  education?: string;
  referredBy?: string;
  extraNotes?: string;
}

export interface contactFollowupCreateRequest {
  id?: string;
  contactId: string;
  followupStatus?: string;
  contactAnswerStatus: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface contactFollowupCreateResponse {
  id: string;
  contactId: string;
  followupStatus?: string;
  contactAnswerStatus: boolean;
  description: string;
  CreatedBy: {
    firstName: string;
    id: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const contactCreate = async (
  { ...data }: contactCreateRequest,
  CancelTokenSource?: CancelTokenSource,
  full: boolean = false
) => {
  try {
    const newContact = await fetcher.post<contactGetAllResponse>(
      `/contact/create`,
      { ...data },
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return newContact;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data?.message);
  }
};

export const contactUpdate = async (
  { ...data }: contactCreateRequest & { contactId: string },
  CancelTokenSource?: CancelTokenSource,
  full: boolean = false
) => {
  try {
    const contact = await fetcher.put<contactGetAllResponse>(
      "/contact/update" + (full ? "/all" : ""),
      { ...data },
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return contact;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};

export const contactFollowupCreate = async (
  { ...data }: contactFollowupCreateRequest & { contactId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const contact = await fetcher.post<contactFollowupCreateRequest>(
      "/contact-followup/create",
      { ...data },
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return contact;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};

export const getFollowupList = async (
  { selectedContactId }: { selectedContactId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const contact = await fetcher.get<contactFollowupCreateResponse[]>(
      "/contact-followup/list",
      {
        cancelToken: CancelTokenSource?.token,
        params: { contactId: selectedContactId },
      }
    );

    return contact;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const associateContactsToConsultant = async (
  { ...data }: { userId: string; contactCount: number },
  CancelTokenSource?: CancelTokenSource,
  full: boolean = false
) => {
  try {
    const contact = await fetcher.post<contactGetAllResponse>(
      "/contact/consultant-association",
      { ...data },
      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return contact;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const contactView = async (
  contactId: string,
  CancelTokenSource?: CancelTokenSource,
  full: boolean = false
) => {
  try {
    const contact = await fetcher.get<contactCreateRequest>(
      "/contact/",

      {
        cancelToken: CancelTokenSource?.token,
        params: { contactId },
      }
    );

    return contact.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const contactUnassignedCount = async (
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const contact = await fetcher.get<{ unassignedContacts: number }>(
      "/contact/list/unassigned-count",

      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return contact.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
