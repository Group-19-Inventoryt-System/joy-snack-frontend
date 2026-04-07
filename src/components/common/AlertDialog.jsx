import React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * Reusable AlertDialog component to replace window.alert and window.confirm.
 */
const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning' | 'danger' | 'success' | 'info'
  isLoading = false,
}) => {
  const configs = {
    warning: {
      icon: AlertCircle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      buttonVariant: "accent",
    },
    danger: {
      icon: AlertCircle,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      buttonVariant: "danger",
    },
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      buttonVariant: "primary",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      buttonVariant: "secondary",
    },
  };

  const config = configs[type] || configs.warning;
  const Icon = config.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="text-center p-2">
        {/* Icon Header */}
        <div className={`mx-auto w-20 h-20 rounded-[32px] ${config.bgColor} flex items-center justify-center mb-6`}>
            <Icon size={40} className={config.iconColor} />
        </div>

        <h3 className="text-2xl font-black text-slate-900 font-sulphur tracking-tight">
          {title}
        </h3>
        <p className="mt-3 text-slate-500 text-sm leading-relaxed px-4">
          {message}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            fullWidth
            className="sm:order-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={config.buttonVariant}
            onClick={onConfirm}
            fullWidth
            isLoading={isLoading}
            className="sm:order-2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertDialog;
