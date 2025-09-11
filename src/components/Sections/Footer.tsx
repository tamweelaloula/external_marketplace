import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/i18n"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const {translate} = useTranslation()
  return (
    <footer className="bg-[#FFFCF7] py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C35]">
          {translate("FOOTER.TITLE1")} <br /> {translate("FOOTER.TITLE2")}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {translate("FOOTER.SUBTITLE1")} <br /> {translate("FOOTER.SUBTITLE2")}
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-[#1C1C35] rounded-full px-6 py-2">
            {translate("FOOTER.BUTTON")} →
          </Button>
        </div>

        {/* Separator */}
        <Separator className="my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/svgs/logo-color.svg"
              alt="Tamweel Aloula"
              width={150}
              height={150}
            />
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            {translate("FOOTER.COPYRIGHT")}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <span className="text-sm font-bold">X</span>
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
