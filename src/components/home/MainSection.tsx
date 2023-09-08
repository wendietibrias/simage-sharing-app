"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useQuery, QueryClient, useInfiniteQuery } from "react-query";
import { AiOutlineSearch } from "react-icons/ai";
import { getAllImageCommunity } from "@/api/image.api";
import { IImagePromiseResponse } from "@/interfaces/imageResponse.interface";
import React, { useState, ChangeEvent } from "react";
import ImageCard from "./ImageCard";
import useDebounce from "@/hooks/useDebounce";
import LoadingSpinner from "../LoadingSpinner";

const MainSection = (): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 1500);

  const {
    isLoading,
    isFetchingNextPage,
    data,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["images-user", { debouncedSearch }],
    queryFn: ({ pageParam = 1 }) => getAllImageCommunity(pageParam, searchTerm),
    getNextPageParam: (prevData) => prevData.nextPage,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="w-full mt-10 flex justify-center items-center">
        <LoadingSpinner width={26} height={26} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg mb-5 text-gray-700 font-bold">
        Community Showcase
      </h2>
      <div className="w-full relative">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          type="text"
          name="search"
          placeholder="Search image..."
          className="w-full shadow-md shadow-gray-300 rounded-md p-3 text-sm outline-none border-none"
        />
        <AiOutlineSearch className="text-lg text-gray-500 absolute right-5 top-3"></AiOutlineSearch>
      </div>
      <div className="mt-10">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 560: 2, 750: 2, 900: 3 }}
        >
          <Masonry>
            {data?.pages
              .flatMap((item) => item.data)
              .map((item, idx) => (
                <ImageCard item={item} key={idx} />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <LoadingSpinner width={24} height={24} color="#6366f1" />
        </div>
      )}
      <div className="flex justify-center items-center">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="bg-indigo-500 mt-10 text-white font-semibold text-[13px] rounded-md p-3"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MainSection;
