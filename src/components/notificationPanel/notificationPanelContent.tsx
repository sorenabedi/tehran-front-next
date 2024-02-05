"use client";
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { cancelToken, getRndInteger } from "@/utilities";
import {
  medicalRecordChangeRequestsList,
  medicalRecordChangeRequestsListResponse,
  medicalRecordHandleChangeRequest,
} from "@/api";
import { useGlobalStore } from "@/store";
import { Toaster, toast } from "../ui/toast";

export interface TRNotificationPanelContent
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

const NotificationPanelContent: FunctionComponent<
  TRNotificationPanelContent
> = ({ className }) => {
  const { LoadingLayoutShow, LoadingLayoutHide } = useGlobalStore();
  const [changesList, setChangesList] = useState<
    medicalRecordChangeRequestsListResponse[]
  >([]);

  useEffect(() => {
    const apiCancelToken = cancelToken.source();
    (async () => {
      LoadingLayoutShow();
      const data = await medicalRecordChangeRequestsList(apiCancelToken);
      setChangesList(data);
      LoadingLayoutHide();
    })();

    return () => {
      LoadingLayoutHide();
      apiCancelToken.cancel();
    };
  }, []);

  const submitRequestStatus = useCallback(
    async ({ status, requestId }: { requestId: string; status: boolean }) => {
      LoadingLayoutShow();
      await medicalRecordHandleChangeRequest({ status, requestId });
      const data = await medicalRecordChangeRequestsList();
      setChangesList(data);
      if (status) toast.success(`تغییرات درخواست شده اعمال شد.`);
      else toast.error(`تغییرات درخواست شده رد شد.`);
      LoadingLayoutHide();
    },
    [medicalRecordHandleChangeRequest]
  );

  return (
    <>
      <span className='text-center text-sm px-3 mb-5'>
        {changesList.length.toLocaleString("fa")} اعلان جدید
      </span>
      <Separator />
      <div className='w-full flex flex-col gap-2.5 px-3 mb-5 max-h-72 overflow-auto'>
        {changesList.map(
          (
            {
              id,
              requestedBy,
              associatedMedicalRecord,
              updatedAt,
              currentValue,
              approvalStatus,
              requestedValue,
              fieldName,
            },
            idx
          ) => (
            <>
              <div className='flex flex-col justify-between items-center'>
                <div className='flex items-center'>
                  <strong className='mie-5'>
                    {(idx + 1).toLocaleString("fa")}
                  </strong>
                  <p>
                    <span className='m-1'>در تاریخ</span>
                    <Badge variant='secondary' className='m-1'>
                      {new Date(updatedAt).toLocaleString("fa-IR")}
                    </Badge>
                    <Badge variant='secondary' className='m-1'>
                      <span className=''>{requestedBy.firstName}</span>
                      <span className=''>{requestedBy.lastName}</span>
                    </Badge>
                    <span className='m-1'>با سمت</span>
                    <Badge variant='secondary' className='m-1'>
                      <span>{requestedBy?.role || ""}</span>
                    </Badge>
                    <span className='m-1'>درخواست تغییر فیلد</span>
                    <Badge variant='secondary'>تاریخ عمل</Badge>
                    <span className='m-1'>برای بیمار</span>
                    <Badge variant='secondary' className='m-1'>
                      <span className=''>
                        {associatedMedicalRecord.Contact.firstName}
                      </span>
                      <span className=''>
                        {associatedMedicalRecord.Contact.lastName}
                      </span>
                    </Badge>
                    <span className='m-1'>از</span>
                    <Badge variant='outline' className='m-1'>
                      {new Date(
                        //@ts-expect-error what!
                        (currentValue || {})[fieldName] || undefined
                      ).toLocaleDateString("fa-IR")}
                    </Badge>
                    <span className='m-1'>به</span>
                    <Badge variant='outline' className='m-1'>
                      {new Date(
                        //@ts-expect-error what!
                        (requestedValue || {})[fieldName] || undefined
                      ).toLocaleDateString("fa-IR")}
                    </Badge>
                    <span className='m-1'>را دارد.</span>
                  </p>
                </div>
                <div className='flex w-full justify-end gap-2.5 mt-2.5 mb-5'>
                  <Button
                    variant={"default"}
                    size='sm'
                    className='bg-malachite-700 text-malachite-50 hover:bg-malachite-600'
                    onClick={() => {
                      submitRequestStatus({ status: true, requestId: id });
                    }}
                  >
                    تایید
                  </Button>
                  <Button
                    variant={"destructive"}
                    size='sm'
                    onClick={() => {
                      submitRequestStatus({ status: false, requestId: id });
                    }}
                  >
                    رد درخواست
                  </Button>
                </div>
                <Separator />
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};
NotificationPanelContent.displayName = "NotificationPanelContent";
export default NotificationPanelContent;
