"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from "@/i18n";

export default function SuccessModal({
  title,
  subTitle,
  lowerTitle,
  buttonTitle = "PROCEED",
  isOpen,
  noClose = false,
  onClose,
}: {
  title: string;
  subTitle: string;
  lowerTitle: string;
  buttonTitle?: string;
  isOpen: boolean;
  noClose?: boolean;
  onClose?: () => void;
}) {
  const {translate} = useTranslation()
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="max-w-md rounded-2xl p-8 text-center shadow-lg"
        showCloseButton={false}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <>
          {/* Header */}
          <DialogHeader>
            <div className="flex justify-center">
              <div className="p-4 rounded-full">
                <img
                  src="/assets/svgs/success.svg" // replace with your image
                  alt="Nafath Verification"
                  className="w-36 h-36"
                />
              </div>
            </div>
            <DialogTitle className="text-xl text-center font-bold text-gray-900">
              {title}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1 text-center mb-4">
              {subTitle} <br /> {lowerTitle}
            </p>
          </DialogHeader>

          {/* Buttons */}
          <div className="flex justify-center gap-6">
            {!noClose && (
              <Button
                variant={"ghost"}
                className="rounded-full width-[225] bg-white px-6 py-2 border border-yellow-400 text-black font-medium"
                onClick={onClose}
              >
                {translate("BUTTON.CANCEL")}
              </Button>
            )}
            <Button
              className="rounded-full width-[225] px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
              onClick={onClose}
            >
              {translate(`BUTTON.${buttonTitle}`)}
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
