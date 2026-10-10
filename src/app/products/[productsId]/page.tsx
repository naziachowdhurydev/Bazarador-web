import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
}

interface ProductPageProps {
  params: Promise<{ productsId: string }>;
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

async function ProductDetails({ params }: ProductPageProps) {
  const { productsId } = await params;
  const productId = Number(productsId);

  if (!Number.isInteger(productId) || productId < 1) {
    notFound();
  }

  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product details: HTTP ${response.status}`);
  }

  const product: Product | null = await response.json();

  if (!product || product.id !== productId) {
    notFound();
  }

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
  const marketMin = Math.min(...product.markets.map((market) => market.min));
  const marketMax = Math.max(...product.markets.map((market) => market.max));

  return (
    <main className="flex-1 bg-[#f0f5f0] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#5b645f] sm:mb-5 sm:text-base"
        >
          <Link
            href="/"
            className="rounded-sm hover:text-[#16834b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
          >
            হোম
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/#all-products"
            className="rounded-sm hover:text-[#16834b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
          >
            সব পণ্য
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/category/${product.category}`}
            className="rounded-sm hover:text-[#16834b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
          >
            {product.categoryNameBn}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-semibold text-[#171b18]">
            {product.nameBn}
          </span>
        </nav>

        <section className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf4ee] text-3xl sm:size-16 sm:text-4xl"
              >
                {product.image}
              </span>
              <div className="min-w-0">
                <Link
                  href={`/category/${product.category}`}
                  className="text-sm font-semibold text-[#16834b] hover:underline sm:text-base"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <h1 className="mt-0.5 text-2xl leading-tight font-bold text-[#171b18] sm:text-3xl">
                  {product.nameBn}
                </h1>
                <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
                  {formatUnit(product.unit)} বাজারদর
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:min-w-40 sm:flex-col sm:items-start sm:gap-1">
              <span className="text-sm text-[#5b645f] sm:text-base">
                আজকের দাম
              </span>
              <div className="text-right sm:text-left">
                <p className="text-xl font-bold text-[#171b18] sm:text-2xl">
                  {priceFormatter.format(product.today)} টাকা
                </p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold sm:text-sm ${changeColor}`}
                >
                  <span aria-hidden="true">{changeIcon}</span>
                  {percentageFormatter.format(
                    Math.abs(product.change.pct),
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="দামের সারাংশ"
          className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { label: "আজকের দাম", value: product.today },
            { label: "গতকালের দাম", value: product.yesterday },
            { label: "গত সপ্তাহের দাম", value: product.lastWeek },
            { label: "গত মাসের দাম", value: product.lastMonth },
          ].map((price) => (
            <div
              key={price.label}
              className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:p-5"
            >
              <p className="text-sm text-[#5b645f] sm:text-base">
                {price.label}
              </p>
              <p className="mt-1 text-lg font-bold text-[#171b18] sm:text-xl">
                {priceFormatter.format(price.value)} টাকা
              </p>
              <p className="text-xs text-[#737c76] sm:text-sm">
                {formatUnit(product.unit)}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-5 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:mt-6 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#171b18] sm:text-2xl">
              বাজারভিত্তিক দাম
            </h2>
            <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
              বিভিন্ন বাজারে {formatUnit(product.unit)} সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 sm:max-w-md">
            <div className="rounded-xl bg-[#edf8f1] p-3 sm:p-4">
              <p className="text-sm text-[#5b645f] sm:text-base">
                সর্বনিম্ন বাজারদর
              </p>
              <p className="mt-1 text-lg font-bold text-[#16834b] sm:text-xl">
                {priceFormatter.format(marketMin)} টাকা
              </p>
            </div>
            <div className="rounded-xl bg-[#fff5ef] p-3 sm:p-4">
              <p className="text-sm text-[#5b645f] sm:text-base">
                সর্বোচ্চ বাজারদর
              </p>
              <p className="mt-1 text-lg font-bold text-[#c45b22] sm:text-xl">
                {priceFormatter.format(marketMax)} টাকা
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#dfe7e0]">
            <table className="w-full min-w-120 border-collapse text-left text-sm sm:text-base">
              <thead className="bg-[#f0f5f0] text-[#465149]">
                <tr>
                  <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                    বাজার
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                    বিভাগ
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right font-semibold sm:px-4"
                  >
                    সর্বনিম্ন
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right font-semibold sm:px-4"
                  >
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ece7]">
                {product.markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <th
                      scope="row"
                      className="px-3 py-3 font-medium text-[#171b18] sm:px-4"
                    >
                      {market.market}
                    </th>
                    <td className="px-3 py-3 text-[#5b645f] sm:px-4">
                      {market.division}
                    </td>
                    <td className="px-3 py-3 text-right text-[#16834b] sm:px-4">
                      {priceFormatter.format(market.min)} টাকা
                    </td>
                    <td className="px-3 py-3 text-right text-[#171b18] sm:px-4">
                      {priceFormatter.format(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductDetailsLoading() {
  return (
    <main className="flex-1 bg-[#f0f5f0] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-5 h-5 w-64 rounded bg-[#dfe7e0]" />
        <div className="h-32 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb]" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb]"
            />
          ))}
        </div>
        <div className="mt-5 h-80 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb]" />
      </div>
    </main>
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetails {...props} />
    </Suspense>
  );
}
