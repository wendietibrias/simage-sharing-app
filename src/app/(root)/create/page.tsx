import type { Metadata } from "next";
import { CreateImageForm } from "@/components";

export const metadata: Metadata = {
  title: "SIMAGE | Create",
  icons: {
    icon: "./favicon.ico",
  },
};

const CreateImagePost = () => {
  return (
    <div className="w-[85%] sm:w-full sm:bg-white mx-auto">
      <h2 className="text-xl font-bold text-gray-700 text-center">
        Create Image
      </h2>
      <CreateImageForm />
    </div>
  );
};

export default CreateImagePost;
