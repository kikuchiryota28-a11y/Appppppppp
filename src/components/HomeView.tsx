import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PlatformId, GoalId } from '../types';
import { PLATFORM_OPTIONS, GOAL_OPTIONS } from '../data/options';
import { SelectionPill } from './SelectionPill';

interface HomeViewProps {
  selectedPlatform: PlatformId | null;
  selectedGoal: GoalId | null;
  onSelectPlatform: (platform: PlatformId) => void;
  onSelectGoal: (goal: GoalId) => void;
  onBuildStack: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedPlatform,
  selectedGoal,
  onSelectPlatform,
  onSelectGoal,
  onBuildStack,
}) => {
  const isReady = Boolean(selectedPlatform && selectedGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReady) {
      onBuildStack();
    }
  };

  return (
    <div id="home-view-container" className="w-full py-8 sm:py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section id="home-hero-section" className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEAE2] text-[#544F47] text-xs font-semibold tracking-wide uppercase font-mono mb-4 border border-[#E3DDD3]">
          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Curated Creator Workflows</span>
        </div>

        <h1
          id="hero-main-title"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#191716] leading-[1.08]"
        >
          Build your creator stack.
        </h1>

        <p
          id="hero-subtitle"
          className="text-base sm:text-lg text-[#615B52] mt-4 leading-relaxed font-normal max-w-xl mx-auto"
        >
          Tell us what you&apos;re making. We&apos;ll show you the tools to make it.
        </p>
      </section>

      {/* Main Selection Form */}
      <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
        {/* Step 1: Platform Selection */}
        <div id="platform-selection-group" className="space-y-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-[#E8E3DA] pb-2.5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8378] font-bold">
                Step 01
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#191716] tracking-tight mt-0.5">
                What are you creating on?
              </h2>
            </div>
            {selectedPlatform && (
              <span className="text-xs font-mono font-medium text-[#EA580C] bg-[#EA580C]/10 px-2 py-0.5 rounded">
                Selected
              </span>
            )}
          </div>

          <div
            role="radiogroup"
            aria-label="What are you creating on?"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3"
          >
            {PLATFORM_OPTIONS.map((option) => (
              <SelectionPill
                key={option.id}
                id={option.id}
                label={option.label}
                description={option.description}
                iconName={option.iconName}
                isSelected={selectedPlatform === option.id}
                onSelect={() => onSelectPlatform(option.id)}
                groupName="platform"
              />
            ))}
          </div>
        </div>

        {/* Step 2: Goal Selection */}
        <div id="goal-selection-group" className="space-y-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-[#E8E3DA] pb-2.5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8378] font-bold">
                Step 02
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#191716] tracking-tight mt-0.5">
                What are you trying to do?
              </h2>
            </div>
            {selectedGoal && (
              <span className="text-xs font-mono font-medium text-[#EA580C] bg-[#EA580C]/10 px-2 py-0.5 rounded">
                Selected
              </span>
            )}
          </div>

          <div
            role="radiogroup"
            aria-label="What are you trying to do?"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3"
          >
            {GOAL_OPTIONS.map((option) => (
              <SelectionPill
                key={option.id}
                id={option.id}
                label={option.label}
                description={option.description}
                iconName={option.iconName}
                isSelected={selectedGoal === option.id}
                onSelect={() => onSelectGoal(option.id)}
                groupName="goal"
              />
            ))}
          </div>
        </div>

        {/* Primary CTA Section */}
        <div
          id="cta-section"
          className="pt-6 pb-4 flex flex-col items-center justify-center gap-3"
        >
          <button
            id="build-stack-submit-btn"
            type="submit"
            disabled={!isReady}
            className={`
              w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-xl font-display text-base sm:text-lg font-bold
              flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer select-none
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2
              ${
                isReady
                  ? 'bg-[#EA580C] hover:bg-[#D94F08] active:scale-[0.98] text-white shadow-md shadow-[#EA580C]/20 ring-1 ring-[#EA580C]'
                  : 'bg-[#E5E0D8] text-[#8C857B] cursor-not-allowed opacity-80'
              }
            `}
            aria-label={
              isReady
                ? 'Build my stack'
                : 'Build my stack (choose platform and goal to activate)'
            }
          >
            <span>Build my stack</span>
            <ArrowRight className={`w-5 h-5 transition-transform ${isReady ? 'group-hover:translate-x-1' : ''}`} />
          </button>

          {!isReady && (
            <p className="text-xs text-[#8A8378] font-medium tracking-tight">
              Select a platform and what you want to do to unlock your stack.
            </p>
          )}

          {isReady && (
            <p className="text-xs text-[#615B52] font-medium tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
              <span>Ready: Assembling focused workflow for your setup</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
