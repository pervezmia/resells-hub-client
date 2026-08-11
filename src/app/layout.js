import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Share/Navbar";
import Footer from "@/components/Share/Footer";
import AosInit from "@/components/common/AosInit";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resells Hub || Buy and Sell Pre-Owned Products, Safely and Easily",
  description:
    "ReSell Hub connects buyers and sellers of second-hand goods, reducing waste and helping you find great deals or earn from items you no longer need",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <Toaster></Toaster>
        <main>
          <AosInit></AosInit>
          <CartProvider>{children}</CartProvider>
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
