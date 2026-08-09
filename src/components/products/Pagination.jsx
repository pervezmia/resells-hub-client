"use client";

import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ currentPage = 1, totalPages = 1 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage <= 1}
        onPress={() => goToPage(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft width={16} height={16} />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? undefined : "ghost"}
          size="sm"
          className={
            page === currentPage ? "bg-accent text-accent-foreground" : ""
          }
          onPress={() => goToPage(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage >= totalPages}
        onPress={() => goToPage(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight width={16} height={16} />
      </Button>
    </div>
  );
}
