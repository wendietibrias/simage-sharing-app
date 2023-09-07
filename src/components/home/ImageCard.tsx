"use client";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Link from "next/link";

type ImageCardProps = {
  item: {
    image: {
      url: string;
      publicId: string;
      type: string;
    };
    title: string;
    name: string;
    email: string;
    description: string;
  };
};

const ImageCard = ({ item }: ImageCardProps) => {
  return (
    <div className="group rounded-lg m-1 relative overflow-hidden">
      <img
        src={item.image.url}
        alt={item.description}
        className="w-full h-full"
      />
      <div className="w-full group-hover:bottom-0 p-3 transition-all duration-500 h-full absolute -bottom-[100%] left-0 flex flex-col justify-end bg-gray-800/50">
        <p className="text-white text-[13px] mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center  gap-x-4">
            <span className="w-[38px] h-[38px] font-bold rounded-full bg-indigo-500 text-white uppercase flex items-center justify-center">
              {item.name.charAt(0)}
            </span>
            <div className="flex-1">
              <h5 className="text-white  text-sm font-semibold">
                {item.title}
              </h5>
              <p className="text-white  text-[12px] font-medium">{item.name}</p>
            </div>
          </div>
          <Link href={item.image.url}>
            <AiOutlineCloudDownload className="text-xl text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
