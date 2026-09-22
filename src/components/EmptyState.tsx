import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText = 'Start fresh',
  onAction,
}) => {
  return (
    <div
      id="empty-state-card"
      className="max-w-md mx-auto my-16 p-8 bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] text-center shadow-xs"
    >
      <div className="w-12 h-12 mx-auto rounded-xl bg-[#F5F2EC] text-[#8C8479] flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-display text-xl font-bold text-[#191716] tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-[#6E675E] mt-2 leading-relaxed">
        {description}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#191716] text-[#FAF8F5] text-sm font-semibold hover:bg-[#33302C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
