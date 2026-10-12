"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialProvider, setSocialProvider] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message ?? "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (signInError) {
      console.error("Failed to sign in:", signInError);
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError("");
    setSocialProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message ??
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`,
        );
      }
    } catch (socialError) {
      console.error(`Failed to sign in with ${provider}:`, socialError);
      setError(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`,
      );
    } finally {
      setSocialProvider("");
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6 sm:py-14">
      <div className="w-full max-w-md">
        <header className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold text-[#171b18] sm:text-3xl">
            সাইন ইন
          </h1>
          <p className="mt-1 text-sm text-[#5b645f] sm:text-base">
            বাজারদর দেখতে ও পছন্দের তালিকা দেখতে অ্যাকাউন্টে ঢুকুন
          </p>
        </header>

        <div className="card border border-[#dfe7e0] bg-[#fafcfb] shadow-sm">
          <div className="card-body gap-4 p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="form-control w-full gap-1.5">
                <span className="label-text text-sm font-medium text-[#303832] sm:text-base">
                  ইমেইল
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="input input-bordered h-11 w-full rounded-[10px] border-2 border-gray-400 bg-[#fafcfb] text-sm text-[#171b18] placeholder:px-1.5 placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 sm:text-base"
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
                  autoComplete="current-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="input input-bordered h-11 w-full rounded-[10px] border-2 border-gray-400 bg-[#fafcfb] text-sm text-[#171b18] placeholder:px-1.5 placeholder:text-[#8a938c] focus:border-gray-700 focus:outline-gray-700 sm:text-base"
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
                    সাইন ইন হচ্ছে
                  </>
                ) : (
                  "সাইন ইন"
                )}
              </button>
            </form>

            <div className="divider my-0 text-sm text-[#737c76]">অথবা</div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="btn btn-outline min-h-11 border-[#dfe7e0] bg-[#fafcfb] text-sm font-medium text-[#303832] hover:border-[#b9c8bc] hover:bg-[#f0f5f0] sm:text-base"
                onClick={() => handleSocialSignIn("google")}
                disabled={isSubmitting || socialProvider !== ""}
              >
                {socialProvider === "google" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
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
                Google দিয়ে লগইন
              </button>

              <button
                type="button"
                className="btn btn-outline min-h-11 border-[#dfe7e0] bg-[#fafcfb] text-sm font-medium text-[#303832] hover:border-[#b9c8bc] hover:bg-[#f0f5f0] sm:text-base"
                onClick={() => handleSocialSignIn("github")}
                disabled={isSubmitting || socialProvider !== ""}
              >
                {socialProvider === "github" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                  >
                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.48 3.55 1.76.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                  </svg>
                )}
                GitHub দিয়ে লগইন
              </button>
            </div>

            <p className="text-center text-sm text-[#5b645f] sm:text-base">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#05893e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]"
              >
                সাইন আপ করুন
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
