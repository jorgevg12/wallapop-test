import type { Metadata } from "next";
import "./globals.css";
import { robotoMono, robotoSans } from "@/app/ui/fonts";
import { MSWProvider } from "./providers/msw-provider";

if (process.env.NEXT_RUNTIME === 'nodejs') {
  const { server } = require('../mocks/node');
  server.listen({ onUnhandledRequest: "bypass" });
}


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
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
