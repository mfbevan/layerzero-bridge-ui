import { Roboto, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});
