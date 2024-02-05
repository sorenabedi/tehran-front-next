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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { contactFollowupCreate, contactUpdate, contactView } from "@/api";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import ContactFollowupListView from "./contactFollowupListView";
import { SelectGroup } from "@radix-ui/react-select";
import { useUserStore } from "@/store";

const formSchema = z.object({
  contactAnswerStatus: z.coerce.boolean({
    invalid_type_error: "وضعیت تماس باید مقدار دودویی باشد",
  }),
  description: z.string({}).optional(),
  followupStatus: z.string(),
  nextFollowupDate: z
    .date({ invalid_type_error: "پیگیری بعدی باید تاریخ باشد" })
    .optional(),
});

type Props = {
  selectedContactId?: string;
  onClose: () => void;
};

const ContactFollowupView = ({ selectedContactId, onClose }: Props) => {
  const user = useUserStore((state) => state.user);
  const followupForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactAnswerStatus: false,
      followupStatus: "",
      description: "",
    },
  });

  async function onSubmit({
    contactAnswerStatus,
    followupStatus,
    ...values
  }: z.infer<typeof formSchema>) {
    try {
      const data = await contactFollowupCreate({
        contactAnswerStatus,
        followupStatus: contactAnswerStatus ? followupStatus : undefined,
        contactId: selectedContactId as string,
        ...values,
      });
      toast.success("پیگیری جدید ذخیره شد.");
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full overflow-auto pb-5'>
      {!["ADMIN"].includes(user?.role || "") && (
        <>
          <h3 className='px-5 mb-10 font-normal text-base'>پیگیری تماس:</h3>
          <Form {...followupForm}>
            <form
              onSubmit={followupForm.handleSubmit(onSubmit)}
              className='spsace-y-8 flex justify-between flex-wrap gap-2.5 px-5'
            >
              <FormField
                control={followupForm.control}
                name='contactAnswerStatus'
                render={({ field }) => (
                  <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <FormLabel>آیا مخاطب پاسخگوی تماس تلفنی بود؟</FormLabel>
                    <FormControl>
                      <Switch
                        dir='ltr'
                        className='m-0'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={followupForm.control}
                name='followupStatus'
                render={({ field }) => (
                  <FormItem className='w-full md:w-5/12'>
                    <FormLabel>وضعیت پیگیری</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      dir='rtl'
                      disabled={!followupForm.getValues().contactAnswerStatus}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='وضعیت پیگیری ...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>قبل از عمل</SelectLabel>
                          <SelectItem value='مشتاق'>مشتاق</SelectItem>
                          <SelectItem value='کنجکاو'>کنجکاو</SelectItem>
                          <SelectItem value='پیگیر'>پیگیر</SelectItem>
                          <SelectItem value='مردد'>مردد</SelectItem>
                          <SelectItem value='تماس اشتباه'>
                            تماس اشتباه
                          </SelectItem>
                          <SelectItem value='سایر'>سایر</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>بعد از عمل</SelectLabel>
                          <SelectItem value='راضی'>راضی</SelectItem>
                          <SelectItem value='ناراضی'>ناراضی</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={followupForm.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='w-full mt-4'>
                    <FormLabel>توضیحات تماس</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        placeholder='توضیحات تماس ...'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end w-full mt-5 gap-2.5'>
                <Button type='submit'>ثبت پیگیری</Button>
              </div>
            </form>
          </Form>
        </>
      )}
      <ContactFollowupListView selectedContactId={selectedContactId} />
    </PanelLayout>
  );
};

export default ContactFollowupView;
