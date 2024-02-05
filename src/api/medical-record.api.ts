import { fetcher } from "@/utilities";
import { CancelTokenSource } from "axios";

enum BeardTransplants {
  FUE,
  NFUT,
  MIX,
}

enum HairTransplants {
  FUE,
  BHT,
  NFUT,
  SUPER_FUE_PLUS,
  MIX,
  SUPER_MIX,
}

enum GENDER {
  MALE,
  FEMALE,
}

enum EyebrowTransplants {
  FUE,
  NFUT,
}

enum transplantRequest {
  VIP,
  SUPER_VIP,
  NORMAL,
}

enum SurgeryStatus {
  DONE,
  WAITING,
  CANCELED,
  REFUNDED,
}

export interface medicalRecordListSearchQueryParams {
  page?: number;
  itemCount?: number;
  query?: string;
}

export interface medicalRecordCreateRequest {
  gender?: GENDER;
  weight?: number;
  height?: number;
  hospitalization?: boolean;
  hospitalizationInfo?: string;
  aspirin?: boolean;
  aspirinDosage?: string;
  specialMedications?: string[];
  drugSensitivity?: string[];
  smoking?: boolean;
  alcoholicDrinks?: boolean;
  otherNarcotics?: string[];
  havePsoriasis?: boolean;
  haveLiechenPlanus?: boolean;
  haveAlopecia?: boolean;
  haveBloodPressure?: boolean;
  haveDiabetes?: boolean;
  specificDiseases?: string[];
  specialistDoctor?: string;
  latestBloodText?: Date;
  bloodTextResults?: string[];
  hairTransplantRestrictions?: string;
  surgeryAppointment: Date;
  surgeryStatus?: SurgeryStatus;
  beardTransplant?: BeardTransplants;
  hairTransplant?: HairTransplants;
  eyebrowTransplant?: EyebrowTransplants;
  densityPercentage?: string;
  transplantRequest?: transplantRequest;
  otherPayment?: number;
  downPayment?: number;
  totalFee?: number;
  refundedAmount?: number;
}

export interface medicalRecordListResponse {
  allMedicalRecordsCount: number;
  pages: number;
  currentPage: number;
  allMedicalRecords: (medicalRecordCreateRequest & {
    MedicalRecordEditRequests: Record<string, string>[];
    id: string;
    Contact: {
      id: string;
      firstName: string;
      lastName: string;
      assignedTo: {
        firstName: true;
        lastName: true;
        username: true;
      };
    };

    createdAt: Date;
    updatedAt: Date;
  })[];
}

export interface medicalRecordListSearchQueryParams {
  page?: number;
  itemCount?: number;
  query?: string;
}

export interface medicalRecordChangeRequestsListResponse {
  id: string;
  fieldName: string;
  currentValue?: Record<string, number | string | Date>;
  requestedValue?: Record<string, number | string | Date>;
  approvalStatus?: boolean;
  handledAt?: Date;
  updatedAt: Date;
  associatedMedicalRecord: {
    id: true;
    Contact: { firstName: string; lastName: string };
  };
  requestedBy: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const medicalRecordCreate = async (
  { ...data }: medicalRecordCreateRequest & { contactId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const contact = await fetcher.post<
      medicalRecordCreateRequest & { contactId: string }
    >(
      "/medical-record/create",
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

export const medicalRecordUpdate = async (
  {
    ...data
  }: medicalRecordCreateRequest & { userId: string; contactId: string },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const contact = await fetcher.put<
      medicalRecordCreateRequest & { contactId: string }
    >(
      "/medical-record/update",
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

export const medicalRecordGetAll = async (
  { page = 0, itemCount = 50, query }: medicalRecordListSearchQueryParams,
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.get<medicalRecordListResponse>(
      `/medical-record/list`,

      {
        cancelToken: CancelTokenSource?.token,
        params: { page, itemCount, query },
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};

export const medicalRecordGetItem = async (
  medicalRecordId: string,
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.get<
      medicalRecordListResponse["allMedicalRecords"][0]
    >(
      `/medical-record`,

      {
        cancelToken: CancelTokenSource?.token,
        params: { medicalRecordId },
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};

export const medicalRecordChangeRequestsList = async (
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.get<medicalRecordChangeRequestsListResponse[]>(
      `/medical-record/change-request/list`,

      {
        cancelToken: CancelTokenSource?.token,
      }
    );

    return data.data;
  } catch (error) {
    //@ts-expect-error asads
    throw new Error((error as AxiosError)?.response?.data.message);
  }
};
export const medicalRecordHandleChangeRequest = async (
  { requestId, status }: { requestId: string; status: boolean },
  CancelTokenSource?: CancelTokenSource
) => {
  try {
    const data = await fetcher.post<medicalRecordChangeRequestsListResponse[]>(
      `/medical-record/change-request`,
      { requestId, status },
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
