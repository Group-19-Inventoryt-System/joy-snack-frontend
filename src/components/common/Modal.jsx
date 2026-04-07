import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidth} transform overflow-hidden rounded-[32px] border border-white/60 bg-white/95 p-8 shadow-[0_32px_120px_rgba(15,23,42,0.15)] backdrop-blur-xl animate-in zoom-in duration-300`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-900">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm active:scale-95"
          >
            <X size={20} className="transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
