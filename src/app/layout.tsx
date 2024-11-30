import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";

import Providers from "./providers";

import { Navbar } from "~/components/navigation/navbar";
import { cn } from "~/lib/utils";
import { roboto, robotoMono } from "~/styles/fonts";
import { Footer } from "~/components/navigation/footer";
import { Toaster } from "~/components/ui/toaster";

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
      <body className="h-screen w-screen">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            <Toaster />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
