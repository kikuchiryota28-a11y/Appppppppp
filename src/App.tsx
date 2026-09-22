import React, { useState, useEffect, useCallback } from 'react';
import { PlatformId, GoalId, CreatorStackResult } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ResultView } from './components/ResultView';
import { EmptyState } from './components/EmptyState';
import { recommendCreatorStack } from './engine/recommend';
import { parseUrlState, updateUrl } from './utils/urlState';

export default function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<GoalId | null>(null);
  const [view, setView] = useState<'home' | 'results'>('home');
  const [stackResult, setStackResult] = useState<CreatorStackResult | null>(null);

  // Initialize from URL state on mount
  useEffect(() => {
    const { platform, goal, hasViewedResults } = parseUrlState();
    if (platform) setSelectedPlatform(platform);
    if (goal) setSelectedGoal(goal);

    if (platform && goal && hasViewedResults) {
      const result = recommendCreatorStack(platform, goal);
      setStackResult(result);
      setView('results');
    }
  }, []);

  // Listen to browser Back/Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      const { platform, goal, hasViewedResults } = parseUrlState();
      setSelectedPlatform(platform);
      setSelectedGoal(goal);

      if (platform && goal && hasViewedResults) {
        const result = recommendCreatorStack(platform, goal);
        setStackResult(result);
        setView('results');
      } else {
        setView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPlatform = useCallback((platform: PlatformId) => {
    setSelectedPlatform(platform);
    updateUrl(platform, selectedGoal, false);
  }, [selectedGoal]);

  const handleSelectGoal = useCallback((goal: GoalId) => {
    setSelectedGoal(goal);
    updateUrl(selectedPlatform, goal, false);
  }, [selectedPlatform]);

  const handleBuildStack = useCallback(() => {
    if (!selectedPlatform || !selectedGoal) return;
    const result = recommendCreatorStack(selectedPlatform, selectedGoal);
    setStackResult(result);
    setView('results');
    updateUrl(selectedPlatform, selectedGoal, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPlatform, selectedGoal]);

  const handleModify = useCallback(() => {
    setView('home');
    updateUrl(selectedPlatform, selectedGoal, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPlatform, selectedGoal]);

  const handleReset = useCallback(() => {
    setSelectedPlatform(null);
    setSelectedGoal(null);
    setStackResult(null);
    setView('home');
    updateUrl(null, null, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191716]">
      {/* Sticky Header */}
      <Header onReset={handleReset} showReset={view === 'results'} />

      {/* Main View Area */}
      <main className="flex-1">
        {view === 'home' && (
          <HomeView
            selectedPlatform={selectedPlatform}
            selectedGoal={selectedGoal}
            onSelectPlatform={handleSelectPlatform}
            onSelectGoal={handleSelectGoal}
            onBuildStack={handleBuildStack}
          />
        )}

        {view === 'results' && stackResult && (
          <ResultView
            result={stackResult}
            onModify={handleModify}
            onReset={handleReset}
          />
        )}

        {view === 'results' && !stackResult && (
          <EmptyState
            title="No stack generated yet"
            description="Please choose your platform and creative goal to build a focused tool stack."
            actionText="Choose platform & goal"
            onAction={handleReset}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer
        id="app-footer"
        className="w-full border-t border-[#E8E3DA] py-8 px-4 sm:px-6 bg-[#F5F1EA] text-[#696359] text-xs transition-colors"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-display font-bold text-sm text-[#191716] tracking-tight block sm:inline mr-2">
              Creator Finder
            </span>
            <span className="text-[#7D766C]">
              Build your creator stack. Curated workflows without the noise.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#7A7368] font-mono text-[11px]">
            <span>100% Deterministic Engine</span>
            <span>·</span>
            <span>No AI Hallucinations</span>
            <span>·</span>
            <span>Free forever</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
