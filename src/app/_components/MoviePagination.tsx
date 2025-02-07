"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export const MoviePagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value");
  const genreIds = searchParams.get("genreIds");

  const goToPage = (page: number) => {
    if (searchValue == null) {
      if (genreIds) {
        router.push(`?genreIds=${genreIds}&page=${page}`);
      } else {
        router.push(`?page=${page}`);
      }
    } else {
      if (genreIds) {
        router.push(`?value=${searchValue}&genreIds=${genreIds}&page=${page}`);
      } else {
        router.push(`?value=${searchValue}&page=${page}`);
      }
    }
  };
  return (
    <div>
      <Pagination className="">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive href="#">
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && totalPages > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage == 1 && totalPages > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(currentPage + 2)}>
                {currentPage + 2}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 1 && totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
