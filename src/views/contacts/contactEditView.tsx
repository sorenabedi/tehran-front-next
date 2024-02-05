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

import { contactUpdate, contactView } from "@/api";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { useUserStore } from "@/store";

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
  extraNotes: z.coerce.string({}).optional(),
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
  nextFollowupDate: z.coerce
    .date({
      required_error: "پیگیری بعدی باید انتخاب شود",
    })
    .optional(),
});

type Props = {
  selectedContactId?: string;
  onClose: () => void;
};

const ContactEditView = ({ selectedContactId, onClose }: Props) => {
  const userRole = useUserStore((state) => state.user?.role);
  useEffect(() => {
    (async () => {
      if (!selectedContactId) return;
      const contact = await contactView(selectedContactId);

      editForm.reset({
        extraNotes: contact.extraNotes,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        referredBy: contact.referredBy,
        instagram: contact.socialMedia?.instagram,
        telegram: contact.socialMedia?.telegram,
        nextFollowupDate:
          userRole !== "OPERATOR" ? contact?.nextFollowupDate : undefined,
        emergencyPhoneNumber:
          userRole !== "OPERATOR" ? contact?.emergencyPhoneNumber : undefined,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emergencyPhoneNumber: undefined,
      extraNotes: "",
      telegram: "",
      instagram: "",
    },
  });

  async function onSubmit({
    instagram,
    telegram,
    ...values
  }: z.infer<typeof formSchema>) {
    try {
      const data = await contactUpdate(
        {
          ...values,
          contactId: selectedContactId as string,
          socialMedia: {
            telegram: telegram || undefined,
            instagram: instagram || undefined,
          } as Record<string, string>,
        },
        undefined,
        userRole !== "OPERATOR" ? true : false
      );
      if (userRole === "OPERATOR") onClose();
      toast.success("ویرایش ذخیره شد.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full overflow-auto py-5'>
      <Form {...editForm}>
        <form
          onSubmit={editForm.handleSubmit(onSubmit, console.log)}
          className='spsace-y-8 flex flex-wrap justify-between flex-wrap gap-2.5 px-5'
        >
          <h3 className='w-full px-5 mb-10 font-normal text-base'>
            اطلاعات تماس:
          </h3>
          <FormField
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
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
          {userRole !== "OPERATOR" && (
            <FormField
              control={editForm.control}
              name='emergencyPhoneNumber'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>تلفن تماس اضطراری</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='تلفن تماس اضطراری ...'
                      inputMode='numeric'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
            name='extraNotes'
            render={({ field }) => (
              <FormItem className='w-full mt-4'>
                <FormLabel>توضیحات بیشتر</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    placeholder='توضیحات بیشتر ...'
                    autoComplete='off'
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end w-full mt-5'>
            <Button type='submit'>ثبت</Button>
          </div>
        </form>
      </Form>
    </PanelLayout>
  );
};

export default ContactEditView;
