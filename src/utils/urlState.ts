import { PlatformId, GoalId } from '../types';
import { PLATFORM_OPTIONS, GOAL_OPTIONS } from '../data/options';

const VALID_PLATFORMS = new Set(PLATFORM_OPTIONS.map((p) => p.id));
const VALID_GOALS = new Set(GOAL_OPTIONS.map((g) => g.id));

export interface UrlState {
  platform: PlatformId | null;
  goal: GoalId | null;
  hasViewedResults: boolean;
}

export function parseUrlState(): UrlState {
  if (typeof window === 'undefined') {
    return { platform: null, goal: null, hasViewedResults: false };
  }

  const params = new URLSearchParams(window.location.search);
  const platformParam = params.get('platform') || params.get('p');
  const goalParam = params.get('goal') || params.get('g');

  const platform =
    platformParam && VALID_PLATFORMS.has(platformParam.toLowerCase() as PlatformId)
      ? (platformParam.toLowerCase() as PlatformId)
      : null;

  const goal =
    goalParam && VALID_GOALS.has(goalParam.toLowerCase() as GoalId)
      ? (goalParam.toLowerCase() as GoalId)
      : null;

  const resultsParam = params.get('view') === 'stack' || (platform !== null && goal !== null);

  return {
    platform,
    goal,
    hasViewedResults: resultsParam && platform !== null && goal !== null,
  };
}

export function updateUrl(platform: PlatformId | null, goal: GoalId | null, isResultsView: boolean) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();

  if (platform) {
    params.set('platform', platform);
  }
  if (goal) {
    params.set('goal', goal);
  }
  if (isResultsView && platform && goal) {
    params.set('view', 'stack');
  }

  const queryString = params.toString();
  const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

  if (window.location.search !== (queryString ? `?${queryString}` : '')) {
    window.history.pushState({ platform, goal, isResultsView }, '', newUrl);
  }
}

export function generateShareUrl(platform: PlatformId, goal: GoalId): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('platform', platform);
  url.searchParams.set('goal', goal);
  url.searchParams.set('view', 'stack');
  return url.toString();
}
