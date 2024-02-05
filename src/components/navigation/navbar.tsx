"use client";
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
import { HamburgerSvg, NotificationSvg } from "@/icons";
import NotificationsPanel from "../notificationPanel";
import { useGlobalStore } from "@/store";

interface TRNavbar
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {}

const Navbar: FunctionComponent<TRNavbar> = ({
  children,
  className,
  ...props
}) => {
  const { SidebarToggle } = useGlobalStore(({ SidebarToggle }) => ({
    SidebarToggle,
  }));
  return (
    <PanelLayout
      className={clsx("px-3 py-4 flex justify-between items-center")}
      withBorder
      {...props}
    >
      <Button
        className='flex-shrink-0 mx-1 md:hidden'
        variant={"ghost"}
        size={"icon"}
        onClick={SidebarToggle}
      >
        <HamburgerSvg />
      </Button>
      <div className=''>{children}</div>

      <div className='flex items-center'>
        <NotificationsPanel />
        <UserActions />
      </div>
    </PanelLayout>
  );
};
Navbar.displayName = "Navbar";
export default Navbar;
