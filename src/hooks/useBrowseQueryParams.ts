"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useBrowseQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const page = parseInt(searchParams.get("currentPage") || "1", 10);
    const online = searchParams.get("isOnline") === "true";
    setCurrentPage(page);
    setIsOnline(online);
  }, [searchParams]);

  const updateParams = (params: { currentPage?: number; isOnline?: boolean }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.currentPage !== undefined) {
      newParams.set("currentPage", params.currentPage.toString());
    }

    if (params.isOnline !== undefined) {
      newParams.set("isOnline", params.isOnline.toString());
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return {
    currentPage,
    isOnline,
    updateParams,
  };
}
