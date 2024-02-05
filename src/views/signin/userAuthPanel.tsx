"use client";
import clsx from "clsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAuthOtpForm from "./userAuthOtpForm";
import UserAuthPasswordForm from "./userAuthPasswordForm";

interface UserAuthPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthPanel({ className, ...props }: UserAuthPanelProps) {
  return (
    <div
      className={clsx(
        "w-full p-4 bg-background bg-opacity-60 rounded-lg backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Tabs dir='rtl' defaultValue='password' className='box-border'>
        <TabsList className='w-full'>
          <TabsTrigger value='password' className='w-full'>
            ورود با کلمه عبور
          </TabsTrigger>
          <TabsTrigger value='otp' className='w-full' disabled>
            ورود با پیامک
          </TabsTrigger>
        </TabsList>
        <TabsContent value='otp' className=''>
          <UserAuthOtpForm className='w-full mt-5 mx-auto' />
        </TabsContent>
        <TabsContent value='password' className=''>
          <UserAuthPasswordForm className='w-full mx-auto' />
        </TabsContent>
      </Tabs>
    </div>
  );
}
