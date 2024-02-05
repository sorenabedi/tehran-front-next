import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useMemo,
} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export interface TRPaginationPanel {
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  page: number;
}

const PaginationPanel: FunctionComponent<TRPaginationPanel> = ({
  setPage,
  totalPages,
  page,
}) => {
  const paginationArray = useMemo(() => {
    function paginate(current: number, max: number) {
      if (!current || !max) return null;

      let prev = current === 1 ? null : current - 1,
        next = current === max ? null : current + 1,
        items: (number | string)[] = [1];

      if (current === 1 && max === 1) return { current, prev, next, items };
      if (current > 4) items.push("…");

      let r = 1,
        r1 = current - r,
        r2 = current + r;

      for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

      if (r2 + 1 < max) items.push("…");
      if (r2 < max) items.push(max);

      return { current, prev, next, items };
    }
    console.log(paginate(page + 1, totalPages + 1));

    return paginate(page + 1, totalPages + 1)?.items;
  }, [totalPages, page]);
  return (
    <>
      <Pagination dir='rtl' className='flex-wrap'>
        <PaginationContent>
          {page > 0 && (
            <PaginationItem>
              <PaginationPrevious href='#' onClick={() => setPage(page - 1)} />
            </PaginationItem>
          )}
          {paginationArray?.map((paginationItem, idx) => {
            if (typeof paginationItem === "string")
              return (
                <PaginationItem className='aspect-square inline-block w-4 h-4'>
                  <>...</>
                </PaginationItem>
              );
            return (
              <PaginationItem key={`pagination-${paginationItem}`}>
                <PaginationLink
                  href={"#"}
                  onClick={() => setPage(paginationItem - 1)}
                  isActive={page === paginationItem - 1}
                >
                  {paginationItem.toLocaleString("fa")}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href='#' onClick={() => setPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationPanel;
