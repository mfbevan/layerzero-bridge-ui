import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";

import Providers from "./providers";

import { Navbar } from "~/components/navigation/navbar";
import { cn } from "~/lib/utils";
import { roboto, robotoMono } from "~/styles/fonts";

export const metadata: Metadata = {
  title: "LayerZero Bridge",
  description: "Generic LayerZero Bridge",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(roboto.variable, robotoMono.variable)}
      suppressHydrationWarning
    >
      <body className="h-screen w-screen overflow-hidden">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
