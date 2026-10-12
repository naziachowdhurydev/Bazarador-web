"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryNavItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
      {items.map((item) => {
        const isActive = pathname === `/category/${item.slug}`;

        return (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-1 rounded-2xl border px-3 py-2 text-md font-semibold transition sm:px-4 ${
              isActive
                ? "border-[#05893e] bg-[#05893e] text-white shadow-sm"
                : "border-transparent text-neutral-700 hover:border-gray-300 hover:bg-gray-100 hover:text-[#047333]"
            }`}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}
