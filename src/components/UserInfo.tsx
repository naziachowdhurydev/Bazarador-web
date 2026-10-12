"use client";

import { authClient } from "@/lib/auth-client";
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
    <div className="absolute right-4 top-4 flex items-center gap-3 text-sm">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                src={user?.image as string}
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
          <h2>{user.name}</h2>

          <button
            onClick={handleSignOut}
            className="btn btn-error btn-xs text-white"
          >
            সাইন আউট
          </button>
          {/* <p>{user?.email}</p> */}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
          <Link href={"/signin"}>
            <button className="rounded-2xl px-3 py-2 text-sm font-bold text-neutral-700 transition-colors hover:bg-gray-300 sm:px-4">
              সাইন ইন
            </button>
          </Link>

          <Link href={"/signup"}>
            <button className="rounded-2xl bg-[#05893E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800 sm:px-5">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
