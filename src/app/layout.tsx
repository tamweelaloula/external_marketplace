import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TranslationContextProvider } from "@/i18n";
import { ToastProvider } from "@/lib/contexts/toast-context";

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
        <ToastProvider>
          <TranslationContextProvider>
            <Providers>{children}</Providers>
          </TranslationContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
