"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  yestarday: string;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const priceFormatter = new Intl.NumberFormat("bn-BD");
const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

const formatUnit = (unit: string, productName: string) => {
  if (productName.includes("তেল") || productName.includes("তৈল")) {
    return "প্রতি লিটার";
  }

  switch (unit.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";

    case "litre":
    case "liter":
      return "প্রতি লিটার";

    case "piece":
      return "প্রতি পিস";

    case "dozen":
      return "প্রতি ডজন";

    default:
      return `প্রতি ${unit}`;
  }
};

const MostLessProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products with falling prices");
        }

        const data: Product[] = await res.json();
        const lowestPriceProducts = data
          .filter((product) => product.change.dir === "down")
          .sort((first, second) => second.change.pct - first.change.pct)
          .slice(0, 6);

        setProducts(lowestPriceProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f0f5f0] px-4 pb-10 pt-5 sm:px-6 sm:pb-12">
        <div className="mx-auto max-w-295">
          <div className="mb-4 h-9 w-48 animate-pulse rounded-md bg-[#dfe7e0]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-36.5 animate-pulse rounded-[1.45rem] border border-[#dfe7e0] bg-[#f6f8f6]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="most-less-products"
      aria-labelledby="most-less-products-title"
      className="bg-[#f0f5f0] px-4 pb-10 pt-5 sm:px-6 sm:pb-12"
    >
      <div className="mx-auto max-w-295">
        <h2
          id="most-less-products-title"
          className="mb-4 flex items-center gap-2 text-xl font-bold text-[#171b18] sm:text-2xl"
        >
          <span aria-hidden="true" className="text-[#15803d] text-base">
            ▼
          </span>
          আজ দাম কমছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-[1.45rem] border border-[#dfe7e0] bg-[#f6f8f6] p-4 shadow-[0_1px_0_rgba(18,28,22,0.02)] transition-colors hover:border-[#7db398] sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf4ee] text-2xl sm:size-14"
                >
                  {product.image}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg leading-snug font-bold text-[#171b18]">
                    {product.nameBn}
                  </h3>

                  <p className="text-sm text-[#5b645f]">
                    {formatUnit(product.unit, product.nameBn)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-[#5b645f]">আজকের দাম</p>
                  <p className="text-[1rem] font-semibold text-[#171b18] sm:text-[1.15rem]">
                    {priceFormatter.format(product.today)} টাকা
                  </p>
                </div>

                <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#edf8f1] px-2.5 py-1 text-sm font-semibold text-[#1a8a50] sm:text-[0.95rem]">
                  <span aria-hidden="true">▼</span>
                  <span>
                    {percentageFormatter.format(Math.abs(product.change.pct))}%
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostLessProduct;
