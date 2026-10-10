"use client";

import { useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type SortOrder = "default" | "price-asc" | "price-desc" | "change-desc";

interface CategoryProductListProps {
  categoryName: string;
  products: Product[];
}

const priceFormatter = new Intl.NumberFormat("bn-BD");
const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

const formatUnit = (unit: string) => {
  switch (unit.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
};

export default function CategoryProductList({
  categoryName,
  products,
}: CategoryProductListProps) {
  const [sort, setSort] = useState<SortOrder>("default");
  const sortedProducts = [...products].sort((first, second) => {
    switch (sort) {
      case "price-asc":
        return first.today - second.today;
      case "price-desc":
        return second.today - first.today;
      case "change-desc":
        return Math.abs(second.change.pct) - Math.abs(first.change.pct);
      default:
        return first.id - second.id;
    }
  });

  return (
    <section className="mt-7 sm:mt-9">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#171b18] sm:text-2xl">
            {categoryName}র সব পণ্য
          </h2>
          <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
            আজকের বাজারদর ও গতকালের তুলনা
          </p>
        </div>
        <label className="flex flex-wrap items-center gap-2 text-sm text-[#5b645f] sm:text-base">
          <span>সাজান</span>
          <select
            name="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
            className="min-h-11 min-w-36 rounded-xl border border-[#d5ded6] bg-[#fafcfb] px-3 text-sm text-[#171b18] outline-none focus-visible:border-[#16834b] focus-visible:ring-2 focus-visible:ring-[#16834b]/20 sm:text-base"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
            <option value="change-desc">পরিবর্তন: বেশি</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const changeColor =
            product.change.dir === "up"
              ? "bg-[#fff0ef] text-red-600"
              : product.change.dir === "down"
                ? "bg-[#edf8f1] text-[#16834b]"
                : "bg-[#f0f2f0] text-[#66716a]";
          const changeIcon =
            product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—";

          return (
            <article
              key={product.id}
              className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 shadow-[0_1px_0_rgba(18,28,22,0.02)] transition-colors hover:border-[#7db398] sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf4ee] text-2xl sm:size-14"
                >
                  {product.image}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-snug font-bold text-[#171b18] sm:text-xl">
                    {product.nameBn}
                  </h3>
                  <p className="text-sm text-[#5b645f] sm:text-base">
                    {formatUnit(product.unit)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-[#5b645f] sm:text-base">
                    আজকের দাম
                  </p>
                  <p className="text-lg font-semibold text-[#171b18] sm:text-xl">
                    {priceFormatter.format(product.today)} টাকা
                  </p>
                  <p className="mt-0.5 text-xs text-[#737c76] sm:text-sm">
                    গতকাল {priceFormatter.format(product.yesterday)} টাকা
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold sm:text-base ${changeColor}`}
                >
                  <span aria-hidden="true">{changeIcon}</span>
                  <span>
                    {percentageFormatter.format(
                      Math.abs(product.change.pct),
                    )}
                    %
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
