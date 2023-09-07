import { HomeBanner, MainSection, ExampleImageSection } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIMAGE | Homepage",
  icons: {
    icon: "./favicon.ico",
  },
};

const Home = () => {
  return (
    <div className="w-[85%] lg:w-[95%] sm:w-full sm:px-5 mx-auto">
      <HomeBanner title="" description="" />
      <MainSection />
    </div>
  );
};

export default Home;
