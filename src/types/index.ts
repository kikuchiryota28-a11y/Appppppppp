export type PlatformId = 'youtube' | 'tiktok' | 'instagram' | 'podcast' | 'gaming' | 'other';
export type GoalId = 'edit' | 'record' | 'write' | 'design' | 'grow' | 'analyze';

export type PricingTier = 'free' | 'freemium' | 'paid';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type ToolCategory =
  | 'editing'
  | 'recording'
  | 'writing'
  | 'design'
  | 'distribution'
  | 'analytics';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  platforms: PlatformId[];
  primaryGoals: GoalId[];
  complementaryGoals?: GoalId[];
  pricing: PricingTier;
  pricingNote?: string;
  skillLevel: SkillLevel;
  bestFor: string;
  limitations?: string;
  officialUrl: string;
  affiliateUrl?: string;
  affiliateStatus?: 'none' | 'verified';
  sponsored?: boolean;
}

export interface StackRecommendation {
  tool: Tool;
  role: string;
  workflowStage: 'primary' | 'production' | 'packaging' | 'distribution';
  stageLabel: string;
  reason: string;
  isHero?: boolean;
}

export interface CreatorStackResult {
  platform: PlatformId;
  goal: GoalId;
  platformLabel: string;
  goalLabel: string;
  headline: string;
  contextSummary: string;
  recommendations: StackRecommendation[];
}

export interface PlatformOption {
  id: PlatformId;
  label: string;
  description: string;
  iconName: string;
}

export interface GoalOption {
  id: GoalId;
  label: string;
  description: string;
  iconName: string;
}
