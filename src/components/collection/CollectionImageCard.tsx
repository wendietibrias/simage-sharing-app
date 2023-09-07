"use client";
import { deleteImageCollection } from "@/api/image.api";
import { toast } from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";

type CollectionImageCardProps = {
  item: {
    id: string;
    title: string;
    description: string;
    image: {
      url: string;
      publicId: string;
      type: string;
    };
    name: string;
    email: string;
  };
  onDelete: () => void;
};

const CollectionImageCard = ({ item }: CollectionImageCardProps) => {
  const queryClient = useQueryClient();

  const deleteImageMutation = useMutation({
    mutationFn: deleteImageCollection,
    mutationKey: "delete-image",
    onSuccess: () => {
      queryClient.invalidateQueries("user-collection");
    },
    onError: () => {
      toast.error("Delete image failed", {
        position: "top-center",
        duration: 3000,
      });
    },
  });

  return (
    <div className="group rounded-lg m-1 relative overflow-hidden">
      <img
        src={item.image.url}
        alt={item.description}
        className="w-full h-full"
      />
      <div className="w-full group-hover:bottom-0 p-3 transition-all duration-500 h-full absolute -bottom-[100%] left-0 flex flex-col justify-end bg-gray-800/50">
        <p className="text-white text-[13px] mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
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
          <button
            onClick={() => deleteImageMutation.mutate(item.id)}
            className="text-white text-lg"
          >
            <FiTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionImageCard;
