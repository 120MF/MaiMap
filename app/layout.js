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
    <html lang="en" className="m-0 p-0 h-full overflow-hidden">
      <body className="m-0 p-0 h-full overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="m-0 p-0" style={{ height: "95vh" }}>
            <Suspense>{children}</Suspense>
          </div>
          <div style={{ height: "5vh" }}>
            <Footer></Footer>
          </div>
        </div>
      </body>
    </html>
  );
}
