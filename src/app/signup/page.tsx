"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message ??
            "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (submissionError) {
      console.error("Failed to create account:", submissionError);
      setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6 sm:py-14">
      <div className="w-full max-w-md">
        <header className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold text-[#171b18] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
            নিজের বাজারের দাম দেখে সঠিক দামে পণ্য কিনুন
          </p>
        </header>

        <div className="card border border-[#dfe7e0] bg-[#fafcfb] shadow-sm">
          <div className="card-body gap-4 p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="form-control w-full gap-1.5 ">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  নাম
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: রহিম উদ্দিন"
                  className="input input-bordered h-11 w-full border-gray-400 rounded-[10px] border-2 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 placeholder:px-1.5 sm:text-base"
                  required
                />
              </label>

              <label className="form-control w-full gap-1.5">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  ইমেইল
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="input input-bordered h-11 w-full border-gray-400 rounded-[10px] border-2 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 placeholder:px-1.5 sm:text-base"
                  required
                />
              </label>

              <label className="form-control w-full gap-1.5">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  পাসওয়ার্ড
                </span>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  minLength={8}
                  className="input input-bordered h-11 w-full border-gray-400 rounded-[10px] border-2 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 placeholder:px-1.5 sm:text-base"
                  required
                />
              </label>

              <label className="form-control w-full gap-1.5">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  পাসওয়ার্ড নিশ্চিত করুন
                </span>
                <input
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  minLength={8}
                  className="input input-bordered h-11 w-full border-gray-400 rounded-[10px] border-2 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 placeholder:px-1.5 sm:text-base"
                  required
                />
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-[#fff0ef] px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-success mt-1 min-h-11 w-full border-0 bg-[#05893e] text-sm font-semibold text-white hover:bg-[#047333] sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    অ্যাকাউন্ট তৈরি হচ্ছে
                  </>
                ) : (
                  "অ্যাকাউন্ট তৈরি করুন"
                )}
              </button>
            </form>

            <div className="divider my-0 text-sm text-[#737c76]">অথবা</div>

            <p className="text-center text-sm text-[#5b645f] sm:text-base">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-semibold text-[#05893e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-sm sm:mt-6 sm:text-base">
          <Link
            href="/"
            className="text-[#737c76] hover:text-[#16834b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}
