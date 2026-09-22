import React from 'react';
import { Check, X } from 'lucide-react';

interface ShareToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const ShareToast: React.FC<ShareToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#191716] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-lg border border-[#3D3A36] animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-xs sm:text-sm font-medium pr-1">{message}</span>
      <button
        onClick={onClose}
        className="text-[#9E978D] hover:text-[#FAF8F5] p-1 rounded-md transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
