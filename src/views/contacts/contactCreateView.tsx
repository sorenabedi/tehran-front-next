"use client";
import PanelLayout from "@/layouts/panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "نام باید بیش از ۲ کاراکتر باشد.",
  }),
  lastName: z.string().min(2, {
    message: "نام خانوادگی باید بیش از ۲ کاراکتر باشد.",
  }),
  phoneNumber: z.coerce
    .string({ invalid_type_error: "تلفن تماس باید شامل اعداد باشد" })
    .min(8, {
      message: "تلفن تماس باید بیش از ۸ کاراکتر باشد",
    }),
  telegram: z.union(
    [
      z.string().length(0, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
      z.string().min(2, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
    ],
    {}
  ),
  instagram: z
    .union([
      z.string().length(0, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
      z.string().min(2, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
    ])
    .optional(),
  whatsApp: z
    .union([
      z.string().length(0, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
      z.string().min(2, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
    ])

    .optional(),
});

type Props = {};

const ContactCreateView = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      telegram: "",
      whatsApp: "",
      instagram: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <PanelLayout className='w-full overflow-auto px-3 py-5'>
      <h2 className='px-5 mb-10 font-semibold text-center text-lg'>
        مخاطب جدید
      </h2>
      <h3 className='px-5 mb-10 font-normal text-base'>اطلاعات تماس:</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='spsace-y-8 flex justify-between flex-wrap gap-2.5 px-5'
        >
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-5/12'>
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
              <FormItem className='w-5/12'>
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
              <FormItem className='w-5/12 mie-auto'>
                <FormLabel>تلفن تماس</FormLabel>
                <FormControl>
                  <Input
                    placeholder='تلفن تماس ...'
                    inputMode='numeric'
                    pattern='[0-9]{}'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className='w-8/12 my-10 mx-auto opacity-0' />
          <h3 className='mb-10 mie-auto font-normal text-base w-full'>
            اطلاعات شبکه های اجتماعی:
          </h3>
          <FormField
            control={form.control}
            name='telegram'
            render={({ field }) => (
              <FormItem className='w-5/12'>
                <FormLabel>آیدی تلگرام</FormLabel>
                <FormControl>
                  <Input
                    placeholder='آیدی تلگرام ...'
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
            name='whatsApp'
            render={({ field }) => (
              <FormItem className='w-5/12'>
                <FormLabel>آیدی واتساپ</FormLabel>
                <FormControl>
                  <Input
                    placeholder='آیدی واتساپ ...'
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
            name='instagram'
            render={({ field }) => (
              <FormItem className='w-5/12'>
                <FormLabel>آیدی اینستاگرام</FormLabel>
                <FormControl>
                  <Input
                    placeholder='آیدی اینستاگرام ...'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end w-full'>
            <Button type='submit'>ذخیره مخاطب</Button>
          </div>
        </form>
      </Form>
    </PanelLayout>
  );
};

export default ContactCreateView;
