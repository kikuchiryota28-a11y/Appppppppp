import React from 'react';
import { Layers, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header
      id="app-header"
      className="w-full border-b border-[#E8E3DA] bg-[#FAF8F5]/90 backdrop-blur-sm sticky top-0 z-30 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          id="brand-home-button"
          onClick={onReset}
          className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-lg py-1 px-1.5 -ml-1.5 transition-colors"
          aria-label="Creator Finder Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#191716] text-[#FAF8F5] flex items-center justify-center font-display font-bold text-sm tracking-tight shadow-xs group-hover:bg-[#EA580C] transition-colors">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base tracking-tight text-[#191716]">
                Creator Finder
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#EFEAE2] text-[#6E675F]">
                v1.0
              </span>
            </div>
            <span className="text-[11px] text-[#7A746B] leading-none hidden sm:block">
              Build your creator stack
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3">
          {showReset && (
            <button
              id="header-start-over-btn"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#635E56] hover:text-[#191716] px-3 py-1.5 rounded-md hover:bg-[#EFEAE2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start over</span>
            </button>
          )}

          <div className="text-[11px] font-mono text-[#8C857B] border border-[#E5E0D8] rounded-full px-2.5 py-1 bg-[#F5F2EC] hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
            <span>Curated stack catalog</span>
          </div>
        </div>
      </div>
    </header>
  );
};
