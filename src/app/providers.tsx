"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";     // optional, skip if no redux
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/shared/Header";
import { useTranslation } from "@/i18n";
import { useLayoutEffect } from "react";
import Footer from "@/components/Sections/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  useLayoutEffect(() => {
    document.dir = language?.dir;
  }, [language?.dir]);

  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Header onLogin={()=>console.log("asdsd")}/>
        {children}
        <Footer/>
      </ThemeProvider>
    </Provider>
  );
}
