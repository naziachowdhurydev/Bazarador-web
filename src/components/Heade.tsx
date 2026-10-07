"use client";
import Image from "next/image";
import logoIcon from "../assets/logo-icon.png";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
  return (
    <header className="flex justify-between container mx-auto px-4 py-4">
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <div className="bg-[#05893E] p-4 rounded-2xl flex items-center justify-center">
          <Image src={logoIcon} alt="Logo" width={23} height={20} />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl font-bold ">বাজার দর</span>
          <span className="text-xs text-neutral-500">{date}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-2 sm:right-4 sm:top-4 sm:w-auto md:right-4 lg:right-30 mt-4 sm:mt-0">
        <button className="btn btn-ghost font-bold p-3 text-sm text-neutral-700 transition-colors sm:px-3 hover:bg-gray-300 hover:rounded-2xl">
          সাইন ইন
        </button>

        <button className="btn bg-[#05893E] rounded-2xl p-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 sm:px-4">
          সাইন আপ
        </button>
      </div>
    </header>
  );
};

export default Header;
