import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextDarkThemeProvider from "@/components/ui-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comenter",
  description: "Post your thoughs publically to show to everyone!.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className,
      )}>
        <NextDarkThemeProvider>
          {children}
        </NextDarkThemeProvider>
      </body>
    </html>
  );
}
