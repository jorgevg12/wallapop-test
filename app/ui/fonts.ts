import { Roboto, Roboto_Mono } from "next/font/google";

export const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

export const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});