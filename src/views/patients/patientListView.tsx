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
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { useGlobalStore, useUserStore } from "@/store";
import { Input } from "@/components/ui/input";
import { cancelToken } from "@/utilities/fetcher";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  medicalRecordGetAll,
  medicalRecordListResponse,
  medicalRecordListSearchQueryParams,
} from "@/api";
import { useDebounce } from "use-debounce";
import { EditSvg, EyeSvg, PhoneSvg } from "@/icons";
import Link from "next/link";
import { CancelTokenSource } from "axios";
import { PaginationPanel } from "@/components/paginationPanel";

const PatientsListView = () => {
  const { user } = useUserStore((state) => state);
  const { LoadingLayoutHide, LoadingLayoutShow } = useGlobalStore(
    (state) => state
  );
  const prevSearchFiltersRef = useRef<medicalRecordListSearchQueryParams>({});
  const [medicalRecords, setMedicalRecords] = useState<
    medicalRecordListResponse["allMedicalRecords"]
  >([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string | undefined>();
  const [debounced] = useDebounce({ query }, 500);

  const loadMedicalRecordsCallback = useCallback(
    async (apiCancelToken?: CancelTokenSource) => {
      if (!medicalRecordGetAll) return;
      setMedicalRecords([]);
      LoadingLayoutShow();
      const data = await medicalRecordGetAll(
        { ...debounced, page },
        apiCancelToken
      );

      if (!data) return;
      setTotalPages(data.pages);
      setMedicalRecords(data.allMedicalRecords);
    },
    [LoadingLayoutShow, debounced, page]
  );

  useEffect(() => {
    const searchParams: medicalRecordListSearchQueryParams = { ...debounced };
    if (
      JSON.stringify(searchParams) !==
      JSON.stringify(prevSearchFiltersRef.current)
    ) {
      prevSearchFiltersRef.current = searchParams;
      setPage(0);
      setTotalPages(0);
      return;
    }
    const apiCancelToken = cancelToken.source();
    (async () => {
      try {
        LoadingLayoutShow();
        await loadMedicalRecordsCallback(apiCancelToken);
      } catch (error) {}
      LoadingLayoutHide();
    })();
    LoadingLayoutHide();
    return () => {
      LoadingLayoutHide();
      apiCancelToken.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(debounced || {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(prevSearchFiltersRef.current || {}),
    page,
  ]);
  return (
    <>
      <PanelLayout
        className={clsx(
          "px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-2.5"
        )}
        withBorder
      >
        <h2 className='font-semibold text-center text-sm text-nowrap'>
          فیلترهای جستجو
        </h2>
        <div className='flex flex-col md:flex-row w-full max-w-96 gap-2.5'>
          <Input
            className='w-full'
            placeholder='جستجو ...'
            autoComplete='off'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='mx-auto'>
            <Button variant={"secondary"} disabled>
              دانلود خروجی اکسل
            </Button>
          </div>
        </div>
      </PanelLayout>
      <PanelLayout className='w-full overflow-auto px-3 py-5 h-full flex-1'>
        <Table dir='rtl' className='relative'>
          <TableHeader className='sticky top-0 bg-background'>
            <TableRow className='text-nowrap'>
              <TableHead className='w-20 text-center'>ردیف</TableHead>
              <TableHead className='min-w-24 text-center'>نام</TableHead>
              <TableHead className='min-w-24 text-center'>
                نام خانوادگی
              </TableHead>
              <TableHead className='min-w-10'></TableHead>
              <TableHead className='min-w-24 text-center'>
                مشاور پیگیری کننده
              </TableHead>
              <TableHead className='min-w-24 text-center'>نوع خدمت</TableHead>
              <TableHead className='min-w-24 text-center'>
                درخواست تیم کاشت
              </TableHead>
              <TableHead className='min-w-24 text-center'>تاریخ عمل</TableHead>
              <TableHead className='min-w-36 text-center'>
                مبلغ باقی مانده
              </TableHead>
              <TableHead className='min-w-36 text-center'>
                مبلغ بیعانه
              </TableHead>
              <TableHead className='min-w-36 text-center'>مبلغ کل</TableHead>
              <TableHead className='min-w-24 text-center'>
                تاریخ افزودن
              </TableHead>
              <TableHead className='min-w-24 text-center'>
                تاریخ ویرایش
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-base'>
            {medicalRecords.map((medicalRecord, idx) => (
              <TableRow key={`medicalRecord-item-${medicalRecord.id}`}>
                <TableCell className='font-medium text-center'>
                  <span className='flex gap-2.5 items-center w-full px-2'>
                    {(50 * page + idx + 1).toLocaleString("fa")}
                  </span>
                </TableCell>
                <TableCell>
                  <span>{medicalRecord.Contact.firstName}</span>
                </TableCell>
                <TableCell>
                  <span>{medicalRecord.Contact.lastName}</span>
                </TableCell>

                <TableCell className='font-medium text-center'>
                  <Link
                    href={`/panel/patients/update/${medicalRecord.Contact.id}`}
                  >
                    <Button variant={"default"} size={"icon"}>
                      <EyeSvg />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className='text-center'>
                  <Badge variant={"default"} className=''>
                    <span> {medicalRecord.Contact.assignedTo.firstName}</span>
                    <span>{medicalRecord.Contact.assignedTo.lastName}</span>
                  </Badge>
                </TableCell>
                <TableCell className='text-center'>
                  {medicalRecord.hairTransplant && (
                    <Badge variant={"outline"}>کاشت مو</Badge>
                  )}
                  {medicalRecord.beardTransplant && (
                    <Badge variant={"outline"}>
                      کاشت ریش و سبیل {medicalRecord.beardTransplant}
                    </Badge>
                  )}
                  {medicalRecord.eyebrowTransplant && (
                    <Badge variant={"outline"}>
                      کاشت ابرو {medicalRecord.eyebrowTransplant}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className='text-nowrap'>
                  <div className='flex flex-col items-center justify-center h-full gap-1'>
                    <strong className='text-sm'>
                      {medicalRecord.transplantRequest}
                    </strong>
                    <Badge>{medicalRecord.densityPercentage}</Badge>
                  </div>
                </TableCell>
                <TableCell className='text-nowrap'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    {new Date(
                      medicalRecord?.surgeryAppointment
                    ).toLocaleDateString("fa-IR")}
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    <span>
                      {Number(
                        (medicalRecord.totalFee || 0) -
                          (medicalRecord.downPayment || 0) -
                          (medicalRecord.otherPayment || 0)
                      ).toLocaleString("fa")}
                    </span>
                    {medicalRecord.downPayment ? <strong>تومان</strong> : null}
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    <span>
                      {Number(medicalRecord.downPayment).toLocaleString("fa")}
                    </span>
                    {medicalRecord.downPayment ? <strong>تومان</strong> : null}
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    <span>
                      {Number(medicalRecord.totalFee).toLocaleString("fa")}
                    </span>
                    {medicalRecord.downPayment ? <strong>تومان</strong> : null}
                  </div>
                </TableCell>

                <TableCell className='text-nowrap'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    {new Date(medicalRecord?.createdAt)
                      .toLocaleString("fa-IR")
                      .split(",")
                      .map((datePart) => (
                        <span key={"date" + datePart}>{datePart}</span>
                      ))}
                  </div>
                </TableCell>
                <TableCell className='text-nowrap'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    {new Date(medicalRecord?.updatedAt)
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
      <PanelLayout className='w-full overflow-auto px-3 py-5'>
        <PaginationPanel
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </PanelLayout>
    </>
  );
};

export default PatientsListView;
