import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResultProvider } from "@/context/resultContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pool Point Counter",
  description: "Pool Point Counter by Parivartan team",
  manifest: '/manifest.json',
  themeColor: '#14B8A6'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 text-white h-screen selection:bg-gray-900`}
      >
        <Navbar />
        <ToastContainer theme="dark" autoClose={2000}/>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResultProvider>{children}</ResultProvider>
        </main>
      </body>
    </html>
  );
}
