import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import { Button } from "../ui/button";
import { NotificationSvg } from "@/icons";
import clsx from "clsx";

export interface TRNotificationPanelTrigger
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

const NotificationPanelTrigger: FunctionComponent<
  TRNotificationPanelTrigger
> = ({ className, ...rest }) => {
  return (
    <Button
      variant='ghost'
      className={clsx("py-4 px-2 relative", className)}
      {...rest}
    >
      <NotificationSvg className='text-xl' />
      <span className='absolute flex h-2 w-2 translate-x-1.5 -translate-y-2'>
        <span className='animate-ping !delay-700 absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-destructive'></span>
      </span>
    </Button>
  );
};
NotificationPanelTrigger.displayName = "NotificationPanelTrigger";
export default NotificationPanelTrigger;
