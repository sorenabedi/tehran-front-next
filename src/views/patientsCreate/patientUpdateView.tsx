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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  contactCreateRequest,
  contactView,
  medicalRecordCreateRequest,
  medicalRecordGetItem,
  medicalRecordUpdate,
} from "@/api";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store";
import { toast } from "@/components/ui/toast";
import { Calendar } from "@/components/ui/calendar";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { numberToWords } from "@persian-tools/persian-tools";

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
  description: z.string({}),
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
});

type Props = {};

const PatientUpdateView = (props: Props) => {
  const { user } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<contactCreateRequest>({});
  const { patientId } = params;
  const form = useForm<medicalRecordCreateRequest>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      alcoholicDrinks: false,
      aspirin: false,
      aspirinDosage: "",
      beardTransplant: undefined,
      bloodTextResults: [],
    },
  });

  useEffect(() => {
    (async () => {
      if (!patientId) return;
      const contact = await contactView(patientId as string);
      try {
        const {
          Contact,
          updatedAt,
          createdAt,
          id,
          MedicalRecordEditRequests,
          ...medicalRecord
        } = await medicalRecordGetItem(patientId as string);
        form.reset(medicalRecord);
        setContactInfo(Contact);
      } catch (error) {}
    })();
  }, []);

  async function onSubmit({
    weight,
    height,
    totalFee,
    otherPayment,
    downPayment,
    ...values
  }: medicalRecordCreateRequest) {
    try {
      await medicalRecordUpdate({
        contactId: patientId as string,
        weight: Number(weight),
        height: Number(height),
        totalFee: Number(totalFee),
        otherPayment: Number(otherPayment),
        downPayment: Number(downPayment),
        ...values,
        userId: user?.id || "",
      });
      toast.success("پرونده ذخیره شد.");
      form.reset();
      router.push("/panel/patients");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <PanelLayout className='w-full overflow-auto px-3 py-5'>
      <h2 className='px-5 mb-10 font-semibold text-center text-lg'>
        بروزرسانی پرونده
      </h2>
      <h3 className='px-5 mb-10 font-normal text-base'>اطلاعات عمومی:</h3>
      <div className='px-5 flex flex-wrap justify-between w-full gap-x-2.5 gap-y-5'>
        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>نام</Label>
          <span>
            <span>{contactInfo.firstName}</span>
          </span>
        </div>
        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>نام خانوادگی</Label>
          <span>
            <span>{contactInfo.lastName}</span>
          </span>
        </div>

        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>تلفن تماس</Label>
          <span>{contactInfo.phoneNumber || "---"}</span>
        </div>

        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>تلفن تماس اضطراری</Label>
          <span>{"---"}</span>
        </div>
        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>آیدی تلگرام</Label>
          <span>{contactInfo.socialMedia?.telegram || "---"}</span>
        </div>
        <div className='flex flex-col gap-2.5 w-5/12 items-center'>
          <Label>آیدی اینستاگرام</Label>
          <span>{contactInfo.socialMedia?.instagram || "---"}</span>
        </div>

        <div className='flex flex-col gap-2.5 w-11/12 items-center'>
          <Label>توضیحات مخاطب</Label>
          <span>{contactInfo.extraNotes}</span>
        </div>
      </div>
      <Separator className='my-5 w-8/12 mx-auto' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='spsace-y-8 flex justify-between flex-wrap gap-2.5 px-5'
        >
          <h3 className='px-5 mb-10 font-normal text-base w-full'>
            نوع خدمات:
          </h3>
          <Tabs defaultValue='hair' className='w-full flex flex-col gap-2.5'>
            <TabsList className='mx-auto'>
              <TabsTrigger value='hair' className='py-1 text-sm'>
                کاشت مو
              </TabsTrigger>
              <TabsTrigger value='eyebrow' className='py-1 text-sm'>
                کاشت ابرو
              </TabsTrigger>
              <TabsTrigger value='beard' className='py-1 text-sm'>
                کاشت ریش و سبیل
              </TabsTrigger>
            </TabsList>
            <TabsContent value='hair' asChild dir='rtl'>
              <FormField
                control={form.control}
                name='hairTransplant'
                render={({ field }) => (
                  <FormItem className='w-full md:w-5/12 text-right p-1 mx-auto'>
                    <FormLabel>نوع کاشت مو</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='نوع کاشت مو ...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='FUE'>FUE</SelectItem>
                          <SelectItem value='BHT'>BHT</SelectItem>
                          <SelectItem value='NFUT'>NFUT</SelectItem>
                          <SelectItem value='SUPER_FUE_PLUS'>
                            SUPER FUE PLUS
                          </SelectItem>
                          <SelectItem value='MIX'>MIX</SelectItem>
                          <SelectItem value='SUPER_MIX'>SUPER MIX</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value='eyebrow' asChild dir='rtl'>
              <FormField
                control={form.control}
                name='eyebrowTransplant'
                render={({ field }) => (
                  <FormItem className='w-full md:w-5/12 text-right p-1 mx-auto'>
                    <FormLabel>نوع کاشت ابرو</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='نوع کاشت ابرو ...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='BHT'>BHT</SelectItem>
                          <SelectItem value='NFUT'>NFUT</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value='beard' asChild dir='rtl'>
              <FormField
                control={form.control}
                name='beardTransplant'
                render={({ field }) => (
                  <FormItem className='w-full md:w-5/12 text-right p-1 mx-auto'>
                    <FormLabel>نوع کاشت ریش و سبیل</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='نوع کاشت ریش و سبیل ...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='FUE'>FUE</SelectItem>
                          <SelectItem value='NFUT'>NFUT</SelectItem>
                          <SelectItem value='MIX'>MIX</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
          <div className='w-full'>
            <Separator className='my-5 w-8/12 mx-auto' />
          </div>
          <h3 className=' mb-10 font-normal text-base w-full'>
            اطلاعات پرونده:
          </h3>
          <div className='px-2 w-full space-y-0 flex justify-between flex-wrap gap-x-2.5 gap-y-5 items-center'>
            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>وزن</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='وزن ...'
                      autoComplete='off'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>قد</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='قد ...'
                      autoComplete='off'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='aspirin'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>مصرف آسپرین</FormLabel>
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
              control={form.control}
              name='aspirinDosage'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>مقدار مصرف آسپرین</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='مقدار مصرف آسپرین ...'
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
              name='alcoholicDrinks'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>مصرف مشروبات الکلی </FormLabel>
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
              control={form.control}
              name='smoking'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>مصرف سیگار </FormLabel>
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
              control={form.control}
              name='otherNarcotics'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>سایر مخدر ها</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={(field.value || [])?.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      onChange={(v) =>
                        field.onChange(v.map(({ value }) => value))
                      }
                      className='w-full py-2'
                      placeholder='سایر مخدر ها ...'
                      creatable
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='drugSensitivity'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>حساسیت به دارو بی‌حسی و یا داروهای خاص</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value?.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      onChange={(v) =>
                        field.onChange(v.map(({ value }) => value))
                      }
                      className='w-full py-2'
                      placeholder='حساسیت به دارو بی‌حسی و یا داروهای خاص ...'
                      creatable
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='specialistDoctor'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>پزشک</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='پزشک ...'
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
              name='haveBloodPressure'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>سابقه فشار خون </FormLabel>
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
              control={form.control}
              name='haveDiabetes'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>سابقه دیابت </FormLabel>
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
              control={form.control}
              name='haveAlopecia'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel> سابقه ابتلا به ریزش موی تیکه‌ای</FormLabel>
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
              control={form.control}
              name='haveLiechenPlanus'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel> سابقه ابتلا به لیکن پلان</FormLabel>
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
              control={form.control}
              name='havePsoriasis'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel> سابقه ابتلا به پسوریازیس</FormLabel>
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
              control={form.control}
              name='specificDiseases'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>بیماری های خاص</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value?.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      onChange={(v) =>
                        field.onChange(v.map(({ value }) => value))
                      }
                      className='w-full py-2'
                      placeholder='افزودن بیماری های خاص'
                      creatable
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hospitalization'
              render={({ field }) => (
                <FormItem className='space-y-0 w-full md:w-5/12 flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm'>
                  <FormLabel>سابقه جراحی یا بستری </FormLabel>
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
              control={form.control}
              name='hospitalizationInfo'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>توضیحات بستری</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder='توضیحات بستری ...'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='my-5 w-8/12 mx-auto py-5 opacity-0' />
            <div className='w-full md:w-5/12 flex flex-col gap-y-5 gap-x-2.5'>
              <FormField
                control={form.control}
                name='densityPercentage'
                render={({ field }) => (
                  <FormItem className='w-full text-right'>
                    <FormLabel>درصد تراکم</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='درصد تراکم ...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='100'>فول تراکم</SelectItem>
                          <SelectItem value='80-90'>80-90</SelectItem>
                          <SelectItem value='70-80'>70-80</SelectItem>
                          <SelectItem value='60-70'>60-70</SelectItem>
                          <SelectItem value='50-60'>50-60</SelectItem>
                          <SelectItem value='40-50'>40-50</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='transplantRequest'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>درخواست تیم کاشت</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder=' نوع درخواست...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='VIP'>VIP</SelectItem>
                          <SelectItem value='SUPER_VIP'>SUPER VIP</SelectItem>
                          <SelectItem value='NORMAL'>NORMAL</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className='my-2.5' />
              <FormField
                control={form.control}
                name='downPayment'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>مبلغ بیعانه</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='مبلغ بیعانه ...'
                        {...field}
                        type='number'
                        autoComplete='off'
                      />
                    </FormControl>

                    <FormDescription>
                      {field.value
                        ? `${
                            numberToWords(Number(field.value)) as string
                          } تومان`
                        : undefined}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='otherPayment'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>مابقی مبلغ پرداخت شده</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='مابقی مبلغ پرداخت شده ...'
                        {...field}
                        type='number'
                        autoComplete='off'
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value
                        ? `${
                            numberToWords(Number(field.value)) as string
                          } تومان`
                        : undefined}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='totalFee'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>مبلغ کل</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='مبلغ کل ...'
                        {...field}
                        type='number'
                        autoComplete='off'
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value
                        ? `${
                            numberToWords(Number(field.value)) as string
                          } تومان`
                        : undefined}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full md:w-5/12 flex flex-col gap-y-5 gap-x-2.5'>
              <FormField
                control={form.control}
                name='surgeryAppointment'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>تاریخ عمل</FormLabel>
                    <FormControl>
                      <Calendar
                        className='!w-full rounded-lg border shadow-sm px-3'
                        value={field.value}
                        onChange={(dateObject) => {
                          field.onChange(
                            new Date(dateObject!.valueOf() as number)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='surgeryStatus'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>وضعیت پرونده</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as unknown as string}
                      value={field.value as unknown as string}
                      dir='rtl'
                      required
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder=' وضعیت پرونده...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='WAITING'>
                            در انتظار جراحی
                          </SelectItem>
                          <SelectItem value='DONE'>جراحی انجام شد</SelectItem>
                          <SelectItem value='CANCELED'>
                            جراحی کنسل شد
                          </SelectItem>
                          <SelectItem value='REFUNDED'>
                            وجه پرداختی عودت شد
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex justify-end w-full mt-5'>
            <Button type='submit'>بروزرسانی پرونده</Button>
          </div>
        </form>
      </Form>
    </PanelLayout>
  );
};

export default PatientUpdateView;
