interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
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

const MostHighProduct = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products with rising prices");
  }

  const products: Product[] = await res.json();
  const topRisingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((first, second) => second.change.pct - first.change.pct)
    .slice(0, 6);

  if (topRisingProducts.length === 0) {
    return null;
  }

  return (
    <section
      id="most-high-products"
      aria-labelledby="most-high-products-title"
      className="bg-[#f0f5f0] px-4 pb-10 pt-5 sm:px-6 sm:pb-12"
    >
      <div className="mx-auto max-w-297">
        <h2
          id="most-high-products-title"
          className="mb-4 flex items-center gap-2 text-xl font-bold text-[#171b18] sm:text-2xl"
        >
          <span aria-hidden="true" className="text-base text-red-600">
            ▲
          </span>
          আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {topRisingProducts.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 hover:border-green-600"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl"
                >
                  {product.image}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-lg leading-snug font-bold text-[#171b18]">
                    {product.nameBn}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {formatUnit(product.unit)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-neutral-500">আজকের দাম</p>
                  <p className="text-lg font-semibold text-[#171b18]">
                    {priceFormatter.format(product.today)} টাকা
                  </p>
                </div>
                <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2.5 py-1 text-sm font-semibold text-red-600">
                  <span aria-hidden="true">▲</span>
                  <span>{percentageFormatter.format(product.change.pct)}%</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostHighProduct;
