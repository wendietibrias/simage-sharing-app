"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useQuery, QueryClient, useInfiniteQuery } from "react-query";
import { useState } from "react";
import { getAllUnplashPhotos } from "@/api/unsplash.api";
import { AiOutlineCloudDownload } from "react-icons/ai";
import LoadingSpinner from "../LoadingSpinner";
import Link from "next/link";

const ExampleImageSection = (): React.ReactNode => {
  const [page, setPage] = useState<number>(1);

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [{ page }],
    queryFn: () => getAllUnplashPhotos(page),
    keepPreviousData: false,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading && isFetching) {
    return (
      <div className="w-full flex justify-center items-center flex-col h-full">
        <LoadingSpinner width={21} height={21} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-[17px] mb-5 text-gray-700 font-bold">
        Inspiration Images
      </h2>
      <div className="mt-5">
        {data && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 560: 2, 750: 2, 900: 3 }}
          >
            <Masonry>
              {data.map((item: any, idx: number) => (
                <div
                  className="relative overflow-hidden cursor-pointer m-1 group"
                  key={idx}
                >
                  <img
                    src={item.urls.small}
                    className="w-full rounded-lg"
                    alt={item.slug}
                  />
                  <div className="w-full group-hover:bottom-0 transition-all p-3 duration-500 rounded-lg flex flex-col justify-end absolute bottom-[-100%] left-0 h-full bg-gray-800/50">
                    <p className="text-white text-[13px] font-medium mb-2">
                      {item.alt_description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-2">
                        <img
                          src={item.user.profile_image.small}
                          alt={item.user.name}
                          className="w-[38px] h-[38px] rounded-full"
                        />
                        <h5 className="text-white  text-sm font-semibold">
                          {item.user.name}
                        </h5>
                      </div>
                      <Link href={item.links.download}>
                        <AiOutlineCloudDownload className="text-xl text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        {isFetching && isLoading && (
          <div className="w-full flex justify-center items-center">
            <LoadingSpinner width={18} height={18} color="#6366f1" />
          </div>
        )}
      </div>
      <div className="text-center mt-10 flex justify-center items-center gap-x-4">
        <button
          onClick={() => setPage(page <= 1 ? 1 : page - 1)}
          className="p-2 rounded-md bg-indigo-500 text-white font-semibold text-[13px]"
        >
          Previous
        </button>
        <span className="text-lg text-gray-700 font-semibold">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="p-2 rounded-md bg-indigo-500 text-white font-semibold text-[13px]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExampleImageSection;
