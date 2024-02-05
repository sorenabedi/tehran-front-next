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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { cancelToken } from "@/utilities";
import { contactFollowupCreateResponse, getFollowupList } from "@/api";
import { Badge } from "@/components/ui/badge";

type Props = {
  selectedContactId?: string;
};
const ContactFollowupListView = ({ selectedContactId }: Props) => {
  const [followupList, setFollowupList] = useState<
    contactFollowupCreateResponse[]
  >([]);

  useEffect(() => {
    const apiCancelToken = cancelToken.source();
    (async () => {
      if (!selectedContactId) return;
      const data = await getFollowupList({ selectedContactId }, apiCancelToken);

      if (!data) return;
      setFollowupList(data.data);
    })();
    return () => {
      apiCancelToken.cancel();
    };
  }, [selectedContactId]);

  return (
    <PanelLayout className='w-full grid overflow-auto py-5'>
      <h3 className='px-5 mb-10 font-normal text-base'>پیگیری های قبل:</h3>
      <Table dir='rtl' className='relative'>
        <TableHeader className='sticky top-0'>
          <TableRow className='text-nowrap'>
            <TableHead className='w-20 text-center'>ردیف</TableHead>

            <TableHead className='min-w-24 text-center'>
              وضعیت پاسخگویی مخاطب
            </TableHead>
            <TableHead className='min-w-24 text-center'>نتیجه تماس</TableHead>
            <TableHead className='min-w-24 text-center'>توضیحات تماس</TableHead>
            <TableHead className='min-w-24 text-center'>تماس گیرنده</TableHead>
            <TableHead className='min-w-32 text-center'>تاریخ ثبت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-base'>
          {followupList.map((followup, idx) => (
            <TableRow key={`contact-item-${followup?.id}`}>
              <TableCell className='font-medium text-center'>
                <span className='flex gap-2.5 items-center w-full px-2'>
                  {(idx + 1).toLocaleString("fa")}
                </span>
              </TableCell>
              <TableCell>
                <div className='text-center'>
                  {followup.contactAnswerStatus ? (
                    <Badge variant={"default"} className='bg-malachite-700'>
                      پاسخگو
                    </Badge>
                  ) : (
                    <Badge variant={"destructive"}>عدم پاسخگویی</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className='text-center'>
                {followup.followupStatus || <span>---</span>}
              </TableCell>
              <TableCell className='text-center'>
                {followup.description || <span>---</span>}
              </TableCell>
              <TableCell>
                <Badge variant={"default"} className='flex gap-1.5' dir='rtl'>
                  <span> {followup.CreatedBy.firstName}</span>
                  <span>{followup.CreatedBy.lastName}</span>
                </Badge>
              </TableCell>

              <TableCell>
                <div className='flex flex-col items-center justify-center h-full'>
                  {new Date(followup?.createdAt)
                    .toLocaleString("fa-IR")
                    .split(",")
                    .map((datePart) => (
                      <span key={"date" + datePart}>{datePart}</span>
                    ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PanelLayout>
  );
};

export default ContactFollowupListView;
