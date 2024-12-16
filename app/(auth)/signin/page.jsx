"use client";
import { auth } from "@/lib/auth/firebase";
import { GithubAuthProvider,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  const [isLoading, SetIsLoading] = useState(false);

  //for google authentication
  const handleGoogleLogin = async () => {
    SetIsLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      console.log("User signed in:", user);
      toast.success(`Welcome ${user.displayName || "User"}!`);
    } catch (error) {
      toast.error(error?.message || "Failed to sign in with Google.");
    }
    SetIsLoading(false);
  };


  //for github authentication
  const handleGithubLogin = async () => {
    SetIsLoading(true);
    try {
      const result = await signInWithPopup(auth, new GithubAuthProvider());
      const user = result.user;
      console.log("User signed in:", user);
      toast.success(`Welcome ${user.displayName || "User"}!`);
    } catch (error) {
      toast.error(error?.message || "Failed to sign in with Github.");
    }
    SetIsLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <img
            alt="logo"
            src="/logo.jpg"
            className="mx-auto h-10 w-auto cursor-pointer"
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Form Section */}
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base
                  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300
                   placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2
                   focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base
                  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300
                   placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            <div className="gap-4">
              <Link href={"/signup"}>
              <h6 className="text-blue-700 text-xs gap-2 py-1 ">New? Create an Account!</h6>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md
               bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Social Login Buttons */}
        {/* Added onClick directly here on line 232 */}
        <div className="mt-6 space-y-4">

          <button
            type="button"

            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md
              border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700
               shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="google.png"
              alt="Google Logo"
              className="h-7 w-8 bg-transparent"
            />
            Continue with Google
          </button>


          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md
              border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700
               shadow-sm hover:bg-gray-50"
          >
            <img
              src="/github.png"
              alt="GitHub Logo"
              className="h-7 w-10 bg-transparent"
            />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
