import React from 'react';
import {
  Youtube,
  Smartphone,
  Camera,
  Mic,
  Gamepad2,
  Compass,
  Film,
  Radio,
  PenLine,
  Palette,
  TrendingUp,
  BarChart3,
  Check,
} from 'lucide-react';

interface SelectionPillProps {
  id: string;
  label: string;
  description?: string;
  iconName: string;
  isSelected: boolean;
  onSelect: () => void;
  groupName: string;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Youtube,
  Smartphone,
  Camera,
  Mic,
  Gamepad2,
  Compass,
  Film,
  Radio,
  PenLine,
  Palette,
  TrendingUp,
  BarChart3,
};

export const SelectionPill: React.FC<SelectionPillProps> = ({
  id,
  label,
  description,
  iconName,
  isSelected,
  onSelect,
  groupName,
}) => {
  const IconComponent = ICON_MAP[iconName] || Compass;

  return (
    <button
      id={`option-${groupName}-${id}`}
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className={`
        relative group w-full text-left rounded-xl p-3.5 sm:p-4 border transition-all duration-150 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]
        min-h-[76px] flex items-start gap-3 select-none cursor-pointer
        ${
          isSelected
            ? 'bg-[#FFFFFF] border-[#191716] shadow-sm ring-1 ring-[#191716]'
            : 'bg-[#FAF8F5] hover:bg-[#F5F2EC] border-[#E5E0D8] hover:border-[#D1C9BE] text-[#3D3A36]'
        }
      `}
    >
      {/* Icon frame */}
      <div
        className={`
          shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 mt-0.5
          ${
            isSelected
              ? 'bg-[#191716] text-[#FAF8F5]'
              : 'bg-[#EFEAE2] text-[#5C564E] group-hover:bg-[#E5DFD5] group-hover:text-[#191716]'
          }
        `}
      >
        <IconComponent className="w-4 h-4" />
      </div>

      {/* Label and description */}
      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-2">
          <span
            className={`font-display text-base font-semibold leading-snug tracking-tight ${
              isSelected ? 'text-[#191716]' : 'text-[#2D2A26]'
            }`}
          >
            {label}
          </span>
        </div>
        {description && (
          <p className="text-xs text-[#736C62] line-clamp-2 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Tactile radio/check indicator */}
      <div
        className={`
          absolute top-3.5 right-3.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150
          ${
            isSelected
              ? 'bg-[#EA580C] text-white scale-100 shadow-xs'
              : 'border border-[#D1C9BE] bg-transparent opacity-40 group-hover:opacity-80 scale-95'
          }
        `}
        aria-hidden="true"
      >
        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
    </button>
  );
};
