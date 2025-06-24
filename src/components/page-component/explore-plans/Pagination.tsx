"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const getPages = () => Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-3 select-none justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <ChevronLeft size={20} />
      </button>
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-8 h-8 rounded-md text-sm font-medium transition",
            currentPage === page ? "bg-white shadow text-black" : "text-gray-700 hover:text-black"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
