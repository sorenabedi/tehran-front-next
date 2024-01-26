"use client";
import PanelLayout from "@/layouts/panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { getRndInteger } from "@/utilities";

const ContactListView = () => {
  return (
    <>
      <PanelLayout
        className={clsx("px-3 py-4 flex justify-between items-center")}
        withBorder
      ></PanelLayout>
      <PanelLayout className='w-full overflow-auto px-3 py-5 h-full flex-1'>
        <Table dir='rtl' className='relative'>
          <TableHeader className='sticky top-0'>
            <TableRow>
              <TableHead className='w-20 text-center'>ردیف</TableHead>
              <TableHead className='min-w-24'>نام</TableHead>
              <TableHead className='min-w-24'>نام خانوادگی</TableHead>
              <TableHead className='min-w-24'>تلفن تماس</TableHead>
              <TableHead className='min-w-56'>شبکه های اجتماعی</TableHead>
              <TableHead className='min-w-24'>تاریخ ایجاد</TableHead>
              <TableHead className='min-w-24'>تاریخ آخرین ویرایش</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(30).fill(0).map((_, idx) => (
              <TableRow key={`contact-item-${idx}`}>
                <TableCell className='font-medium text-center'>
                  {(idx + 1).toLocaleString("fa")}
                </TableCell>
                <TableCell>محمد</TableCell>
                <TableCell>عسگری کلاوری ورکانه</TableCell>
                <TableCell>۰۹۱۲۳۵۱۵۲۱۴</TableCell>
                <TableCell className='flex flex-col gap-1.5'>
                  <span>
                    تلگرام{" "}
                    <Badge variant='outline' dir='ltr'>
                      @calavari
                    </Badge>
                  </span>
                  <span>
                    تلگرام{" "}
                    <Badge variant='outline' dir='ltr'>
                      @calavari
                    </Badge>
                  </span>
                  <span>
                    تلگرام{" "}
                    <Badge variant='outline' dir='ltr'>
                      @calavari
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(
                    getRndInteger(Date.now(), Date.now() * 1.01)
                  ).toLocaleString("fa-IR")}
                </TableCell>
                <TableCell>
                  {new Date(
                    getRndInteger(Date.now(), Date.now() * 1.01)
                  ).toLocaleString("fa-IR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PanelLayout>
      <PanelLayout className='w-full overflow-auto px-3 py-5'>
        <Pagination dir='rtl'>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </PanelLayout>
    </>
  );
};

export default ContactListView;
