import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
}

const priceFormatter = new Intl.NumberFormat("bn-BD");
const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const formatUnit = (unit: string) => {
  switch (unit.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
    case "liter":
      return "লিটার";
    case "piece":
      return "টি";
    default:
      return unit;
  }
};

const ProductItems = ({
  products,
  duplicate = false,
}: {
  products: Product[];
  duplicate?: boolean;
}) => (
  <div
    aria-hidden={duplicate || undefined}
    className="flex shrink-0 items-center"
  >
    {products.map((product) => {
      const difference = product.today - product.yesterday;
      const change =
        product.yesterday > 0
          ? (Math.abs(difference) / product.yesterday) * 100
          : 0;
      const trendColor =
        difference > 0
          ? "text-red-600"
          : difference < 0
            ? "text-emerald-700"
            : "text-neutral-500";
      const trendIcon = difference > 0 ? "▲" : difference < 0 ? "▼" : "•";
      const trendLabel =
        difference > 0
          ? "দাম বেড়েছে"
          : difference < 0
            ? "দাম কমেছে"
            : "দাম অপরিবর্তিত";

      return (
        <div
          key={product.id}
          className="flex shrink-0 items-center gap-2 border-r border-emerald-100 px-3 py-2 text-sm sm:gap-2.5 sm:px-5"
        >
          <span aria-hidden="true" className="text-base">
            {product.categoryIcon}
          </span>
          <span className="whitespace-nowrap font-medium text-neutral-700">
            {product.nameBn}
          </span>
          <span className="whitespace-nowrap text-neutral-500">
            {priceFormatter.format(product.today)} ৳/{formatUnit(product.unit)}
          </span>
          <span
            aria-label={`${trendLabel}, ${percentageFormatter.format(change)} শতাংশ`}
            className={`whitespace-nowrap text-xs font-semibold ${trendColor}`}
          >
            {trendIcon} {percentageFormatter.format(change)}%
          </span>
        </div>
      );
    })}
  </div>
);

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const products: Product[] = (await res.json()).slice(0, 10);

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="আজকের বাজারদর"
      className="flex w-full items-stretch border-y border-emerald-100 bg-[#f8fbf8]"
    >
      <div className="market-marquee-window min-w-0 flex-1 overflow-hidden">
        <MarqueeText direction="right" duration={9}>
          <div className="market-marquee-track">
            <ProductItems products={products} />
          </div>
        </MarqueeText>
      </div>
    </section>
  );
};

export default Marquee;
