import { Metadata } from "next";
import { NextTamaguiProvider } from "./NextTamaguiProvider";
import { PageLayout } from "@my/ui";

export const metadata: Metadata = {
  title: "News",
  description: "News app - Next.js, Solito, Tamagui, NewsAPI",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>
          <PageLayout>{children}</PageLayout>
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
