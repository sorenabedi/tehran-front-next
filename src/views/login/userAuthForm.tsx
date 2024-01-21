"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSvg } from "@/icons";
import { useState } from "react";
import { toast } from "sonner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.error("نام کاربری یا کلمه عبور صحیح نیست!", {
        cancel: { label: "بستن" },
      });
    }, 300);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className='inline-flex bg-background bg-opacity-75 items-center justify-evenly gap-2 py-1 px-1 rounded-lg border-0.5 border-solid border-foreground border-opacity-30'>
        <Button variant={"secondary"} size={"sm"} className='w-full' disabled>
          ورود با کلمه عبور
        </Button>
        <Button variant={"ghost"} size={"sm"} className='w-full' disabled>
          ورود با پیامک
        </Button>
      </div>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              نام کاربری
            </Label>
            <Input
              id='username'
              className='bg-background p-2'
              placeholder='نام کاربری'
              type='text'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              کلمه عبور
            </Label>
            <Input
              id='username'
              className='bg-background'
              placeholder='کلمه عبور'
              type='password'
              disabled={isLoading}
            />
          </div>
          <Button className='mt-4' disabled={isLoading}>
            {isLoading && <LoadingSvg className='mx-2 h-4 w-4' />}
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
}
