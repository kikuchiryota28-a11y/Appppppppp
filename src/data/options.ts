import { PlatformOption, GoalOption, PlatformId, GoalId } from '../types';

export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    description: 'Long-form video, shorts, community broadcasts',
    iconName: 'Youtube',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    description: 'Short-form vertical video, sound-driven trends',
    iconName: 'Smartphone',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: 'Reels, carousels, visual storytelling, stories',
    iconName: 'Camera',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    description: 'Audio interviews, video podcasts, episodic shows',
    iconName: 'Mic',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'Live gameplay, clips, commentary, esports',
    iconName: 'Gamepad2',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Newsletters, multi-platform, emerging media',
    iconName: 'Compass',
  },
];

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'edit',
    label: 'Edit',
    description: 'Pacing, cuts, transitions, sound polish, subtitles',
    iconName: 'Film',
  },
  {
    id: 'record',
    label: 'Record',
    description: 'Live streaming, camera capture, screen sharing, audio',
    iconName: 'Radio',
  },
  {
    id: 'write',
    label: 'Write',
    description: 'Scripting, research, story outlines, show notes',
    iconName: 'PenLine',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Thumbnails, covers, overlays, brand assets',
    iconName: 'Palette',
  },
  {
    id: 'grow',
    label: 'Grow',
    description: 'Audience building, cross-posting, scheduling',
    iconName: 'TrendingUp',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    description: 'Retention graphs, audience demographics, benchmarking',
    iconName: 'BarChart3',
  },
];

export function getPlatformLabel(id: PlatformId): string {
  return PLATFORM_OPTIONS.find((p) => p.id === id)?.label ?? id;
}

export function getGoalLabel(id: GoalId): string {
  return GOAL_OPTIONS.find((g) => g.id === id)?.label ?? id;
}
