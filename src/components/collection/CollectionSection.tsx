"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getUserImageCollections } from "@/api/image.api";
import { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import LoadingSpinner from "../LoadingSpinner";
import CollectionImageCard from "./CollectionImageCard";
import { IImagePromiseResponse } from "@/interfaces/imageResponse.interface";

const CollectionSection = () => {
  const { isLoading, data, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: "user-collection",
    queryFn: ({ pageParam = 1 }) => getUserImageCollections(pageParam),
    getNextPageParam: (nextParam) => nextParam.nextPage,
    staleTime: 0,
  });

  if (isLoading && isFetching) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <LoadingSpinner width={26} height={26} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg text-gray-700 font-bold">Your Collections</h2>
      <div className="mt-7">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 560: 2, 750: 2, 900: 4 }}
        >
          <Masonry>
            {data?.pages
              .flatMap((item) => item.data)
              .map((item: IImagePromiseResponse, idx: number) => (
                <CollectionImageCard
                  key={idx}
                  onDelete={() => {}}
                  item={item}
                />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {hasNextPage && (
        <div className="text-center mt-10">
          <button className="py-3 px-3 rounded-md text-sm text-white bg-indigo-500">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionSection;
