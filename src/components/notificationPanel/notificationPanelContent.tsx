import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { getRndInteger } from "@/utilities";

export interface TRNotificationPanelContent
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

const NotificationPanelContent: FunctionComponent<
  TRNotificationPanelContent
> = ({ className }) => {
  const data = new Array(20).fill(0);
  return (
    <>
      <span className='text-center text-sm px-3 mb-5'>
        {data.length.toLocaleString("fa")} اعلان جدید
      </span>
      <Separator />
      <div className='w-full flex flex-col gap-2.5 px-3 mb-5 max-h-72 overflow-auto'>
        {data.map((_, idx) => (
          <>
            <div className='flex flex-col justify-between items-center'>
              <div className='flex items-center'>
                <strong className='mie-5'>
                  {(idx + 1).toLocaleString("fa")}
                </strong>
                <p>
                  <Badge variant='secondary' className='m-1'>
                    مارلون براندو
                  </Badge>
                  <span className='m-1'>با سمت</span>
                  <Badge variant='secondary' className='m-1'>
                    مشاور
                  </Badge>
                  <span className='m-1'>درخواست تغییر فیلد</span>
                  <Badge variant='secondary'>تاریخ عمل</Badge>
                  <span className='m-1'>برای بیمار</span>
                  <Badge variant='secondary' className='m-1'>
                    آل پاچینو
                  </Badge>
                  <span className='m-1'>از</span>
                  <Badge variant='outline' className='m-1'>
                    {new Date(
                      getRndInteger(Date.now(), Date.now() * 1.01)
                    ).toLocaleString("fa-IR")}
                  </Badge>
                  <span className='m-1'>به</span>
                  <Badge variant='outline' className='m-1'>
                    {new Date(
                      getRndInteger(Date.now() * 1.011, Date.now() * 1.02)
                    ).toLocaleString("fa-IR")}
                  </Badge>
                  <span className='m-1'>را دارد.</span>
                </p>
              </div>
              <div className='flex w-full justify-end gap-2.5 mt-2.5 mb-5'>
                <Button
                  variant={"default"}
                  size='sm'
                  className='bg-malachite-700 text-malachite-50 hover:bg-malachite-600'
                >
                  تایید
                </Button>
                <Button variant={"destructive"} size='sm'>
                  رد درخواست
                </Button>
              </div>
              <Separator />
            </div>
          </>
        ))}
      </div>
    </>
  );
};
NotificationPanelContent.displayName = "NotificationPanelContent";
export default NotificationPanelContent;
