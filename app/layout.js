import { Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "url shortner is here",
  description: "created by Nosheen Mustafa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
      </SessionWrapper>
    </html>
  );
}
