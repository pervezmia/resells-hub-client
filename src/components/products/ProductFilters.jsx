"use client";

import { Input, Select, ListBox, Surface, Button } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

const sortOptions = [
  { id: "", label: "Newest first" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
];

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1"); // filter বদলালে page 1-এ ফিরে যাবে

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search });
  };

  return (
    <Surface className="rounded-3xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative flex-1">
            <Magnifier
              width={16}
              height={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              aria-label="Search products by name"
              variant="secondary"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              isIconOnly
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              <Magnifier width={16} height={16} />
            </Button>
          </div>
        </form>

        <Select
          aria-label="Sort products by"
          placeholder="Sort by"
          selectedKey={searchParams.get("sort") || ""}
          onSelectionChange={(key) => updateParams({ sort: key })}
          className="sm:w-56"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {sortOptions.map((opt) => (
                <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                  {opt.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </Surface>
  );
}
