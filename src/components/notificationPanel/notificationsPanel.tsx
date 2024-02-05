"use client";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBreakpoint } from "react-use";
import { screens } from "tailwindcss/defaultTheme";
import NotificationPanelTrigger from "./notificationPanelTrigger";
import NotificationPanelContent from "./notificationPanelContent";
import { useUserStore } from "@/store";

const useBreakpoint = createBreakpoint({
  "2xl": Number(screens["2xl"].replace("px", "")),
  lg: Number(screens.lg.replace("px", "")),
  md: Number(screens.md.replace("px", "")),
  sm: Number(screens.sm.replace("px", "")),
  xl: Number(screens.xl.replace("px", "")),
});

const NotificationsPanel: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const breakPoint = useBreakpoint() as keyof typeof screens;
  const user = useUserStore((state) => state.user);

  if (["sm", "md"].includes(breakPoint))
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <NotificationPanelTrigger
            hidden={!["ADMIN", "SUPERVISOR"].includes(user?.role || "")}
          />
        </DrawerTrigger>
        <DrawerContent dir='rtl'>
          <DrawerHeader className='sm:text-start'>
            <DrawerTitle>لیست اعلانات</DrawerTitle>
          </DrawerHeader>
          <NotificationPanelContent />
          <DrawerFooter className='justify-end flex-row'>
            <DrawerClose asChild>
              <Button variant='outline' className='inline-flex'>
                بستن اعلانات
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NotificationPanelTrigger />
      </DialogTrigger>
      <DialogContent dir='rtl' className='md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>لیست اعلانات</DialogTitle>
        </DialogHeader>
        <NotificationPanelContent />
      </DialogContent>
    </Dialog>
  );
};
NotificationsPanel.displayName = "NotificationsPanel";
export default NotificationsPanel;
