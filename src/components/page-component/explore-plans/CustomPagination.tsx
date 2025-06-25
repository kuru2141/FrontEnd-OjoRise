"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent, useCallback, useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ totalPages, currentPage, onPageChange }: PaginationProps) {

  const pages = useMemo(() => {
    const maxVisible = 5;

    const rawStart = currentPage - Math.floor(maxVisible / 2);
    const start = Math.max(1, Math.min(rawStart, totalPages - maxVisible + 1));
    const end = Math.min(totalPages, start + maxVisible - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }, [currentPage, totalPages]);

  const handleClick = useCallback(
    (e: MouseEvent, page: number, disabled?: boolean) => {
      e.preventDefault();
      if (!disabled && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange]
  );

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => handleClick(e, currentPage - 1, currentPage === 1)}
            isActive={false}
            className={`px-2 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            <ChevronLeft size={16} />
          </PaginationLink>
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => handleClick(e, page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1, currentPage === totalPages)}
            isActive={false}
            className={`px-2 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
          >
            <ChevronRight size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
