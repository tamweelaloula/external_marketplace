"use client";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";
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
    { href: "/for-merchant", label: translate("NAV.FOR_MERCHANT") },
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageDropdown />
            <div className="hidden md:flex gap-2">
              <Link
                href={"https://merchants.tamweel-aloula.com/"}
                className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold py-5 px-8 md:px-12 rounded-full"
              >
                {translate("NAV.PARTNER")}
              </Link>
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
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#212044] hover:text-[#F9C416] font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button
                      onClick={onLogin}
                      className="bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold rounded-full mt-6"
                    >
                      {translate("NAV.PARTNER")}
                    </Button>
                  </SheetClose>
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
