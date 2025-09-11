import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TranslationContextProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "Market Place",
  description: "External Market Place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TranslationContextProvider>
          <Providers>{children}</Providers>
        </TranslationContextProvider>
      </body>
    </html>
  );
}
