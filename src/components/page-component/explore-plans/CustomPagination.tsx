"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const getDisplayPages = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getDisplayPages();

  const handleClick = (e: React.MouseEvent, page: number, disabled?: boolean) => {
    e.preventDefault();
    if (!disabled && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {/* Prev */}
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

        {/* Page numbers */}
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

        {/* Next */}
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
