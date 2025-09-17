"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Loader from "./Loader";
import { useTranslation } from "@/i18n";

export default function NafathVerificationModal({
  isOpen,
  onClose,
  onNextStep
}: {
  isOpen: boolean;
  onClose: () => void;
  onNextStep: ()=> void
}) {
  const {translate} = useTranslation()
  const [loading, setLoading] = useState(false);
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

        {loading ? (
          <>
            <Loader />
            <div className="text-2xl font-bold text-[#1F1F1F] my-3">
              {translate("VERIFICATION.VERIFICATION_PROCESS")}
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <DialogHeader>
              <div className="flex justify-center">
                <div className="p-4 rounded-full">
                  <img
                    src="/assets/svgs/mobile-verification.svg" // replace with your image
                    alt="Nafath Verification"
                    className="w-36 h-36"
                  />
                </div>
              </div>
              <DialogTitle className="text-xl text-center font-bold text-gray-900">
                {translate("VERIFICATION.NAFATH_VERIFICATION")}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1 text-center">
                {translate("VERIFICATION.VERIFICATION_NUMBER")}
              </p>
            </DialogHeader>

            {/* Verification Number */}
            <div className="text-5xl font-bold text-yellow-500 my-3">56</div>

            {/* Buttons */}
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                className="rounded-full width-[225] w px-6 py-2 border-yellow-400 text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                {translate("BUTTON.CANCEL")}
              </Button>
              <Button
                className="rounded-full width-[225] px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    onClose();
                    onNextStep()
                    setLoading(false)
                  }, 5000);
                }}
              >
                {translate("BUTTON.PROCEED")}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
