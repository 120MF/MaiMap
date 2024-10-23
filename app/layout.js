import "./globals.css";

import Footer from "@/app/_component/Footer";
export const metadata = {
  title: "Maimap",
  description: "A map enabling you find the nearest Maimai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className="flex flex-col h-full">
        <div className="flex-grow">{children}</div>
        <Footer className="h-1/6"></Footer>
      </body>
    </html>
  );
}
