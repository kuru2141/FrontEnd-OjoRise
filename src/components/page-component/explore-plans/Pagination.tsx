"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onChangePage?: (page: number) => void;
}

export function Pagination({ totalPages, initialPage = 1, onChangePage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onChangePage?.(page);
  };

  const getPages = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={cn(
            "w-8 h-8 rounded-md text-sm font-medium transition",
            currentPage === page ? "bg-white shadow text-black" : "text-gray-700 hover:text-black"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
