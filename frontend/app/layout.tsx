import type React from "react";
import "@/app/globals.css";
import { DotGothic16 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = DotGothic16({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Shodai SONOBE official website",
  description: "Shodai SONOBE official website.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
