import "./globals.css";

import Footer from "@/app/_component/Footer";
export const metadata = {
  title: "Maimap",
  description: "A map enabling you find the nearest Maimai.",
  icons: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full">
        <div className="flex-grow" style={{ height: "95vh" }}>
          {children}
        </div>
        <div style={{ height: "5vh" }}>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
