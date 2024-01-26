"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSvg } from "@/icons";
import { FunctionComponent, useState } from "react";
import { toast } from "sonner";

interface UserAuthOtpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthOtpForm: FunctionComponent<UserAuthOtpFormProps> = ({
  className,
  ...props
}) => {
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
    <div className={cn("grid gap-6 h-full", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1 px-0.5'>
            <Label className='sr-only' htmlFor='phoneNumber'>
              شماره تلفن همراه
            </Label>
            <Input
              id='phoneNumber'
              className='bg-background p-2'
              placeholder='شماره تلفن همراه'
              type='text'
              autoCapitalize='none'
              autoCorrect='off'
              autoComplete='phone'
              disabled={isLoading}
            />
          </div>
          <div className='grid gap-1 px-0.5'>
            <Button className='mt-4' disabled={true || isLoading}>
              ارسال پیامک
              {isLoading && <LoadingSvg className='mx-2 h-4 w-4' />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
UserAuthOtpForm.displayName = "UserAuthOtpForm";
export default UserAuthOtpForm;
