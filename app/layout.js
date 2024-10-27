import "./globals.css";

import Footer from "@/app/_component/Footer";
import { Suspense } from "react";
export const metadata = {
  title: "MaiMap",
  description: "A map enabling you find the nearest Maimai.",
  icons: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full">
        <div className="" style={{ height: "95vh" }}>
          <Suspense>{children}</Suspense>
        </div>
        <div style={{ height: "5vh" }}>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
