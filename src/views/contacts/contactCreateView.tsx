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
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactCreate } from "@/api";
import { toast } from "@/components/ui/toast";

const formSchema = z.object({
  firstName: z
    .string()
    // .min(2, {
    //   message: "نام باید بیش از ۲ کاراکتر باشد.",
    // })
    .optional(),
  lastName: z
    .string()
    // .min(2, {
    //   message: "نام خانوادگی باید بیش از ۲ کاراکتر باشد.",
    // })
    .optional(),
  phoneNumber: z.coerce
    .string({ invalid_type_error: "تلفن تماس باید شامل اعداد باشد" })
    .regex(/^\d+$/, "شماره تلفن تماس باید متشکل از اعداد باشد!")
    .min(10, {
      message: "تلفن تماس باید بیش از ۹ کاراکتر باشد",
    })
    .max(12, {
      message: "تلفن تماس باید کمتر از ۱۲ کاراکتر باشد",
    }),
  emergencyPhoneNumber: z.coerce
    .string({ invalid_type_error: "تلفن تماس باید شامل اعداد باشد" })
    .regex(/^\d+$/, "شماره تلفن تماس باید متشکل از اعداد باشد!")
    .min(10, {
      message: "تلفن تماس باید بیش از ۱۰ کاراکتر باشد",
    })
    .max(12, {
      message: "تلفن تماس باید کمتر از ۱۲ کاراکتر باشد",
    })
    .optional(),
  extraNotes: z.string({}).optional(),
  referredBy: z.string({ required_error: "منبع انتخاب نشده است!" }),
  telegram: z
    .union(
      [
        z.string().length(0, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
        z.string().min(2, { message: "آیدی باید بیش از ۲ کاراکتر باشد." }),
      ],
      {}
    )
    .optional(),
  instagram: z
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
      emergencyPhoneNumber: undefined,
      extraNotes: "",
      telegram: "",
      instagram: "",
      referredBy: "",
    },
  });

  async function onSubmit({
    telegram,
    instagram,
    ...values
  }: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      await contactCreate({
        ...values,
        socialMedia: {
          telegram: telegram || undefined,
          instagram: instagram || undefined,
        } as Record<string, string>,
      });
      toast.success("مخاطب جدید ذخیره شد.");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full flex flex-col flex-1 h-full overflow-auto px-3 py-5'>
      <h2 className='px-5 mb-10 font-semibold text-center text-lg'>
        مخاطب جدید
      </h2>
      <h3 className='px-5 mb-10 font-normal text-base'>اطلاعات تماس:</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
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
            name='referredBy'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
                <FormLabel>منبع</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir='rtl'
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='منبع ...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='instagram'>اینستاگرام</SelectItem>
                    <SelectItem value='telegram'>تلگرام</SelectItem>
                    <SelectItem value='whatsApp'>واتساپ</SelectItem>
                    <SelectItem value='dayLedger'>دفتر روز</SelectItem>
                    <SelectItem value='inPerson'>حضوری</SelectItem>
                    <SelectItem value='friends'>دوستان</SelectItem>
                    <SelectItem value='textAdvertisement'>
                      تبلیغات پیامکی
                    </SelectItem>
                    <SelectItem value='other'>سایر</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormItem className='w-full md:w-5/12'>
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
            name='instagram'
            render={({ field }) => (
              <FormItem className='w-full md:w-5/12'>
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
          <FormField
            control={form.control}
            name='extraNotes'
            render={({ field }) => (
              <FormItem className='w-full mt-4'>
                <FormLabel>توضیحات بیشتر</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    placeholder='توضیحات بیشتر ...'
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
