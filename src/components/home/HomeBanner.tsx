"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

type HomeBannerProps = {
  title: string;
  description: string;
};

const HomeBanner = ({
  title,
  description,
}: HomeBannerProps): React.ReactNode => {
  const { data: session, status } = useSession();

  return (
    <div className="w-full flex  items-stretch gap-x-10">
      <div className="w-[60%] grid grid-cols-3 lg:hidden gap-1">
        <img
          src="./images/grid-1.jpg"
          alt="grid-1"
          className="col-start-1 col-end-3 w-full h-[250px] rounded-md object-cover"
        />
        <img
          src="./images/grid-2.jpg"
          alt="grid-2"
          className="col-start-3 col-end-4 w-full h-[250px] rounded-md object-cover"
        />
        <img
          src="./images/grid-3.jpg"
          alt="grid-3"
          className="col-start-1 col-end-4 w-full h-[250px] rounded-md object-cover"
        />
      </div>
      <div className="flex-1 sm:w-full mt-3 text-center flex flex-col justify-center">
        <h1 className="font-extrabold text-transparent  text-4xl sm:text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          SHARING ONLINE IMAGES <br /> COMMUNITY
        </h1>
        <p className="text-sm mt-3  px-5 sm:px-2 sm:text-sm text-gray-500 font-medium">
          Create and Generate your image , put in the community and share with
          other peoples.
        </p>
        {status === "authenticated" ? (
          <Link
            href="/create"
            className="mt-10 p-3 bg-indigo-500 text-white text-sm font-semibold rounded-md"
          >
            Share Image
          </Link>
        ) : (
          <Link
            className="mt-10 p-3 bg-indigo-500 text-white text-sm font-semibold rounded-md"
            href="/login"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
