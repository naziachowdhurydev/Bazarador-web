import { Suspense } from "react";
import CategoryProductList from "@/components/CategoryProductList";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
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

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

const priceFormatter = new Intl.NumberFormat("bn-BD");
const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

const CategoryContent = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: Product[] = await res.json();
  const categoryProducts = products.filter(
    (product) => product.category === categoryId,
  );
  const category = categoryProducts[0];

  if (!category) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-20">
        <div className="text-center">
          <p className="text-5xl" aria-hidden="true">
            🔎
          </p>
          <h1 className="mt-4 text-2xl font-bold text-[#171b18] sm:text-3xl">
            এই বিভাগটি পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-base text-[#5b645f] sm:text-lg">
            অন্য একটি বিভাগ নির্বাচন করে আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

  const totalProducts = priceFormatter.format(categoryProducts.length);
  const averagePrice =
    categoryProducts.reduce((total, product) => total + product.today, 0) /
    categoryProducts.length;
  const averageChange =
    categoryProducts.reduce((total, product) => total + product.change.pct, 0) /
    categoryProducts.length;
  const trendColor =
    averageChange > 0
      ? "text-red-600"
      : averageChange < 0
        ? "text-[#16834b]"
        : "text-[#66716a]";
  const trendIcon = averageChange > 0 ? "▲" : averageChange < 0 ? "▼" : "—";
  return (
    <main className="flex-1 bg-[#f0f5f0] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-5xl">
        <section className="flex items-center gap-4 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:gap-5 sm:p-6">
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf4ee] text-3xl sm:size-16 sm:text-4xl"
          >
            {category.categoryIcon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#16834b] sm:text-base">
              বাজারদর / {category.categoryNameBn}
            </p>
            <h1 className="mt-0.5 text-2xl leading-tight font-bold text-[#171b18] sm:text-3xl">
              {category.categoryNameBn}
            </h1>
            <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
              {totalProducts}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <section
          aria-label="বিভাগের সারাংশ"
          className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4"
        >
          <div className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:p-5">
            <p className="text-sm text-[#5b645f] sm:text-base">মোট পণ্য</p>
            <p className="mt-1 text-xl font-bold text-[#171b18] sm:text-2xl">
              {totalProducts}টি
            </p>
          </div>
          <div className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:p-5">
            <p className="text-sm text-[#5b645f] sm:text-base">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-[#171b18] sm:text-2xl">
              {priceFormatter.format(Math.round(averagePrice))} টাকা
            </p>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 sm:col-span-1 sm:p-5">
            <p className="text-sm text-[#5b645f] sm:text-base">গড় পরিবর্তন</p>
            <p className={`mt-1 text-xl font-bold sm:text-2xl ${trendColor}`}>
              <span aria-hidden="true">{trendIcon} </span>
              {percentageFormatter.format(Math.abs(averageChange))}%
            </p>
          </div>
        </section>

        <CategoryProductList
          categoryName={category.categoryNameBn}
          products={categoryProducts}
        />
      </div>
    </main>
  );
};

const CategoryLoading = () => (
  <main className="flex-1 bg-[#f0f5f0] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8">
    <div className="mx-auto max-w-5xl animate-pulse">
      <div className="h-24 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] sm:h-28" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb]"
          />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb]"
          />
        ))}
      </div>
    </div>
  </main>
);

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent {...props} />
    </Suspense>
  );
}
