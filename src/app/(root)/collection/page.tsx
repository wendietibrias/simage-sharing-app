import type { Metadata } from "next";
import { CollectionSection } from "@/components";

export const metadata: Metadata = {
  title: "SIMAGE | Collection",
  icons: {
    icon: "./favicon.ico",
  },
};

const Collection = () => {
  return (
    <div className="w-[85%] xl:w-[95%] sm:w-full xl:px-5 mx-auto">
      <CollectionSection />
    </div>
  );
};

export default Collection;
