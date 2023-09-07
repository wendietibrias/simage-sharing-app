import { LoginForm } from "@/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SIMAGE | Login",
  icons: {
    icon: "./favicon.ico",
  },
};

const Login = (): React.ReactNode => {
  return (
    <div className="w-[600px] sm:w-full flex flex-col">
      <div className="text-center mb-10">
        <Link
          className="font-extrabold text-transparent text-4xl sm:text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600"
          href="/"
        >
          <span className="font-extrabold  uppercase">SIMAGE</span>
        </Link>
        <h4 className="text-gray-700 font-bold text-2xl sm:text-xl mt-3">
          Sign in to your account
        </h4>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
