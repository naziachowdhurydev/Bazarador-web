//
import Link from "next/link";
import React from "react";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Navs[] = await res.json();

  return (
    <nav className="mx-auto mt-4 w-full max-w-7xl px-3 sm:mt-5 sm:px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {navs.map((n) => (
          <Link
            key={n.id}
            href={`/${n.slug}`}
            className="flex items-center gap-1 rounded-2xl border border-transparent px-3 py-2 text-md font-semibold text-neutral-700 transition hover:border-gray-300 hover:bg-gray-300 hover:font-bold sm:px-4"
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
