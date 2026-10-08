import Image from "next/image";
import bazarHero from "../assets/bazar-hero.png";
import CurrentDate from "./CurrentDate";

const Banner = () => {
  return (
    <section
      aria-label="আজকের বাজারদর"
      className="bg-[#f0f5f0] px-4 py-7 sm:px-6"
    >
      <div className="mx-auto flex min-h-103 max-w-297 flex-col items-center justify-center gap-6 rounded-[26px] border border-[#dfe7e0] bg-[#fafcfb] px-4 py-8 sm:px-6 md:flex-row md:justify-between md:gap-8 md:py-10">
        <div className="w-full max-w-152.5">
          <p className="mb-3 inline-block rounded-full bg-[#e2f1e8] px-3 py-1 text-sm font-semibold text-[#05893e] sm:text-base">
            <CurrentDate />
          </p>
          <h1 className="text-[27px] leading-[1.35] font-bold text-[#171b18] sm:text-3xl md:text-[43px] md:leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-152.5 text-base leading-relaxed text-[#505750] sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তৃত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl border-2 border-white bg-[#05893e] px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#047333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05893e]"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        <Image
          src={bazarHero}
          alt="তাজা সবজিতে ভরা বাজারের ঝুড়ি"
          width={700}
          height={800}
        />
      </div>
    </section>
  );
};

export default Banner;
