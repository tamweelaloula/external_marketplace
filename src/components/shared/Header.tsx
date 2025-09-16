'use client';
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";
import LanguageDropdown from "@/components/shared/LanguageDropdown";
import Link from "next/link";

const Header = ({ onLogin }: { onLogin: () => void }) => {
  const { translate } = useTranslation();

  const navLinks = [
    { href: "/", label: translate("NAV.HOME") },
    { href: "/categories/all", label: translate("NAV.PRODUCTS") },
    { href: "/for-merchant", label: translate("NAV.FOR_MERCHANT") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => console.log("/")}
          >
            <img src={"/assets/svgs/logo-color.svg"} alt="Logo" />
          </div>

          {/* Center Nav Links */}
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
          <div className="flex justify-end gap-2">
            <LanguageDropdown />
            <Button
              onClick={onLogin}
              variant="outline"
              className=" bg-[#F9C416] hover:bg-[#ffd342] border-none text-[#212044] font-semibold py-5 px-8 md:px-12 rounded-full"
            >
              {translate("NAV.PARTNER")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
