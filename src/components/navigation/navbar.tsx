import PanelLayout from "@/layouts/panel";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";
import UserActions from "../userActions";
import { Button } from "../ui/button";
import { NotificationSvg } from "@/icons";
import NotificationsPanel from "../notificationPanel";

interface TRNavbar
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {}

const Navbar: FunctionComponent<TRNavbar> = ({
  children,
  className,
  ...props
}) => {
  return (
    <PanelLayout
      className={clsx("px-3 py-4 flex justify-between items-center")}
      withBorder
      {...props}
    >
      <div>{children}</div>
      <div className='flex items-center'>
        <NotificationsPanel />
        <UserActions />
      </div>
    </PanelLayout>
  );
};
Navbar.displayName = "Navbar";
export default Navbar;
