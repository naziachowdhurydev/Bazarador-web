import Image from "next/image";
import logoIcon from "../assets/logo-icon.png";
import NavLinks from "./NavLinks";
import { Suspense } from "react";
import Marquee from "./Marquee";
import CurrentDate from "./CurrentDate";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header>
      <div className="relative container mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + Website Name */}
        <Link href="/">
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
        </Link>

        {/* Sign In / Sign Up */}
        <UserInfo />
      </div>

      <Suspense fallback={null}>
        <NavLinks />
      </Suspense>

      <Suspense fallback="Loading...">
        <Marquee />
      </Suspense>
    </header>
  );
};

export default Header;
