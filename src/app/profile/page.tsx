"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [show, setShow] = useState(false);

  const handleUpdateProfile = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const updateData: {
        name: string;
        image?: string;
      } = {
        name,
      };

      // Only update image if user entered an image URL
      if (image) {
        updateData.image = image;
      }

      const result = await authClient.updateUser(updateData);

      if (result.error) {
        toast.error(result.error.message ?? "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    } catch (updateError) {
      console.error("Failed to update profile:", updateError);
      toast.error("প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message ?? "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/signin");
      router.refresh();
    } catch (signOutError) {
      console.error("Failed to sign out:", signOutError);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleShowForm = () => {
    setShow(!show);
  };

  if (isPending) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-12">
        <span className="loading loading-spinner loading-md text-[#05893e]" />
        <span className="sr-only">প্রোফাইল লোড হচ্ছে</span>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-12">
        <section className="w-full max-w-lg rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-6 text-center shadow-sm sm:p-10">
          <h1 className="text-xl font-bold text-[#171b18] sm:text-2xl">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>
          <p className="mt-2 text-sm text-[#5b645f] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য দেখতে প্রথমে সাইন ইন করতে হবে।
          </p>
          <Link
            href="/signin"
            className="btn mt-6 min-h-11 border-0 bg-[#05893e] px-6 text-white hover:bg-[#047333]"
          >
            সাইন ইন
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-1 justify-center bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-2xl">
        <header className="mb-5 sm:mb-7">
          <h1 className="text-2xl font-bold text-[#171b18] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        <section className="mb-4 flex flex-col gap-4 rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 shadow-sm sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={`${user.name} প্রোফাইল ছবি`}
                className="size-16 shrink-0 rounded-full object-cover ring-2 ring-[#dfe7e0] sm:size-20"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#e4f2e8] text-xl font-bold text-[#05893e] ring-2 ring-[#dfe7e0] sm:size-20 sm:text-2xl"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="wrap-break-word text-lg font-bold text-[#222a24] sm:text-xl">
                {user.name}
              </h2>
              <p className="break-all text-sm text-[#68716b] sm:text-base">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="btn btn-outline min-h-11 w-full shrink-0 border-red-300 bg-transparent text-sm font-semibold text-red-600 hover:border-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
          >
            {isSigningOut ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 17l5-5-5-5M15 12H3" />
                <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
              </svg>
            )}
            সাইন আউট
          </button>
        </section>

        <button
          onClick={handleShowForm}
          className="text-xl font-bold border px-3 py-4 bg-gray-200 border-gray-200 hover:bg-white hover:border-white rounded-2xl mb-6 "
        >
          এডিট প্রোফাইল
        </button>
        {show && (
          <section className="rounded-2xl border border-[#dfe7e0] bg-[#fafcfb] p-4 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold text-[#303832] sm:text-xl">
              অ্যাকাউন্টের তথ্য
            </h2>

            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col gap-4"
            >
              <label className="form-control w-full gap-2">
                <span className="text-sm font-medium text-[#303832] sm:text-base">
                  নাম
                </span>
                <input
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="input input-bordered h-11 w-full rounded-[10px] border border-[#dfe7e0] bg-[#fafcfb] text-sm text-[#171b18] focus:border-[#05893e] focus:outline-[#05893e] sm:text-base"
                />
              </label>

              <label className="form-control w-full gap-1.5">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  প্রোফাইল ছবি
                </span>

                <input
                  name="image"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  className="input input-bordered h-11 w-full rounded-[10px] border-2 border-gray-400 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 sm:text-base"
                />
              </label>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn mt-1 min-h-11 w-full border-0 bg-[#05893e] text-sm font-semibold text-white shadow-sm hover:bg-[#047333] sm:text-base"
              >
                {isUpdating ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    আপডেট হচ্ছে
                  </>
                ) : (
                  "আপডেট"
                )}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
