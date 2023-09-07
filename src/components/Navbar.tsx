"use client";
import Link from "next/link";
import navbarlink from "@/constants/navbarlink";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { data: session, status } = useSession();

  return (
    <nav className="w-full  py-3 bg-white shadow-sm  shadow-gray-300 sm:px-5">
      <div className="w-[85%] lg:w-[95%] sm:w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-x-7">
          <Link
            className="font-extrabold text-transparent sm:text-xl text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600"
            href="/"
          >
            <span className="font-extrabold  uppercase">SIMAGE</span>
          </Link>
          {status === "authenticated" && (
            <ul className="flex items-center sm:hidden gap-x-3">
              {navbarlink.map(
                (item: { title: string; path: string }, idx: number) => (
                  <li key={idx}>
                    <Link
                      className="text-[13px] font-semibold text-gray-500"
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="block relative">
          {status === "authenticated" ? (
            <div className="flex items-center">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-[38px] h-[38px] flex justify-center items-center font-bold rounded-full bg-indigo-500 uppercase text-white"
              >
                {session?.user?.name?.charAt(0)}
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-indigo-500 text-white font-semibold text-[13px] py-2 px-3 rounded-md">
                Sign In
              </button>
            </Link>
          )}

          {openDropdown && status === "authenticated" && (
            <div className="bg-white z-[99] absolute border border-gray-2 p-4  right-0 top-12 rounded-md shadow-sm shadow-gray-300 w-[300px]">
              <header className="w-full border-b border-gray-300 pb-2">
                <h5 className="text-sm font-semibold text-gray-700">
                  {session?.user?.name}
                </h5>
                <p className="text-[13px] font-medium text-gray-500">
                  {session?.user?.email}
                </p>
              </header>
              <ul className="sm:flex sm:flex-col sm:items-start  sm:gap-y-2 sm:mt-3 2xl:hidden">
                {navbarlink.map(
                  (item: { title: string; path: string }, idx: number) => (
                    <li key={idx}>
                      <Link
                        className="text-[13px] font-semibold text-gray-500"
                        href={item.path}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <div className="mt-3 sm:mt-5">
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                  className="flex items-center font-semibold text-[13px] gap-x-2"
                >
                  <AiOutlineLogout className="text-[17px]" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
