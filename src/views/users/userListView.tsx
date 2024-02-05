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
import { cancelToken } from "@/utilities";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserGetAll, UserListResponse, UserListSearchQueryParams } from "@/api";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CancelTokenSource } from "axios";
import { useGlobalStore } from "@/store";
import { PaginationPanel } from "@/components/paginationPanel";

const UserListView = () => {
  const { LoadingLayoutHide, LoadingLayoutShow } = useGlobalStore(
    (state) => state
  );
  const prevSearchFiltersRef = useRef<UserListSearchQueryParams>({});
  const [users, setUsers] = useState<UserListResponse["users"]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string | undefined>();
  const [debounced] = useDebounce({ query }, 500);

  const loadUsersCallback = useCallback(
    async (apiCancelToken?: CancelTokenSource) => {
      if (!UserGetAll) return;
      setUsers([]);
      LoadingLayoutShow();
      const data = await UserGetAll({ ...debounced, page }, apiCancelToken);

      if (!data) return;
      setTotalPages(data.pages);
      setUsers(data.users);
    },
    [LoadingLayoutShow, debounced, page]
  );

  useEffect(() => {
    const searchParams: UserListSearchQueryParams = { ...debounced };
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
        await loadUsersCallback(apiCancelToken);
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
        <div className='w-full max-w-60'>
          <Input
            placeholder='جستجو ...'
            autoComplete='off'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </PanelLayout>
      <PanelLayout className='w-full overflow-auto px-3 py-5 h-full flex-1'>
        <Table dir='rtl' className='relative'>
          <TableHeader className='sticky top-0 bg-background'>
            <TableRow>
              <TableHead className='w-20 text-center'>ردیف</TableHead>
              <TableHead className='min-w-24 text-center'>نام</TableHead>
              <TableHead className='min-w-24 text-center'>
                نام خانوادگی
              </TableHead>
              <TableHead className='min-w-24 text-center'>نام کاربری</TableHead>
              <TableHead className='min-w-24 text-center'>تلفن تماس</TableHead>
              <TableHead className='min-w-24 text-center'>سمت</TableHead>
              <TableHead className='min-w-24 text-center'>
                تاریخ ایجاد
              </TableHead>
              <TableHead className='min-w-24 text-center'>
                تاریخ ویرایش
              </TableHead>
              <TableHead className='w-20'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  username,
                  phoneNumber,
                  role,
                  createdAt,
                  updatedAt,
                },
                idx
              ) => (
                <TableRow key={`contact-item-${id}`}>
                  <TableCell className='font-medium text-center'>
                    {(50 * page + idx + 1).toLocaleString("fa")}
                  </TableCell>
                  <TableCell className='text-center text-nowrap'>
                    {firstName || "----"}
                  </TableCell>
                  <TableCell className='text-center text-nowrap'>
                    {lastName || "----"}
                  </TableCell>
                  <TableCell className='text-center text-nowrap'>
                    {username || "----"}
                  </TableCell>
                  <TableCell className='text-center'>
                    {phoneNumber || "----"}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={"outline"} className='text-xs py-1'>
                      {role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className='flex flex-col items-center justify-center h-full'>
                      {new Date(createdAt)
                        .toLocaleString("fa-IR")
                        .split(",")
                        .map((datePart) => (
                          <span key={"date" + datePart}>{datePart}</span>
                        ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className='flex flex-col items-center justify-center h-full'>
                      {new Date(updatedAt)
                        .toLocaleString("fa-IR")
                        .split(",")
                        .map((datePart) => (
                          <span key={"date" + datePart}>{datePart}</span>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center h-full gap-2.5'>
                      <Link href={`/panel/users/${id}`}>
                        <Button size={"sm"}>ویرایش</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
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

export default UserListView;
