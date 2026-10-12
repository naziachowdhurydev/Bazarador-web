"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    try {
      const result = await authClient.signOut();
      if (result.error) {
        const message =
          result.error.message ?? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।";
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
    } catch (signOutError) {
      console.error("Failed to sign out:", signOutError);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="absolute right-2 top-2 flex items-center gap-2 text-sm sm:right-4 sm:top-4 sm:gap-3 md:right-6 md:top-1/2 md:-translate-y-1/3">
      {user ? (
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 ">
          <Link href={"/profile"}>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2 sm:w-10">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="User profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <h2 className="text-sm font-bold sm:text-md">{user.name}</h2>

            <button
              onClick={handleSignOut}
              className="btn btn-error btn-xs mt-1 text-sm text-white sm:text-[14px]"
            >
              সাইন আউট
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link href="/signin">
            <button className="rounded-2xl px-2.5 py-1.5 text-xs font-bold text-neutral-700 transition-colors hover:bg-gray-300 sm:px-3 sm:py-2 sm:text-sm">
              সাইন ইন
            </button>
          </Link>

          <Link href="/signup">
            <button className="rounded-2xl bg-[#05893E] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-800 sm:px-4 sm:py-2 sm:text-sm">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
