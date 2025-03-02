import type { Metadata } from "next";
import "./globals.css";
import { robotoMono, robotoSans } from "@/app/ui/fonts";


export const metadata: Metadata = {
  title: "Wallapop Test",
  description: "Wallapop test created in NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
