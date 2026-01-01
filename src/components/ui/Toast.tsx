import { Check, X, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "destructive" | "info" | "warning";

interface ToastProps {
  title: string;
  type?: ToastType;
  onClose?: () => void;
}

const toastStyles: Record<
  ToastType,
  {
    container: string;
    iconBg: string;
    icon: React.ReactNode;
  }
> = {
  success: {
    container: "border-green-500 bg-green-50",
    iconBg: "bg-green-500",
    icon: <Check size={18} />,
  },
  destructive: {
    container: "border-red-500 bg-red-50",
    iconBg: "bg-red-500",
    icon: <X size={18} />,
  },
  info: {
    container: "border-blue-500 bg-blue-50",
    iconBg: "bg-blue-500",
    icon: <Info size={18} />,
  },
  warning: {
    container: "border-yellow-500 bg-yellow-50",
    iconBg: "bg-yellow-500",
    icon: <AlertTriangle size={18} />,
  },
};

export default function Toast({
  title,
  type = "info",
  onClose,
}: ToastProps) {
  const styles = toastStyles[type];

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md border px-4 py-3 shadow-md ${styles.container}`}
    >
      {/* Left icon + text */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${styles.iconBg}`}
        >
          {styles.icon}
        </div>

        <p className="text-base font-medium text-gray-900">{title}</p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="rounded-md p-1 text-gray-500 hover:bg-black/5"
      >
        <X size={20} />
      </button>
    </div>
  );
}
