import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n";

export default function IvrModal({
  isOpen,
  onClose,
  sendIvr,
}: {
  isOpen: boolean;
  onClose: () => void;
  sendIvr: () => void;
}) {
  const { translate } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-md rounded-2xl p-8 text-center shadow-lg">
        <>
          {/* Header */}
          <DialogHeader>
            <div className="flex justify-center">
              <div className="p-4 rounded-full">
                <img
                  src={"/assets/svgs/ivr.svg"} // replace with your image
                  alt="Nafath Verification"
                  className="w-36 h-36"
                />
              </div>
            </div>
            <DialogTitle className="text-xl text-center font-bold text-gray-900">
              {translate("LOAN.IVR_HEADING")}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {translate("LOAN.IVR_DESC")}
            </p>
          </DialogHeader>

          {/* Buttons */}
          <div className="flex justify-center gap-6">
            <Button
              className="rounded-full width-[225] px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
              onClick={() => {
                sendIvr();
              }}
            >
              {translate("BUTTON.CONTINUE")}
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
