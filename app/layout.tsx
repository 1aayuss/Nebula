import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ModelProvider } from "@/components/model-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula",
  description: "AI SaaS platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel='icon' href='/favicon.ico' />
        </head>
        <body className={inter.className}>
          <ModelProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
