import "./globals.css";
import Navbar from "@/components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/next';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-black text-white overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen w-full pt-[80px] sm:pt-[90px]">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}