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
import { contactUpdate, contactView } from "@/api";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
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

const ContactEditNextFollowupDateView = ({
  selectedContactId,
  onClose,
}: Props) => {
  useEffect(() => {
    (async () => {
      if (!selectedContactId) return;
      const contact = await contactView(selectedContactId);

      editForm.reset({
        nextFollowupDate: contact?.nextFollowupDate,
      });
    })();
  }, []);

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit({ ...values }: z.infer<typeof formSchema>) {
    try {
      const data = await contactUpdate(
        {
          ...values,
          contactId: selectedContactId as string,
        },
        undefined,
        true
      );
      toast.success("تاریخ پیگیری بعدی ذخیره شد.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full overflow-auto py-5'>
      <Form {...editForm}>
        <form
          onSubmit={editForm.handleSubmit(onSubmit)}
          className='spsace-y-8 flex flex-wrap justify-between flex-wrap gap-2.5 px-5'
        >
          <FormField
            control={editForm.control}
            name='nextFollowupDate'
            render={({ field }) => (
              <FormItem className='space-y-2 flex flex-col gap-2.5 w-full items-center justify-between'>
                <FormLabel>تاریخ پیگیری بعدی</FormLabel>
                <FormControl>
                  <Calendar
                    className='!w-full rounded-lg border shadow-sm px-3'
                    value={field.value}
                    onChange={(dateObject) => {
                      field.onChange(new Date(dateObject!.valueOf() as number));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end w-full mt-5'>
            <Button type='submit'>ثبت تاریخ پیگیری بعدی</Button>
          </div>
        </form>
      </Form>
    </PanelLayout>
  );
};

export default ContactEditNextFollowupDateView;
