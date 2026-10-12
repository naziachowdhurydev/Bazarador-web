"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialProvider, setSocialProvider] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const image = String(formData.get("image") ?? "").trim();
      const password = String(formData.get("password") ?? "");
      const confirmPassword = String(formData.get("confirmPassword") ?? "");

      if (password !== confirmPassword) {
        const message = "দুটি পাসওয়ার্ড মিলছে না।";
        setError(message);
        toast.error(message);
        return;
      }

      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      if (result.error) {
        console.error("Signup error:", result.error);
        if (result.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          toast.error("User already exists. Use another email.");
          return;
        }

        const message =
          result.error.message ??
          "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";
        setError(message);
        toast.error(message);
        return;
      }

      console.log("Signup successful:", result.data);

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Signup request failed:", err);
      const message = "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setError("");
    setSocialProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message ??
          `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ করা যায়নি।`;
        setError(message);
        toast.error(message);
        return;
      }

      toast.success(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ সফল হয়েছে।`,
      );
    } catch (socialSignUpError) {
      console.error(`Failed to sign up with ${provider}:`, socialSignUpError);
      const message = `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ করা যায়নি। আবার চেষ্টা করুন।`;
      setError(message);
      toast.error(message);
    } finally {
      setSocialProvider("");
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
                  প্রোফাইল ছবি
                </span>

                <input
                  name="image"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  className="input input-bordered h-11 w-full rounded-[10px] border-2 border-gray-400 bg-[#fafcfb] text-sm text-[#171b18] placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 sm:text-base"
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
                disabled={isSubmitting || socialProvider !== ""}
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

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
              <button
                type="button"
                className="btn btn-outline flex min-h-11 w-full min-w-0 flex-nowrap justify-center gap-2 border-[#dfe7e0] bg-[#fafcfb] px-2 text-xs font-medium text-[#303832] hover:border-[#b9c8bc] hover:bg-[#f0f5f0] sm:text-sm"
                onClick={() => handleSocialSignUp("google")}
                disabled={isSubmitting || socialProvider !== ""}
              >
                {socialProvider === "google" ? (
                  <span className="loading loading-spinner loading-sm shrink-0" />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.85 6.05l3.69 2.84C6.71 7.29 9.14 5.36 12 5.36Z"
                    />
                  </svg>
                )}
                <span className="whitespace-nowrap">Google দিয়ে সাইন আপ</span>
              </button>

              <button
                type="button"
                className="btn btn-outline flex min-h-11 w-full min-w-0 flex-nowrap justify-center gap-2 border-[#dfe7e0] bg-[#fafcfb] px-2 text-xs font-medium text-[#303832] hover:border-[#b9c8bc] hover:bg-[#f0f5f0] sm:text-sm"
                onClick={() => handleSocialSignUp("github")}
                disabled={isSubmitting || socialProvider !== ""}
              >
                {socialProvider === "github" ? (
                  <span className="loading loading-spinner loading-sm shrink-0" />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0 fill-current"
                  >
                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.48 3.55 1.76.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                  </svg>
                )}
                <span className="whitespace-nowrap">GitHub দিয়ে সাইন আপ</span>
              </button>
            </div>

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
