import React, { useState } from 'react';
import {
  Share2,
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { CreatorStackResult } from '../types';
import { ToolCard } from './ToolCard';
import { ShareToast } from './ShareToast';
import { generateShareUrl } from '../utils/urlState';

interface ResultViewProps {
  result: CreatorStackResult;
  onModify: () => void;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onModify, onReset }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShare = async () => {
    const url = generateShareUrl(result.platform, result.goal);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setToastMessage('Stack link copied to clipboard!');
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setToastMessage('Stack link copied to clipboard!');
      }
    } catch {
      setToastMessage(`Share URL: ${url}`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div id="results-view-container" className="w-full py-8 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7A746B]">
          <button
            onClick={onReset}
            className="hover:text-[#191716] transition-colors underline decoration-dotted underline-offset-4"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#191716] font-semibold">{result.platformLabel}</span>
          <span>/</span>
          <span className="text-[#EA580C] font-semibold">{result.goalLabel}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="results-modify-btn"
            onClick={onModify}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2E2A26] bg-[#FFFFFF] border border-[#D9D3C7] hover:border-[#191716] px-3.5 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#706A61]" />
            <span>Adjust criteria</span>
          </button>

          <button
            id="results-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#191716] hover:bg-[#33302C] px-4 py-2 rounded-lg transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FAF8F5]" />
            <span>Share stack</span>
          </button>
        </div>
      </div>

      {/* Main Title & Context Summary */}
      <section id="results-header-summary" className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE5DC] text-[#4F4A42] text-xs font-mono font-bold tracking-wider uppercase mb-3">
          <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Curated Setup · {result.recommendations.length} Tools</span>
        </div>

        <h1
          id="results-headline"
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191716] leading-tight"
        >
          Your Creator Stack
        </h1>

        <p
          id="results-context-summary"
          className="text-base sm:text-lg text-[#5E584E] mt-3 leading-relaxed max-w-2xl"
        >
          {result.contextSummary}
        </p>

        {/* Selected Context Pills */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E0DBD2] text-[#24211D]">
            Platform: <strong className="text-[#191716] font-semibold">{result.platformLabel}</strong>
          </span>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E0DBD2] text-[#24211D]">
            Focus: <strong className="text-[#EA580C] font-semibold">{result.goalLabel}</strong>
          </span>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#E5DFD4] text-[#7A7368]">
            Deterministic Matching
          </span>
        </div>
      </section>

      {/* Workflow Architecture Overview */}
      <section className="mb-8 p-4 sm:p-5 rounded-xl bg-[#F5F1EA] border border-[#E5E0D8]">
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#7A7369]">
            Workflow Architecture
          </span>
          <span className="text-[11px] text-[#8C857B] font-mono">
            {result.recommendations.length} step production cycle
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 text-xs">
          {result.recommendations.map((rec, idx) => (
            <div
              key={rec.tool.id}
              className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${
                rec.isHero
                  ? 'bg-[#FFFFFF] border-[#191716] shadow-xs'
                  : 'bg-[#FAF8F5] border-[#E3DDD3]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#8C857B] block">
                  Step 0{idx + 1}
                </span>
                <span className="font-display font-bold text-[#191716] text-sm block truncate">
                  {rec.tool.name}
                </span>
              </div>
              <span className="text-[10px] text-[#6E675E] font-medium block truncate mt-1">
                {rec.stageLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Stack List */}
      <section id="results-tools-list" className="space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-2">
          <h2 className="font-display text-lg font-bold text-[#191716] tracking-tight">
            Recommended Tools in Your Stack
          </h2>
          <span className="text-xs font-mono text-[#7D766C]">
            Target setup: 4–6 tools
          </span>
        </div>

        {result.recommendations.map((rec, index) => (
          <ToolCard key={rec.tool.id} recommendation={rec} index={index} />
        ))}
      </section>

      {/* Trust & Transparency Guarantee */}
      <section
        id="trust-transparency-card"
        className="mt-12 p-5 rounded-xl border border-[#E3DDD3] bg-[#F7F4EE] flex items-start gap-3.5 text-xs text-[#5C564E] leading-relaxed"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-[#191716] block mb-0.5">
            Transparent, Conflict-Free Curation
          </strong>
          <p>
            Creator Finder recommendations are determined purely by platform fit, workflow synergy, and creator utility.
            Organic rankings are never influenced by affiliate partnerships, commissions, or advertising fees.
          </p>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="mt-10 pt-6 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-display text-base font-bold text-[#191716]">
            Exploring a different medium?
          </p>
          <p className="text-xs text-[#736C62] mt-0.5">
            You can configure a custom stack for any other platform or creative goal.
          </p>
        </div>

        <button
          id="results-bottom-restart-btn"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#191716] hover:bg-[#33302C] text-[#FAF8F5] text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Build another stack</span>
        </button>
      </div>

      {/* Toast Notification */}
      <ShareToast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
