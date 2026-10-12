export default function LoadingPage() {
  return (
    <main
      aria-label="পেজ লোড হচ্ছে"
      className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6 sm:py-14"
    >
      <section
        aria-live="polite"
        className="w-full max-w-md rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-6 text-center shadow-sm sm:p-9"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#05893e] text-white shadow-sm sm:size-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            className="size-8 sm:size-10"
          >
            <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M10 8v4m4-4v4m4-4v4" />
          </svg>
        </div>

        <h1 className="mt-5 text-xl font-bold text-[#171b18] sm:text-2xl">
          বাজার দর
        </h1>
        <p className="mt-2 text-sm text-[#5b645f] sm:text-base">
          আপনার জন্য তথ্য প্রস্তুত করা হচ্ছে
        </p>

        <div
          role="status"
          className="mt-6 flex items-center justify-center gap-3 text-sm font-medium text-[#05893e]"
        >
          <span className="loading loading-spinner loading-sm" />
          <span>লোড হচ্ছে...</span>
          <span className="sr-only">অনুগ্রহ করে অপেক্ষা করুন</span>
        </div>

        <div
          aria-hidden="true"
          className="mt-7 grid grid-cols-3 gap-2 sm:gap-3"
        >
          <div className="h-2.5 animate-pulse rounded-full bg-[#e4eee6] motion-reduce:animate-none" />
          <div className="h-2.5 animate-pulse rounded-full bg-[#e4eee6] motion-reduce:animate-none" />
          <div className="h-2.5 animate-pulse rounded-full bg-[#e4eee6] motion-reduce:animate-none" />
        </div>
      </section>
    </main>
  );
}
