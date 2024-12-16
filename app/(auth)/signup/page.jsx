import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Logo Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <img
            alt="logo"
            src="/logo.jpg"
            className="mx-auto h-12 w-auto cursor-pointer"
          />
        </Link>
        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign Up to Meheta Electronics
        </h2>
      </div>

      {/* Form Section */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form action="#" method="POST" className="space-y-6">
          {/* Email Input */}
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
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900
                 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border
                 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400
                  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="">
              <Link href={'/signin'}>
            <h6 className="text-blue-700 gap-2 py-1 text-xs"> Already have an accoun? Click to Login!</h6>
            </Link>
          </div>
          </div>

          

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md
               bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm
                hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6 space-y-4">
          {/* Google Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border
             border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 
             shadow-sm hover:bg-gray-50"
          >
            <img
              src="google.png"
              alt="Google Logo"
              className="h-7 w-9 bg-transparent"
            />
            Sign Up with Google
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border
             border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <img
              src="/github.png"
              alt="GitHub Logo"
              className="h-7 w-10 bg-transparent"
            />
            Sign Up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}


