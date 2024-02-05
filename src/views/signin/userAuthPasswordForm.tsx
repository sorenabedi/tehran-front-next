"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSvg } from "@/icons";
import { FunctionComponent, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserStore } from "@/store";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "نام کاربری باید بیش از ۲ کاراکتر باشد.",
  }),
  password: z.string().min(2, {
    message: "کلمه عبور باید بیش از ۲ کاراکتر باشد.",
  }),
});
interface UserAuthPasswordFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthPasswordForm: FunctionComponent<UserAuthPasswordFormProps> = ({
  className,
  ...props
}) => {
  const loginFunction = useUserStore((state) => state.loginUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await loginFunction(values);
      toast.success("ورود با موفقیت انجام شد");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-1 px-0.5'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='sr-only'>نام کاربری</FormLabel>
                    <FormControl>
                      <Input
                        id='username'
                        className='bg-background'
                        placeholder='نام کاربری'
                        type='text'
                        autoCapitalize='none'
                        autoCorrect='off'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-1 px-0.5'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='sr-only'>کلمه عبور</FormLabel>
                    <FormControl>
                      <Input
                        id='password'
                        className='bg-background'
                        placeholder='کلمه عبور'
                        type='password'
                        autoCapitalize='none'
                        autoCorrect='off'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-1 px-0.5'>
              <Button className='mt-4' type='submit' disabled={isLoading}>
                {isLoading && <LoadingSvg className='mx-2 h-4 w-4' />}
                ورود
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

UserAuthPasswordForm.displayName = "UserAuthPasswordForm";
export default UserAuthPasswordForm;
