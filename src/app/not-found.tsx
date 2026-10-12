import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7faf8] px-4">
      <div className="w-full max-w-2xl text-center">
        {/* 404 */}
        <div className="relative inline-block">
          <h1 className="text-[120px] font-extrabold leading-none tracking-tight text-[#05893E] sm:text-[180px]">
            404
          </h1>

          <div className="absolute -right-2 top-2 rounded-full bg-[#e3f3e8] px-4 py-2 text-sm font-semibold text-[#05893E] shadow-sm sm:-right-6 sm:top-5">
            Oops!
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-4 text-2xl font-bold text-[#171b18] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#66706a] sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। পেজটি হয়তো সরিয়ে
          ফেলা হয়েছে অথবা URL টি ভুল হতে পারে।
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-[#047333] hover:shadow-lg"
        >
          <span className="text-lg">←</span>
          হোম পেজে ফিরে যান
        </Link>

        {/* Bottom decoration */}
        <div className="mx-auto mt-12 flex max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-[#dce8df]" />

          <span className="text-sm font-semibold text-[#05893E]">বাজার দর</span>

          <div className="h-px flex-1 bg-[#dce8df]" />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
