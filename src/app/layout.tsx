import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Navbar } from "~/components/navigation/navbar";
import { ThemeProvider } from "next-themes";
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
      <ThirdwebProvider>
        <body className="h-screen w-screen overflow-hidden">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </ThirdwebProvider>
    </html>
  );
}
