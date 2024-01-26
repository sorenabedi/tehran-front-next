"use client";
import PanelLayout from "@/layouts/panel";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
  useMemo,
} from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useTheme } from "next-themes";
import LoadingLogo from "../loadingLogo";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonSvg, SunSvg, LaptopSvg } from "@/icons";
import { useUserStore } from "@/store";

interface TRSidebar
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {}

const Sidebar: FunctionComponent<TRSidebar> = ({
  children,
  className,
  ...props
}) => {
  const userRole = useUserStore(({ user }) => user?.role);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const activePath = useMemo(() => {
    if (pathname === "/panel") return "dashboard";
    if (pathname.startsWith("/panel/contacts")) return "contacts";
    if (pathname.startsWith("/panel/patients")) return "patients";
    if (pathname.startsWith("/panel/users")) return "users";
    if (pathname.startsWith("/panel/reports")) return "reports";
  }, [pathname]);

  return (
    <PanelLayout
      className={clsx(
        "sticky top-0 px-3 py-4 flex-1 flex flex-col justify-between min-w-52",
        className
      )}
      withBorder
      {...props}
    >
      <div className='flex flex-col justify-center items-start gap-2.5'>
        <LoadingLogo className='w-2/3 inline-flex mb-10' />
      </div>

      {userRole && (
        <div className='flex flex-col justify-center items-start gap-2'>
          <Link href='/panel' className='w-full'>
            <Button
              className={clsx(
                "w-full justify-start relative transition-all pis-7 text-foreground",
                activePath === "dashboard"
                  ? "hover:bg-transparent"
                  : "hover:pis-10 text-opacity-50"
              )}
              variant='ghost'
            >
              <span
                className={clsx(
                  "absolute inline-start-3 w-0.5 h-3/5 rounded-sm transition-all",
                  activePath !== "dashboard" && "group-hover:inline-start-7",
                  activePath === "dashboard"
                    ? "bg-primary"
                    : "bg-foreground bg-opacity-10 group-hover:bg-opacity-15"
                )}
              />
              داشبورد
            </Button>
          </Link>
          <Link href='/panel/contacts' className='w-full'>
            <Button
              className={clsx(
                "w-full justify-start relative transition-all pis-7 text-foreground",
                activePath === "contacts"
                  ? "hover:bg-transparent"
                  : "hover:pis-10 text-opacity-50"
              )}
              variant='ghost'
            >
              <span
                className={clsx(
                  "absolute inline-start-3 w-0.5 h-3/5 rounded-sm transition-all",
                  activePath !== "contacts" && "group-hover:inline-start-7",
                  activePath === "contacts"
                    ? "bg-primary"
                    : "bg-foreground bg-opacity-10 group-hover:bg-opacity-15"
                )}
              />
              مخاطبین
            </Button>
          </Link>

          {["ADMIN", "SUPERVISOR", "CONSULTANT"].includes(userRole) && (
            <Link href='/panel/patients' className='w-full'>
              <Button
                className={clsx(
                  "w-full justify-start relative transition-all pis-7 text-foreground",
                  activePath === "patients"
                    ? "hover:bg-transparent"
                    : "hover:pis-10 text-opacity-50"
                )}
                variant='ghost'
              >
                <span
                  className={clsx(
                    "absolute inline-start-3 w-0.5 h-3/5 rounded-sm transition-all",
                    activePath !== "patients" && "group-hover:inline-start-7",
                    activePath === "patients"
                      ? "bg-primary"
                      : "bg-foreground bg-opacity-10 group-hover:bg-opacity-15"
                  )}
                />
                بیماران
              </Button>
            </Link>
          )}
          {["ADMIN", "SUPERVISOR"].includes(userRole) && (
            <Link href='/panel/users' className='w-full'>
              <Button
                className={clsx(
                  "w-full justify-start relative transition-all pis-7 text-foreground",
                  activePath === "users"
                    ? "hover:bg-transparent"
                    : "hover:pis-10 text-opacity-50"
                )}
                variant='ghost'
              >
                <span
                  className={clsx(
                    "absolute inline-start-3 w-0.5 h-3/5 rounded-sm transition-all",
                    activePath !== "users" && "group-hover:inline-start-7",
                    activePath === "users"
                      ? "bg-primary"
                      : "bg-foreground bg-opacity-10 group-hover:bg-opacity-15"
                  )}
                />
                کاربران
              </Button>
            </Link>
          )}
          {["ADMIN", "SUPERVISOR"].includes(userRole) && (
            <Link href='/panel/reports' className='w-full'>
              <Button
                className={clsx(
                  "w-full justify-start relative transition-all pis-7 text-foreground",
                  activePath === "reports"
                    ? "hover:bg-transparent"
                    : "hover:pis-10 text-opacity-50"
                )}
                variant='ghost'
              >
                <span
                  className={clsx(
                    "absolute inline-start-3 w-0.5 h-3/5 rounded-sm transition-all",
                    activePath !== "reports" && "group-hover:inline-start-7",
                    activePath === "reports"
                      ? "bg-primary"
                      : "bg-foreground bg-opacity-10 group-hover:bg-opacity-15"
                  )}
                />
                گزارش
              </Button>
            </Link>
          )}
        </div>
      )}
      <div className='flex flex-col justify-center items-start gap-2.5'>
        <Separator className='mx-auto my-2 w-1/12' />
        <div className='w-11/12 mx-auto justify-start px-1 text-center'>
          <Badge variant='secondary'>
            {userRole === "ADMIN" && "سطح دسترسی ادمین"}
            {userRole === "SUPERVISOR" && "سطح دسترسی مدیر داخلی"}
            {userRole === "CONSULTANT" && "سطح دسترسی مشاور"}
            {userRole === "OPERATOR" && "سطح دسترسی اپراتور"}
          </Badge>
        </div>
        <Tabs dir='rtl' value={theme} className='box-border w-full'>
          <TabsList className='w-full'>
            <TabsTrigger
              value='dark'
              className='w-full text-xs py-1.5'
              onClick={() => setTheme("dark")}
            >
              <MoonSvg />
            </TabsTrigger>
            <TabsTrigger
              value='system'
              className='w-full text-xs py-1.5'
              onClick={() => setTheme("system")}
            >
              <LaptopSvg />
            </TabsTrigger>
            <TabsTrigger
              value='light'
              className='w-full text-xs py-1.5'
              onClick={() => setTheme("light")}
            >
              <SunSvg />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </PanelLayout>
  );
};
Sidebar.displayName = "Sidebar";
export default Sidebar;
