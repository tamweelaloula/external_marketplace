"use client";
import { useTranslation } from "@/i18n";
import LanguageDropdown from "@/components/shared/LanguageDropdown";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = ({ onLogin }: { onLogin: () => void }) => {
  const { language, translate } = useTranslation();

  const navLinks = [
    { href: "/", label: translate("NAV.HOME") },
    { href: "/categories/all", label: translate("NAV.PRODUCTS") },
    {
      href: "https://merchants.tamweel-aloula.com",
      label: translate("NAV.FOR_MERCHANT"),
      external: true,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <img src={"/assets/svgs/logo-color.svg"} alt="Logo" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageDropdown />
            <div className="hidden md:flex gap-2">
              <a
                href="https://merchants.tamweel-aloula.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold py-2 px-2 md:px-6 rounded-full"
              >
                {translate("NAV.PARTNER")}
              </a>
            </div>

            {/* Mobile Hamburger using shadcn Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-[#212044]">
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent
                side={language.code === "ar" ? "right" : "left"}
                className="w-64 p-6"
              >
                <SheetHeader>
                  <SheetTitle>
                    <img
                      src={"/assets/svgs/logo-color.svg"}
                      alt="Logo"
                      className="h-8"
                    />
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                  <a
                    href="https://merchants.tamweel-aloula.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] text-center font-semibold py-2 px-2 md:px-6 rounded-full"
                  >
                    {translate("NAV.PARTNER")}
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
