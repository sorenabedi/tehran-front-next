"use client";
import PanelLayout from "@/layouts/panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserCreate, UserGetItem, UserRole, UserUpdate } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "نام باید بیش از ۲ کاراکتر باشد.",
  }),
  lastName: z.string().min(2, {
    message: "نام خانوادگی باید بیش از ۲ کاراکتر باشد.",
  }),
  phoneNumber: z.coerce
    .string({ invalid_type_error: "تلفن تماس باید شامل اعداد باشد" })
    .regex(/^\d+$/, "شماره تلفن باید متشکل از اعداد باشد!")
    .min(10, {
      message: "تلفن تماس باید بیش از ۱۰ کاراکتر باشد",
    })
    .max(12, {
      message: "تلفن تماس باید کمتر از ۱۲ کاراکتر باشد",
    }),
  password: z
    .string({ invalid_type_error: "کلمه عبور باید شامل اعداد باشد" })
    .min(8, {
      message: "کلمه عبور باید بیش از ۷ کاراکتر باشد",
    })
    .optional(),
  username: z
    .string({ invalid_type_error: "نام کاربری باید شامل اعداد باشد" })
    .min(5, {
      message: "نام کاربری باید بیش از ۴ کاراکتر باشد",
    }),
  role: z.nativeEnum(UserRole, {
    required_error: "انتخاب سمت کاربر الزامیست",
  }),
});

type Props = {};

const UserCreateView = (props: Props) => {
  const user = useUserStore((store) => store.user);
  const { userId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: undefined,
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    (async () => {
      if (!userId) return;
      try {
        const user = await UserGetItem({ userId: userId as string });
        form.reset(user);
      } catch (error) {}
    })();
  }, [userId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { ...data } = await UserUpdate({
        ...values,
        userId: userId as string,
      });
      form.reset(data);
      toast.success("ویرایش کاربر با موفقیت انجام شد.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full overflow-auto px-3 py-5 h-full flex-1'>
      <h2 className='px-5 mb-10 font-semibold text-center text-lg'>
        ویرایش کاربر
      </h2>
      <h3 className='px-5 mb-10 font-normal text-base'>اطلاعات عمومی:</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='spsace-y-8 flex justify-between flex-wrap gap-2.5 px-5'
        >
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input placeholder='نام ...' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>نام خانوادگی</FormLabel>
                <FormControl>
                  <Input
                    placeholder='نام خانوادگی ...'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>تلفن تماس</FormLabel>
                <FormControl>
                  <Input
                    placeholder='تلفن تماس ...'
                    inputMode='numeric'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>سمت</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  dir='rtl'
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='سمت ...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user?.role === "ADMIN" && (
                      <SelectItem value={UserRole.SUPERVISOR}>
                        مدیر داخلی
                      </SelectItem>
                    )}
                    <SelectItem value={UserRole.CONSULTANT}>مشاور</SelectItem>
                    <SelectItem value={UserRole.OPERATOR}>اپراتور</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className='w-8/12 my-10 mx-auto opacity-0' />
          <h3 className='mb-10 mie-auto font-normal text-base w-full'>
            اطلاعات ورود:
          </h3>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input
                    placeholder='نام کاربری ...'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>کلمه عبور</FormLabel>
                <FormControl>
                  <Input
                    placeholder='کلمه عبور ...'
                    autoComplete='off'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end w-full'>
            <Button type='submit'>ذخیره کاربر</Button>
          </div>
        </form>
      </Form>
    </PanelLayout>
  );
};

export default UserCreateView;
