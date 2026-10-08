import Image from "next/image";
import logoIcon from "../assets/logo-icon.png";
import NavLinks from "./NavLinks";
import { Suspense } from "react";
import Marquee from "./Marquee";
import Banner from "./Banner";
import CurrentDate from "./CurrentDate";
import MostHighProduct from "./MostHighProduct";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + Website Name */}
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <div className="flex items-center justify-center rounded-2xl bg-[#05893E] p-3 sm:p-4">
            <Image src={logoIcon} alt="Logo" width={23} height={20} />
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xl font-bold sm:text-2xl">বাজার দর</span>

            <span className="text-xs text-neutral-500">
              <CurrentDate />
            </span>
          </div>
        </div>

        {/* Sign In / Sign Up */}
        <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
          <button className="rounded-2xl px-3 py-2 text-sm font-bold text-neutral-700 transition-colors hover:bg-gray-300 sm:px-4">
            সাইন ইন
          </button>

          <button className="rounded-2xl bg-[#05893E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800 sm:px-5">
            সাইন আপ
          </button>
        </div>
      </div>

      <Suspense fallback={null}>
        <NavLinks />
      </Suspense>

      <Suspense fallback="Loading...">
        <Marquee />
      </Suspense>

      <Banner />
      <Suspense fallback={null}>
        <MostHighProduct />
      </Suspense>
    </header>
  );
};

export default Header;
