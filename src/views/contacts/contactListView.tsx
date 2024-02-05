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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { useGlobalStore, useUserStore } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cancelToken } from "@/utilities/fetcher";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  UserGetAll,
  UserRole,
  associateContactsToConsultant,
  contactGetAll,
  contactGetAllResponse,
  contactListSearchQueryParams,
  contactUnassignedCount,
} from "@/api";
import { useDebounce } from "use-debounce";
import ContactEditView from "./contactEditView";
import { EditSvg, PhoneSvg } from "@/icons";
import { toast } from "@/components/ui/toast";
import ContactFollowupView from "./contactFollowupView";
import Link from "next/link";
import { CancelTokenSource } from "axios";
import ContactEditNextFollowupDateView from "./contactEditNextFollowupDateView";
import { PaginationPanel } from "@/components/paginationPanel";

const ContactListView = () => {
  const { user } = useUserStore((state) => state);
  const { LoadingLayoutHide, LoadingLayoutShow } = useGlobalStore(
    (state) => state
  );
  const prevSearchFiltersRef = useRef<contactListSearchQueryParams>({});

  const [contactsList, setContactsList] = useState<
    contactGetAllResponse["contacts"]
  >([]);
  const [consultants, setConsultants] = useState<
    Record<string, string | undefined | Date>[]
  >([]);
  const [availableContacts, setAvailableContacts] = useState<number>(0);
  const [forceRefresh, setForceRefresh] = useState<number>(0);
  const [contactsToAssign, setContactsToAssign] = useState<number>(0);
  const [selectedConsultantForAssignment, setSelectedConsultantForAssignment] =
    useState<string>();
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string | undefined>();
  const [followupStatus, setFollowupStatus] =
    useState<contactListSearchQueryParams["followupStatus"]>();
  const [selectedConsultantId, setSelectedConsultantId] = useState<
    string | undefined
  >();
  const [debounced] = useDebounce(
    { query, followupStatus, consultantId: selectedConsultantId },
    500
  );
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >();

  const loadContactsCallback = useCallback(
    async (apiCancelToken?: CancelTokenSource) => {
      if (!contactGetAll) return;
      setContactsList([]);
      const data = await contactGetAll(
        { ...debounced, page },
        apiCancelToken,
        ["ADMIN", "SUPERVISOR"].includes(user?.role || "")
      );

      if (!data) return;
      setTotalPages(data.pages);
      setContactsList(data.contacts);
    },
    [debounced, page, user?.role]
  );

  useEffect(() => {
    const searchParams: contactListSearchQueryParams = { ...debounced };
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
        await loadContactsCallback(apiCancelToken);
      } catch (error) {}
      LoadingLayoutHide();
    })();
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
    user?.role,
    selectedContactId,
  ]);

  useEffect(() => {
    const apiCancelToken = cancelToken.source();
    (async () => {
      if (!["ADMIN", "SUPERVISOR"].includes(user?.role as string | "")) return;
      if (!UserGetAll) return;
      LoadingLayoutShow();
      try {
        const data = await UserGetAll(
          { role: UserRole.CONSULTANT },
          apiCancelToken
        );
        const { unassignedContacts } = await contactUnassignedCount(
          apiCancelToken
        );
        if (!data) return;
        setConsultants(data.users);
        setAvailableContacts(unassignedContacts);
      } catch (error) {}
    })();
    LoadingLayoutHide();
    return () => {
      LoadingLayoutHide();
      apiCancelToken.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user?.role || {}), forceRefresh]);

  const assignToConsultant = useCallback(async () => {
    if (!selectedConsultantForAssignment) return;
    try {
      await associateContactsToConsultant({
        userId: selectedConsultantForAssignment,
        contactCount: contactsToAssign,
      });
      const assignedConsultant = consultants.find(
        ({ id }) => id === selectedConsultantForAssignment
      );
      toast.success(
        `${contactsToAssign} مخاطب به ${assignedConsultant?.firstName} ${assignedConsultant?.lastName} انتصاب داده شد.`
      );
      setForceRefresh(Math.random());
      setSelectedConsultantForAssignment(undefined);
      setContactsToAssign(0);
      loadContactsCallback();
    } catch (error) {
      toast.error(`عملیات انتصاب با اشکال مواجه شد!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConsultantForAssignment, contactsToAssign]);

  return (
    <>
      {["SUPERVISOR"].includes(user?.role || "") && (
        <PanelLayout
          className={clsx(
            "px-3 py-4 flex flex-col justify-between items-start"
          )}
          withBorder
        >
          <h2 className='mb-2 w-full text-center md:text-start font-semibold text-center text-sm'>
            انتصاب مخاطبین به مشاور
          </h2>
          <div className='flex flex-col md:flex-row justify-start items-center gap-2.5 mt-5 w-full'>
            <div className='flex flex-col md:flex-row gap-2.5'>
              <Input
                className='w-48'
                placeholder={`${availableContacts.toLocaleString(
                  "fa"
                )} مخاطب آزاد ...`}
                autoComplete='off'
                type='number'
                min={0}
                onChange={(e) => setContactsToAssign(Number(e.target.value))}
                value={contactsToAssign || ""}
                max={availableContacts}
                required
              />
              <Select
                value={selectedConsultantForAssignment || ""}
                onValueChange={setSelectedConsultantForAssignment}
                required
                dir='rtl'
              >
                <SelectTrigger className='w-48'>
                  <SelectValue placeholder='انتخاب مشاور' />
                </SelectTrigger>
                <SelectContent>
                  {consultants?.map((item) => {
                    return (
                      <SelectItem
                        key={item!.id as string}
                        value={item!.id as string}
                      >
                        {item?.firstName as string} {item?.lastName as string}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={assignToConsultant}
              className='px-16'
              disabled={
                !selectedConsultantForAssignment ||
                typeof contactsToAssign !== "number" ||
                contactsToAssign < 1
              }
            >
              انتصاب
            </Button>
          </div>
        </PanelLayout>
      )}
      <PanelLayout
        className={clsx(
          "px-5 py-4 flex flex-col justify-between items-center gap-5"
        )}
        withBorder
      >
        <h2 className='font-semibold text-center md:text-start text-sm text-nowrap w-full'>
          فیلترهای جستجو
        </h2>
        <div className='w-full flex flex-wrap gap-2.5 justify-center md:justify-start items-center'>
          <Input
            className='max-w-sm'
            placeholder='جستجو ...'
            autoComplete='off'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {["SUPERVISOR", "ADMIN", "CONSULTANT"].includes(user?.role || "") && (
            <Select
              onValueChange={(e) => {
                if (e !== "all") setFollowupStatus(e as typeof followupStatus);
                else setFollowupStatus(undefined);
              }}
              value={followupStatus || ""}
              dir='rtl'
            >
              <SelectTrigger className='w-full max-w-xs'>
                <SelectValue placeholder='بر اساس وضعیت پیگیری ...' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='all'>همه</SelectItem>
                <SelectItem value='waiting'>پیگیری نشده</SelectItem>
                <SelectItem value='inProgress'>در دست پیگیری</SelectItem>
              </SelectContent>
            </Select>
          )}
          {["SUPERVISOR", "ADMIN"].includes(user?.role || "") && (
            <Select
              onValueChange={(e) => {
                if (e !== "all") setSelectedConsultantId(e);
                else setSelectedConsultantId(undefined);
              }}
              value={selectedConsultantId || ""}
              dir='rtl'
            >
              <SelectTrigger className='w-full max-w-xs'>
                <SelectValue placeholder='بر اساس مشاور ...' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='all'>همه</SelectItem>
                {consultants?.map((item) => {
                  return (
                    <SelectItem
                      key={item!.id as string}
                      value={item!.id as string}
                    >
                      {item?.firstName as string} {item?.lastName as string}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <hr className='w-full opacity-0' />
          <Button variant={"secondary"} disabled className='md:mis-auto'>
            دانلود خروجی اکسل
          </Button>
        </div>
      </PanelLayout>
      <PanelLayout className='w-full overflow-auto px-3 py-5 h-full flex-1'>
        <Table dir='rtl' className='relative border-spacing-4'>
          <TableHeader className='sticky top-0 bg-background'>
            <TableRow className='text-nowrap'>
              <TableHead className='w-20 text-center'>ردیف</TableHead>
              <TableHead className='min-w-24 text-center'>نام</TableHead>
              <TableHead className='min-w-24 text-center'>
                نام خانوادگی
              </TableHead>
              <TableHead className='min-w-24'></TableHead>
              <TableHead className='min-w-24 text-center'>تلفن تماس</TableHead>
              <TableHead className='min-w-56 text-center'>
                شبکه های اجتماعی
              </TableHead>
              {user?.role !== "OPERATOR" && (
                <TableHead className='min-w-24 text-center'>وضعیت</TableHead>
              )}
              {!["OPERATOR", "CONSULTANT"].includes(user?.role || "") && (
                <TableHead className='w-24 text-center'>
                  مشاور پیگیری کننده
                </TableHead>
              )}
              <TableHead className='min-w-24 text-center'>
                تاریخ افزودن
              </TableHead>
              <TableHead className='min-w-24 text-center'>
                تاریخ ویرایش
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-base'>
            {contactsList.map((contact, idx) => (
              <TableRow key={`contact-item-${contact.id}`}>
                <TableCell className='font-medium text-center'>
                  <span className='flex gap-2.5 items-center w-full px-2'>
                    {(50 * page + idx + 1).toLocaleString("fa")}
                  </span>
                </TableCell>
                <TableCell className='text-nowrap'>
                  {contact.firstName || <span>---</span>}
                </TableCell>
                <TableCell className='text-nowrap'>
                  {contact.lastName || <span>---</span>}
                </TableCell>
                <TableCell>
                  <div className='flex gap-5 justify-center flex-nowrap items-center'>
                    <Button
                      variant={"default"}
                      size={"icon"}
                      // className='hover:text-primary transition-colors'
                      onClick={() => setSelectedContactId(contact.id)}
                    >
                      {user?.role !== "OPERATOR" ? <PhoneSvg /> : <EditSvg />}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  {contact.phoneNumber || <span>---</span>}
                </TableCell>
                <TableCell>
                  <div className='flex flex-col flex-1 gap-1.5 w-full h-full'>
                    {Object.entries(contact.socialMedia || { "---": "---" })
                      .filter(([_, id]) => id)
                      .map(([platform, platformId]) => (
                        <span
                          dir='ltr'
                          className='flex gap-2 w-full justify-between'
                          key={`social-item-${contact.id}-${platform}`}
                        >
                          <strong className='capitalize font-medium text-sm'>
                            {platform}
                          </strong>
                          <Badge variant='outline' dir='ltr' className='mie-4'>
                            @{platformId}
                          </Badge>
                        </span>
                      ))}
                  </div>
                </TableCell>

                {user?.role !== "OPERATOR" && (
                  <TableCell className='py-2 text-center flex flex-col gap-2.5'>
                    <span className='text-nowrap inline-block text-center'>
                      <span className='block'>
                        {contact.followups?.length?.toLocaleString("fa")} پیگیری
                      </span>
                    </span>
                    {contact.followups !== undefined &&
                      contact.followups.length > 0 && (
                        <span>
                          {contact.followups[contact.followups.length - 1]
                            ?.contactAnswerStatus ? (
                            <Badge
                              variant={"default"}
                              className='bg-malachite-700 hover:bg-malachite-800'
                            >
                              {
                                contact.followups[contact.followups.length - 1]
                                  .followupStatus
                              }
                            </Badge>
                          ) : (
                            <Badge variant={"destructive"}>
                              {
                                contact.followups[contact.followups.length - 1]
                                  .followupStatus
                              }
                            </Badge>
                          )}
                        </span>
                      )}
                    {user?.role === "CONSULTANT" && (
                      <span className='flex gap-2.5 items-center'>
                        {contact?.medicalRecords?.length ? (
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            type='button'
                            disabled
                          >
                            پرونده تشکیل شد
                          </Button>
                        ) : (
                          <Link href={`/panel/patients/${contact.id}`}>
                            <Button size={"sm"} type='button'>
                              تشکیل پرونده
                            </Button>
                          </Link>
                        )}
                      </span>
                    )}
                  </TableCell>
                )}
                {!["OPERATOR", "CONSULTANT"].includes(user?.role || "") && (
                  <TableCell className='text-center'>
                    {contact.assignedTo ? (
                      <Badge variant={"default"} className=''>
                        <span> {contact.assignedTo.firstName}</span>
                        <span>{contact.assignedTo.lastName}</span>
                      </Badge>
                    ) : (
                      "---"
                    )}
                  </TableCell>
                )}
                <TableCell className='text-nowrap'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    {new Date(contact.createdAt)
                      .toLocaleString("fa-IR")
                      .split(",")
                      .map((datePart) => (
                        <span key={"date" + datePart}>{datePart}</span>
                      ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col items-center justify-center h-full'>
                    {new Date(contact.updatedAt)
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
      <Dialog
        onOpenChange={() => setSelectedContactId(undefined)}
        open={Boolean(selectedContactId)}
      >
        <DialogContent className='max-w-5xl w-full'>
          <DialogHeader>
            <DialogTitle>
              {user?.role !== "OPERATOR" && "پیگیری و"}
              تصحیح مخاطب
            </DialogTitle>
            <DialogDescription className='max-h-[90dvh] overflow-auto'>
              <ContactEditView
                selectedContactId={selectedContactId}
                onClose={() => setSelectedContactId(undefined)}
              />
              {user?.role !== "OPERATOR" && (
                <>
                  <ContactFollowupView
                    selectedContactId={selectedContactId}
                    onClose={() => setSelectedContactId(undefined)}
                  />
                  <ContactEditNextFollowupDateView
                    selectedContactId={selectedContactId}
                    onClose={() => setSelectedContactId(undefined)}
                  />
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactListView;
