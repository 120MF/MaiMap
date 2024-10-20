import Footer from "@/app/_component/Footer";

export const metadata = {
  title: "Maimap",
  description: "A map enabling you find the nearest Maimai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
