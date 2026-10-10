import Link from "next/link";

interface Product {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
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

const AllProducts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch all products");
  }

  const products: Product[] = await response.json();

  return (
    <section
      id="all-products"
      aria-labelledby="all-products-title"
      className="bg-[#f0f5f0] px-4 pb-10 pt-5 sm:px-6 sm:pb-12"
    >
      <div className="mx-auto max-w-295">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2
              id="all-products-title"
              className="text-xl font-bold text-[#171b18] sm:text-2xl"
            >
              সব পণ্য
            </h2>
            <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
              আজকের বাজারদর ও দামের পরিবর্তন
            </p>
          </div>
          <p className="shrink-0 text-sm text-[#5b645f] sm:text-base">
            {priceFormatter.format(products.length)}টি পণ্য
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {products.map((product) => {
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
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  aria-label={`${product.nameBn}র বিস্তারিত দেখুন`}
                  className="block rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 shadow-[0_1px_0_rgba(18,28,22,0.02)] transition-colors hover:border-[#7db398] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b] sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf4ee] text-2xl sm:size-14"
                    >
                      {product.image}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg leading-snug font-bold text-[#171b18] sm:text-xl">
                        {product.nameBn}
                      </h3>
                      <p className="truncate text-sm text-[#5b645f] sm:text-base">
                        {product.categoryIcon} {product.categoryNameBn} ·{" "}
                        {formatUnit(product.unit)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-[#5b645f] sm:text-base">
                        আজকের দাম
                      </p>
                      <p className="text-base font-semibold text-[#171b18] sm:text-lg">
                        {priceFormatter.format(product.today)} টাকা
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold sm:px-2.5 sm:text-sm ${changeColor}`}
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
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] px-4 py-8 text-center text-base text-[#5b645f]">
            এখনো কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
