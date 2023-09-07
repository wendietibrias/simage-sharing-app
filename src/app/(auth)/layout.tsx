import { SessionWrapper } from "@/components";
import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "auto",
  weight: ["200", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SIMAGE",
  icons: {
    icon: "./favicon.ico",
  },
};

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <html className={poppins.className}>
      <body className="w-full bg-slate-200 sm:bg-white min-h-screen flex justify-center items-center">
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
};

export default AuthLayout;
