import React from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { StackRecommendation } from '../types';

interface ToolCardProps {
  recommendation: StackRecommendation;
  index: number;
}

export const ToolCard: React.FC<ToolCardProps> = ({ recommendation, index }) => {
  const { tool, role, stageLabel, reason, isHero } = recommendation;

  const pricingStyle = {
    free: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    freemium: 'bg-amber-50 text-amber-800 border-amber-200',
    paid: 'bg-stone-100 text-stone-800 border-stone-300',
  }[tool.pricing];

  const skillBadgeStyle = {
    beginner: 'bg-[#F2EFE9] text-[#4A453E] border-[#E0DBD2]',
    intermediate: 'bg-[#EAE5DC] text-[#3D3831] border-[#D6CEC1]',
    advanced: 'bg-[#E0DAD0] text-[#2E2A24] border-[#C7BEAF]',
  }[tool.skillLevel];

  const destinationUrl = tool.affiliateUrl || tool.officialUrl;

  return (
    <article
      id={`tool-card-${tool.id}`}
      className={`
        relative rounded-2xl border transition-all duration-200 bg-[#FFFFFF]
        ${
          isHero
            ? 'border-[#191716] shadow-md ring-1 ring-[#191716]/10 p-5 sm:p-7'
            : 'border-[#E5E0D8] shadow-xs p-5 sm:p-6 hover:border-[#CFC6B8]'
        }
      `}
    >
      {/* Top stage badge & rank bar */}
      <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#8C8479]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`
              text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border
              ${
                isHero
                  ? 'bg-[#191716] text-[#FAF8F5] border-[#191716]'
                  : 'bg-[#F4F1EA] text-[#615B52] border-[#E5E0D8]'
              }
            `}
          >
            {stageLabel}
          </span>
          <span className="text-xs font-semibold text-[#666057] hidden sm:inline">
            · {role}
          </span>
        </div>

        {/* Pricing & Skill Metadata badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[11px] font-semibold tracking-tight px-2 py-0.5 rounded-full border capitalize ${pricingStyle}`}
          >
            {tool.pricing}
          </span>
          <span
            className={`text-[11px] font-medium tracking-tight px-2 py-0.5 rounded-full border capitalize ${skillBadgeStyle}`}
          >
            {tool.skillLevel}
          </span>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#191716] tracking-tight">
              {tool.name}
            </h3>
            <span className="text-xs text-[#7A746B] font-medium">
              {tool.categoryLabel}
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#2E2A26] font-medium mt-1 leading-snug">
            {tool.tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#666057] mt-2 leading-relaxed max-w-3xl">
            {tool.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0 sm:pt-1">
          <a
            id={`visit-tool-${tool.id}`}
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center justify-center gap-1.5 font-display text-sm font-semibold rounded-lg px-4 py-2.5 transition-all duration-150 text-center w-full sm:w-auto
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2
              ${
                isHero
                  ? 'bg-[#EA580C] hover:bg-[#D94F08] text-white shadow-sm'
                  : 'bg-[#191716] hover:bg-[#33302C] text-[#FAF8F5]'
              }
            `}
            aria-label={`Visit ${tool.name} official website (opens in new tab)`}
          >
            <span>Visit site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Rationale callout: Why this tool is in this specific stack */}
      <div className="mt-4 pt-3.5 border-t border-[#EFEAE2] bg-[#FAF8F5]/80 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 sm:px-6 rounded-b-2xl flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-[13px] text-[#26231F] leading-relaxed">
            <strong className="font-semibold text-[#191716]">Why it’s in your stack:</strong>{' '}
            <span>{reason}</span>
          </div>
        </div>

        {/* Best for & limitations row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#EAE5DC] text-[11px] text-[#6E675E]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>
              <strong className="font-medium text-[#3A3631]">Best for:</strong> {tool.bestFor}
            </span>
          </div>

          {tool.limitations && (
            <div className="flex items-center gap-1.5 text-[#7D766C]">
              <AlertCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>
                <strong className="font-medium text-[#4D4740]">Note:</strong> {tool.limitations}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
