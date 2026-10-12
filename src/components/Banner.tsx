// import Image from "next/image";
// import Link from "next/link";
// import bazarHero from "../assets/bazar-hero.png";
// import CurrentDate from "./CurrentDate";

// const Banner = () => {
//   return (
//     <section
//       aria-label="আজকের বাজারদর"
//       className="bg-[#f0f5f0] px-4 py-7 sm:px-6"
//     >
//       <div className="mx-auto flex min-h-103 max-w-297 flex-col items-center justify-center gap-6 rounded-[26px] border border-[#dfe7e0] bg-[#fafcfb] px-4 py-8 sm:px-6 md:flex-row md:justify-between md:gap-8 md:py-10">
//         <div className="w-full max-w-152.5">
//           <p className="mb-3 inline-block rounded-full bg-[#e2f1e8] px-3 py-1 text-sm font-semibold text-[#05893e] sm:text-base">
//             <CurrentDate />
//           </p>
//           <h1 className="text-[27px] leading-[1.35] font-bold text-[#171b18] sm:text-3xl md:text-[43px] md:leading-tight">
//             আজকের বাজারের দাম এক নজরে
//           </h1>
//           <p className="mt-3 max-w-152.5 text-base leading-relaxed text-[#505750] sm:text-lg">
//             চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
//             বিস্তৃত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
//           </p>
//           <Link
//             href="/#all-products"
//             className="mt-6 inline-flex items-center rounded-xl border-2 border-white bg-[#05893e] px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#047333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05893e]"
//           >
//             সব পণ্য দেখুন
//           </Link>
//         </div>

//         <Image
//           src={bazarHero}
//           alt="তাজা সবজিতে ভরা বাজারের ঝুড়ি"
//           width={700}
//           height={800}
//         />
//       </div>
//     </section>
//   );
// };

// export default Banner;

import Image from "next/image";
import Link from "next/link";
import bazarHero from "../assets/bazar-hero.png";
import CurrentDate from "./CurrentDate";

const Banner = () => {
  return (
    <section
      aria-label="আজকের বাজারদর"
      className="bg-[#f0f5f0] px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="container mx-auto">
        <div className="flex min-h-125 flex-col items-center justify-center gap-8 rounded-[26px] border border-[#dfe7e0] bg-[#fafcfb] px-5 py-8 sm:px-8 md:min-h-112.5 md:flex-row md:justify-between md:gap-10 md:px-10 md:py-10 lg:px-12">
          {/* Content */}
          <div className="w-full text-center md:max-w-xl md:text-left lg:max-w-2xl">
            <p className="mb-3 inline-block rounded-full bg-[#e2f1e8] px-3 py-1 text-sm font-semibold text-[#05893e] sm:text-base">
              <CurrentDate />
            </p>

            <h1 className="text-[27px] leading-[1.35] font-bold text-[#171b18] sm:text-3xl md:text-[40px] md:leading-tight lg:text-[43px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#505750] sm:text-lg md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তৃত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/#all-products"
              className="mt-6 inline-flex items-center rounded-xl border-2 border-white bg-[#05893e] px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#047333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05893e]"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Image */}
          <div className="flex w-full items-center justify-center md:w-5/12 lg:w-2/5">
            <Image
              src={bazarHero}
              alt="তাজা সবজিতে ভরা বাজারের ঝুড়ি"
              width={700}
              height={800}
              className="h-auto w-full max-w-70 object-contain sm:max-w-82.5 md:max-w-90 lg:max-w-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
