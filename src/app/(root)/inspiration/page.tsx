import type { Metadata } from "next";
import { ExampleImageSection } from "@/components";

export const metadata: Metadata = {
  title: "SIMAGE | Inspiration",
  icons: {
    icon: "./favicon.ico",
  },
};

const Inspiration = () => {
  return (
    <div className="w-[85%] lg:w-[95%] sm:px-5 sm:w-full mx-auto">
      <ExampleImageSection />
    </div>
  );
};

export default Inspiration;
