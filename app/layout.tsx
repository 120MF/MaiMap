import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Suspense } from "react";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "m-0 p-0 min-h-screen h-full overflow-hidden bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex-1 flex flex-col">
            <div className="m-0 p-0" style={{ height: "95vh" }}>
              <Suspense>{children}</Suspense>
            </div>
            <div style={{ height: "5vh" }}>
              <Footer></Footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}