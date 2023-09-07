import "../globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar, QueryClientWrapper, SessionWrapper } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  display: "auto",
  weight: ["200", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SIMAGE",
  description: "Generated by create next app",
  icons: {
    icon: "./favicon.ico",
  },
};

const RootLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionWrapper>
          <QueryClientWrapper>
            <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
              <Navbar />
              <main className="flex-1 py-7">{children}</main>
            </div>
          </QueryClientWrapper>
        </SessionWrapper>
        {modal}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
