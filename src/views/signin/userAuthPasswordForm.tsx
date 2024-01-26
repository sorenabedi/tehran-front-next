"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSvg } from "@/icons";
import { FunctionComponent, useState } from "react";
import { toast } from "sonner";

interface UserAuthPasswordFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthPasswordForm: FunctionComponent<UserAuthPasswordFormProps> = ({
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
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1 px-0.5'>
            <Label className='sr-only' htmlFor='username'>
              نام کاربری
            </Label>
            <Input
              id='username'
              className='bg-background'
              placeholder='نام کاربری'
              type='text'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <div className='grid gap-1 px-0.5'>
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
          <div className='grid gap-1 px-0.5'>
            <Button className='mt-4' disabled={isLoading}>
              {isLoading && <LoadingSvg className='mx-2 h-4 w-4' />}
              ورود
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

UserAuthPasswordForm.displayName = "UserAuthPasswordForm";
export default UserAuthPasswordForm;
