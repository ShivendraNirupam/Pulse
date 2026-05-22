import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
// @ts-ignore: side-effect CSS import declaration missing in TS config
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "Pulse",
    template: "%s | Pulse"
  },
  description: "Voice lab powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}

        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
