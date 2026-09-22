import { PlatformId, GoalId, CreatorStackResult, StackRecommendation, Tool } from '../types';
import { TOOLS } from '../data/tools';
import { getPlatformLabel, getGoalLabel } from '../data/options';

interface RecommendationRule {
  primaryToolId: string;
  primaryRole: string;
  primaryReason: string;
  supportingToolIds: Array<{
    toolId: string;
    role: string;
    stage: 'production' | 'packaging' | 'distribution';
    stageLabel: string;
    reason: string;
  }>;
}

// Curated workflow matrix ensuring high-quality, non-redundant, coherent stacks
const REC_MATRIX: Record<PlatformId, Partial<Record<GoalId, RecommendationRule>>> = {
  youtube: {
    edit: {
      primaryToolId: 'davinci-resolve',
      primaryRole: 'Primary Video Post-Production',
      primaryReason:
        'Industry-standard timeline editing, robust multicam, and studio-grade color correction with a genuinely free tier without watermarks.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Thumbnail & Artwork Design',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Thumbnails decide 80% of your click-through rate. Essential for quick 1280x720 graphic compositing and title typography.',
        },
        {
          toolId: 'notion',
          role: 'Scripting & Video Pipeline',
          stage: 'production',
          stageLabel: 'PRE-PRODUCTION',
          reason: 'Organize video drafts, outline timestamps, store sponsor talking points, and manage your upload schedule in one place.',
        },
        {
          toolId: 'obs-studio',
          role: 'Screen & High-Bitrate Capture',
          stage: 'production',
          stageLabel: 'RECORDING',
          reason: 'Records crisp 60fps local B-roll, software demos, or webcam footage directly into your edit folder with zero lag.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Audience Retention & CTR Tracking',
          stage: 'distribution',
          stageLabel: 'ANALYSIS',
          reason: 'Pinpoint the exact seconds viewers drop off in your edit and study impression click-through rates across video chapters.',
        },
      ],
    },
    record: {
      primaryToolId: 'obs-studio',
      primaryRole: 'Core Screen & Camera Broadcast',
      primaryReason:
        'The gold standard for zero-latency screen capture, audio track separation, and high-bitrate local 4K/60fps video recording.',
      supportingToolIds: [
        {
          toolId: 'davinci-resolve',
          role: 'Post-Capture Video Trimming',
          stage: 'production',
          stageLabel: 'EDITING',
          reason: 'Quickly cut out dead air, sync multi-channel mic audio, and render crisp YouTube-optimized presets.',
        },
        {
          toolId: 'canva',
          role: 'Livestream Overlays & Thumbnails',
          stage: 'packaging',
          stageLabel: 'BRANDING',
          reason: 'Create clean webcam borders, starting soon screens, and click-worthy video thumbnails.',
        },
        {
          toolId: 'notion',
          role: 'Episode Run-Down & Research',
          stage: 'production',
          stageLabel: 'PLANNING',
          reason: 'Keep talking points, sponsor reads, and interview questions open side-by-side during recording.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Stream & Video Performance',
          stage: 'distribution',
          stageLabel: 'METRICS',
          reason: 'Measure live viewer concurrency peaks and replay watch-time duration.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'Scriptwriting & Content Architecture',
      primaryReason:
        'Ideal for two-column video scripts (Visuals vs. Audio), research documentation, hook variations, and content release calendars.',
      supportingToolIds: [
        {
          toolId: 'google-drive',
          role: 'Asset Repository & B-roll Handoff',
          stage: 'production',
          stageLabel: 'STORAGE',
          reason: 'Back up script drafts, raw VO audio, and share folders with your remote video editor.',
        },
        {
          toolId: 'canva',
          role: 'Storyboards & Thumbnail Testing',
          stage: 'packaging',
          stageLabel: 'VISUALS',
          reason: 'Validate your script concept early by mocking up the title and thumbnail before filming a single frame.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'Final Cut Assembly',
          stage: 'production',
          stageLabel: 'ASSEMBLY',
          reason: 'Translate your written script and timestamped outlines into a tightly paced visual narrative.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Retention vs. Script Structure',
          stage: 'distribution',
          stageLabel: 'LEARNING',
          reason: 'Compare drop-offs against your script timestamps to discover which intros hook viewers longest.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'Thumbnail & Channel Branding Engine',
      primaryReason:
        'Fast thumbnail composition with high-contrast typography, cutout stickers, background removal, and standard 16:9 canvas grids.',
      supportingToolIds: [
        {
          toolId: 'notion',
          role: 'Visual Concept & Title Brainstorming',
          stage: 'production',
          stageLabel: 'IDEATION',
          reason: 'Pair title ideas with thumbnail concepts in a visual board to test 3-4 packaging angles per video.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'Frame Grabs & Motion Assets',
          stage: 'production',
          stageLabel: 'FOOTAGE',
          reason: 'Extract full-resolution uncompressed still frames directly from your timeline for thumbnail focal points.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Impression Click-Through Rate (CTR)',
          stage: 'distribution',
          stageLabel: 'OPTIMIZATION',
          reason: 'Monitor whether your thumbnail redesign improved your browse and search click-through percentages.',
        },
        {
          toolId: 'buffer',
          role: 'Community Post Scheduling',
          stage: 'distribution',
          stageLabel: 'PROMOTION',
          reason: 'Schedule promotional image teasers and poll announcements across your YouTube Community tab and socials.',
        },
      ],
    },
    grow: {
      primaryToolId: 'buffer',
      primaryRole: 'Cross-Promotion & Social Scheduling',
      primaryReason:
        'Repurpose your YouTube video releases into short text summaries, image quotes, and teasers across LinkedIn, X, and Instagram.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'High-CTR Packaging & Teasers',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Design eye-catching teaser cards and thumbnail variants to drive external traffic into your channel.',
        },
        {
          toolId: 'capcut',
          role: 'Shorts & Teaser Clip Extraction',
          stage: 'production',
          stageLabel: 'CLIPPING',
          reason: 'Quickly cut 30-second vertical highlights with animated subtitles from your long-form videos for YouTube Shorts.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Traffic Sources & Subscriber Conversion',
          stage: 'distribution',
          stageLabel: 'DIAGNOSTICS',
          reason: 'Identify whether viewers arrive from suggested videos, YouTube search, or external sites.',
        },
        {
          toolId: 'notion',
          role: 'Collab & Sponsorship CRM',
          stage: 'production',
          stageLabel: 'MANAGEMENT',
          reason: 'Organize guest collaborations, brand deal deliverables, and community milestone checklists.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'youtube-analytics',
      primaryRole: 'Native YouTube Intelligence Dashboard',
      primaryReason:
        'Unmatched precision into audience retention graphs, first-24-hour velocity, CTR by device, and returning vs. new viewer ratios.',
      supportingToolIds: [
        {
          toolId: 'notion',
          role: 'Performance Debriefs & Content Log',
          stage: 'production',
          stageLabel: 'DOCUMENTATION',
          reason: 'Log analytics takeaways after every release: which hook worked, why retention dropped, and lessons for the next shoot.',
        },
        {
          toolId: 'metricool',
          role: 'Multi-Network Benchmark Comparison',
          stage: 'distribution',
          stageLabel: 'BENCHMARKING',
          reason: 'Track how your YouTube growth rate correlates with your secondary social channels and external referrers.',
        },
        {
          toolId: 'canva',
          role: 'Iterative Thumbnail A/B Redesign',
          stage: 'packaging',
          stageLabel: 'ACTION',
          reason: 'Revamp low-CTR thumbnails with simplified typography and bold focal colors based on analytics alerts.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'Pacing & Hook Refinement',
          stage: 'production',
          stageLabel: 'RE-EDITING',
          reason: 'Use retention drop-off timestamps to tighten intros and eliminate slow pacing sections in future edits.',
        },
      ],
    },
  },

  tiktok: {
    edit: {
      primaryToolId: 'capcut',
      primaryRole: 'Vertical Video Editing & Fast Pacing',
      primaryReason:
        'The definitive editor for short-form: automated word-by-word captions, seamless beat syncing, dynamic zooms, and native TikTok export.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Cover Slides & Brand Assets',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Design consistent cover cards for your TikTok profile grid to make your account look curated and professional.',
        },
        {
          toolId: 'notion',
          role: '3-Second Hook & Script Bank',
          stage: 'production',
          stageLabel: 'PLANNING',
          reason: 'Catalog viral hook formulas, trending audio ideas, and structured 30-to-60 second spoken scripts.',
        },
        {
          toolId: 'tiktok-analytics',
          role: 'Watch-Time & Completion Analytics',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Study your video completion percentage and first-3-second retention curve to improve editing cuts.',
        },
        {
          toolId: 'buffer',
          role: 'Repurposing & Multi-Posting',
          stage: 'distribution',
          stageLabel: 'DISTRIBUTION',
          reason: 'Schedule and syndicate your edited TikTok vertical clips simultaneously to Instagram Reels and YouTube Shorts.',
        },
      ],
    },
    record: {
      primaryToolId: 'capcut',
      primaryRole: 'Mobile Camera Capture & Teleprompter',
      primaryReason:
        'Built-in smart teleprompter keeps your eyes on the lens while recording, with immediate access to rapid speed controls and filters.',
      supportingToolIds: [
        {
          toolId: 'notion',
          role: 'Hook & Script Teleprompter Drafts',
          stage: 'production',
          stageLabel: 'SCRIPTING',
          reason: 'Store bullet-point talking points and 15-second soundbites before you hit record.',
        },
        {
          toolId: 'canva',
          role: 'Visual Overlays & Green Screen Backgrounds',
          stage: 'packaging',
          stageLabel: 'VISUALS',
          reason: 'Create custom charts, news headlines, and aesthetic backgrounds for TikTok green-screen commentary.',
        },
        {
          toolId: 'tiktok-analytics',
          role: 'Audience Active Hours',
          stage: 'distribution',
          stageLabel: 'TIMING',
          reason: 'Find out the exact hours your followers are browsing so you record and post during peak activity.',
        },
        {
          toolId: 'metricool',
          role: 'Best Post-Time Scheduling',
          stage: 'distribution',
          stageLabel: 'DISTRIBUTION',
          reason: 'Plan your content drops around data-backed audience activity spikes.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'Hook Library & Short-Form Scripting',
      primaryReason:
        'Manage high-volume idea backlogs, track "Hook + Retain + Payoff" structures, and tag ideas by content pillars.',
      supportingToolIds: [
        {
          toolId: 'capcut',
          role: 'Rapid Assembly & Auto-Captions',
          stage: 'production',
          stageLabel: 'EDITING',
          reason: 'Turn written scripts into 45-second fast-paced videos with animated kinetic subtitles and b-roll cuts.',
        },
        {
          toolId: 'canva',
          role: 'Text Hook Slides & Carousel Cards',
          stage: 'packaging',
          stageLabel: 'GRAPHICS',
          reason: 'Convert written insights into swipeable TikTok photo-mode carousels for high save rates.',
        },
        {
          toolId: 'tiktok-analytics',
          role: 'Hook Retention Measurement',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Validate which written hook styles retain above 60% of viewers through the first 5 seconds.',
        },
        {
          toolId: 'buffer',
          role: 'Queue-Based Release',
          stage: 'distribution',
          stageLabel: 'SCHEDULING',
          reason: 'Queue up your weekly written batch so you maintain a steady cadence without manual daily posting.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'TikTok Carousel & Cover Studio',
      primaryReason:
        'Purpose-built 9:16 vertical canvas for photo-mode carousels, aesthetic typography, background removal, and grid thumbnails.',
      supportingToolIds: [
        {
          toolId: 'capcut',
          role: 'Animated Text & Transition Stitches',
          stage: 'production',
          stageLabel: 'ANIMATION',
          reason: 'Combine your designed static slides with subtle motion zooms and trending background audio.',
        },
        {
          toolId: 'adobe-express',
          role: 'Quick Asset Clean-Up & Cutouts',
          stage: 'packaging',
          stageLabel: 'ENHANCEMENT',
          reason: 'High-quality background remover and asset resizing for complementary story graphics.',
        },
        {
          toolId: 'notion',
          role: 'Brand Kit & Style Guidelines',
          stage: 'production',
          stageLabel: 'ORGANIZATION',
          reason: 'Keep your color hex codes, font rules, and repeatable carousel templates organized.',
        },
        {
          toolId: 'tiktok-analytics',
          role: 'Carousel Save & Share Rates',
          stage: 'distribution',
          stageLabel: 'METRICS',
          reason: 'Measure saves and shares, which TikTok’s algorithm heavily rewards on visual carousel posts.',
        },
      ],
    },
    grow: {
      primaryToolId: 'buffer',
      primaryRole: 'Automated Posting & Omnichannel Reach',
      primaryReason:
        'Schedule your TikTok video drops during peak viewer windows and auto-distribute them to Reels and Shorts.',
      supportingToolIds: [
        {
          toolId: 'capcut',
          role: 'High-Retention Video Editing',
          stage: 'production',
          stageLabel: 'RETENTION',
          reason: 'Apply dynamic zooms, sound effects, and kinetic subtitles that prevent users from scrolling away.',
        },
        {
          toolId: 'canva',
          role: 'Profile Brand Identity & Covers',
          stage: 'packaging',
          stageLabel: 'CONVERSION',
          reason: 'Turn casual FYP viewers into followers with a clean, branded profile banner and consistent cover art.',
        },
        {
          toolId: 'tiktok-analytics',
          role: 'Follower Growth & Sound Analytics',
          stage: 'distribution',
          stageLabel: 'INTELLIGENCE',
          reason: 'Track follower net changes and learn which videos drove the highest conversion to follow.',
        },
        {
          toolId: 'notion',
          role: 'Trend Log & Content Calendar',
          stage: 'production',
          stageLabel: 'WORKFLOW',
          reason: 'Save trending audio links, viral formats, and competitor inspiration for fast turnaround.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'tiktok-analytics',
      primaryRole: 'Native TikTok Creator Studio Metrics',
      primaryReason:
        'Direct access to first-3-second retention rates, average watch time, full video completion percentage, and viewer locations.',
      supportingToolIds: [
        {
          toolId: 'metricool',
          role: 'Multi-Channel Benchmarking',
          stage: 'distribution',
          stageLabel: 'MONITORING',
          reason: 'Compare how the exact same vertical video performs on TikTok versus Instagram Reels and Shorts.',
        },
        {
          toolId: 'notion',
          role: 'Viral Post Autopsy & Learning Log',
          stage: 'production',
          stageLabel: 'SYNTHESIS',
          reason: 'Break down why a video blew up: hook angle, length, sound, and audience comments for future shoots.',
        },
        {
          toolId: 'capcut',
          role: 'Pacing Optimization',
          stage: 'production',
          stageLabel: 'ITERATION',
          reason: 'Trim pauses and accelerate cut speed based on drop-off trends revealed in your retention graphs.',
        },
        {
          toolId: 'canva',
          role: 'Cover A/B Optimization',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Iterate on cover text styling for your profile playlist to boost long-tail catalog views.',
        },
      ],
    },
  },

  instagram: {
    edit: {
      primaryToolId: 'capcut',
      primaryRole: 'Reels Editing & Dynamic Transitions',
      primaryReason:
        'Fluid vertical video editing, seamless jump cuts, trending beat alignment, and high-fidelity 1080x1920 export presets.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Cover Slides & Story Highlight Art',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Design grid-aligned 1:1 preview covers and 9:16 full-screen reel title cards.',
        },
        {
          toolId: 'notion',
          role: 'Reels Hooks & Caption Copy',
          stage: 'production',
          stageLabel: 'WRITING',
          reason: 'Draft high-engagement captions with clean line-breaks, call-to-actions, and hashtag categories.',
        },
        {
          toolId: 'instagram-insights',
          role: 'Reels Reach & Save Insights',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Evaluate non-follower reach percentages and save-to-like ratios for every published reel.',
        },
        {
          toolId: 'buffer',
          role: 'Scheduled Feed & Reels Publishing',
          stage: 'distribution',
          stageLabel: 'SCHEDULING',
          reason: 'Auto-publish reels and carousel updates directly to your feed at your community’s prime hours.',
        },
      ],
    },
    record: {
      primaryToolId: 'capcut',
      primaryRole: 'High-Resolution Mobile Video Capture',
      primaryReason:
        'Smooth mobile recording with teleprompter support and instant background noise reduction.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Stories & Reels Templates',
          stage: 'packaging',
          stageLabel: 'TEMPLATES',
          reason: 'Prepare clean branding frames and graphic slides to mix with your recorded live footage.',
        },
        {
          toolId: 'notion',
          role: 'Content Pillars & Daily Prompt Notes',
          stage: 'production',
          stageLabel: 'PLANNING',
          reason: 'Organize your weekly posting rotation across educational, behind-the-scenes, and conversational formats.',
        },
        {
          toolId: 'instagram-insights',
          role: 'Active Follower Hours',
          stage: 'distribution',
          stageLabel: 'TIMING',
          reason: 'Check when your Instagram audience is online to schedule your stories and lives.',
        },
        {
          toolId: 'buffer',
          role: 'Automated Post Queue',
          stage: 'distribution',
          stageLabel: 'SCHEDULING',
          reason: 'Maintain consistent daily presence without having to manually publish on the go.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'Caption Writing & Carousel Scripting',
      primaryReason:
        'Structure educational swipe carousels (Slide 1 Hook, Slides 2–7 Value, Slide 8 CTA) and polish long-form captions.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Multi-Slide Carousel Typography',
          stage: 'packaging',
          stageLabel: 'DESIGN',
          reason: 'Convert your Notion slide outlines into visually seamless seamless-swipe Instagram carousels.',
        },
        {
          toolId: 'buffer',
          role: 'First-Comment & Carousel Auto-Post',
          stage: 'distribution',
          stageLabel: 'PUBLISHING',
          reason: 'Schedule 10-slide carousels with automated first comments for resource links and hashtags.',
        },
        {
          toolId: 'instagram-insights',
          role: 'Saves & Shares Measurement',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Carousels win on saves and shares. Track which written topics inspire followers to bookmark your post.',
        },
        {
          toolId: 'google-drive',
          role: 'Brand Asset & Photography Hub',
          stage: 'production',
          stageLabel: 'ASSETS',
          reason: 'Store high-resolution lifestyle photography, brand icons, and team assets.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'Instagram Visual Suite & Carousels',
      primaryReason:
        'Industry standard for creator carousels, story stickers, profile banners, highlight covers, and grid aesthetics.',
      supportingToolIds: [
        {
          toolId: 'adobe-express',
          role: 'Quick Animated Social Graphics',
          stage: 'packaging',
          stageLabel: 'ANIMATION',
          reason: 'Add subtle text animations and quick-crop elements for dynamic Instagram Story announcements.',
        },
        {
          toolId: 'notion',
          role: 'Visual Content Calendar & Grid Planner',
          stage: 'production',
          stageLabel: 'GRID PLANNER',
          reason: 'Preview how your feed colors and cover styles balance next to each other before publishing.',
        },
        {
          toolId: 'buffer',
          role: 'Visual Grid Preview & Scheduling',
          stage: 'distribution',
          stageLabel: 'DISPATCH',
          reason: 'Arrange upcoming posts on an interactive 9-grid preview and schedule release times.',
        },
        {
          toolId: 'instagram-insights',
          role: 'Aesthetic Engagement Feedback',
          stage: 'distribution',
          stageLabel: 'EVALUATION',
          reason: 'See which color schemes and typography layouts generate the highest profile visits.',
        },
      ],
    },
    grow: {
      primaryToolId: 'buffer',
      primaryRole: 'Omnichannel Social Scheduling & Queues',
      primaryReason:
        'Maintain a consistent 5x/week posting rhythm across Reels, single photos, and carousels without burnout.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'High-Shareability Carousel Graphics',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Design educational graphics with high share-value that followers repost to their personal stories.',
        },
        {
          toolId: 'capcut',
          role: 'Trending Reels Audio & Edits',
          stage: 'production',
          stageLabel: 'VIDEO',
          reason: 'Produce fast 7-second looping reels with text overlays that trigger algorithm recommendations.',
        },
        {
          toolId: 'instagram-insights',
          role: 'Non-Follower Reach Tracking',
          stage: 'distribution',
          stageLabel: 'DISCOVERY',
          reason: 'Monitor what percentage of your reach came from explore and reels discovery versus existing followers.',
        },
        {
          toolId: 'notion',
          role: 'Sponsorship & Collab Pipeline',
          stage: 'production',
          stageLabel: 'ORGANIZATION',
          reason: 'Track outbound influencer outreach, joint lives, and brand sponsorship contracts.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'instagram-insights',
      primaryRole: 'Official Professional Dashboard Insights',
      primaryReason:
        'First-party visibility into non-follower discovery, reel replay counts, profile link taps, and follower demographics.',
      supportingToolIds: [
        {
          toolId: 'metricool',
          role: 'Unified Cross-Account Analytics',
          stage: 'distribution',
          stageLabel: 'BENCHMARK',
          reason: 'Monitor 90-day follower velocity and compare post formats (Reels vs. Carousels vs. Stories) side-by-side.',
        },
        {
          toolId: 'notion',
          role: 'Strategy Synthesis & Retrospective',
          stage: 'production',
          stageLabel: 'LEARNING',
          reason: 'Log top-performing hooks, best posting hours, and audience demographics to steer monthly strategy.',
        },
        {
          toolId: 'canva',
          role: 'Visual Optimization',
          stage: 'packaging',
          stageLabel: 'DESIGN',
          reason: 'Refine cover design and font sizes based on which reels earned the highest profile visits.',
        },
        {
          toolId: 'buffer',
          role: 'Post Cadence Adjustment',
          stage: 'distribution',
          stageLabel: 'EXECUTION',
          reason: 'Shift your scheduled queue slots to align with updated follower active hours.',
        },
      ],
    },
  },

  podcast: {
    edit: {
      primaryToolId: 'descript',
      primaryRole: 'Transcript-Based Audio & Video Editing',
      primaryReason:
        'Edit conversations like a word document. Remove "ums", silence gaps, and generate studio-sound acoustic polish in one click.',
      supportingToolIds: [
        {
          toolId: 'riverside',
          role: 'Remote High-Fidelity Recording',
          stage: 'production',
          stageLabel: 'SOURCE',
          reason: 'Records uncompressed 48kHz WAV audio and 4K video locally on every speaker’s machine.',
        },
        {
          toolId: 'canva',
          role: 'Episode Cover Art & Audiogram Cards',
          stage: 'packaging',
          stageLabel: 'BRANDING',
          reason: 'Design 3000x3000px Apple/Spotify compliant episode covers and promotional square quote cards.',
        },
        {
          toolId: 'notion',
          role: 'Show Notes & Timestamp Generator',
          stage: 'production',
          stageLabel: 'NOTES',
          reason: 'Compile guest bios, resource links, chapter timestamps, and sponsor acknowledgments.',
        },
        {
          toolId: 'buffer',
          role: 'Social Episode Announcement',
          stage: 'distribution',
          stageLabel: 'PROMOTION',
          reason: 'Schedule release teasers, audiograms, and guest quote graphics across all social platforms.',
        },
      ],
    },
    record: {
      primaryToolId: 'riverside',
      primaryRole: 'Studio-Grade Local Audio & 4K Capture',
      primaryReason:
        'Eliminates internet glitch artifacts by recording separate uncompressed WAV audio tracks locally on each host and guest device.',
      supportingToolIds: [
        {
          toolId: 'descript',
          role: 'Rapid Cut & Studio Sound Enhancer',
          stage: 'production',
          stageLabel: 'POST-PRODUCTION',
          reason: 'Import Riverside tracks to automatically remove room echo, balance volume, and edit out pauses.',
        },
        {
          toolId: 'notion',
          role: 'Guest Briefing & Question Outline',
          stage: 'production',
          stageLabel: 'PREP',
          reason: 'Share a synchronized preparation doc with guests beforehand including topic prompts and tech checklists.',
        },
        {
          toolId: 'canva',
          role: 'Guest Quote Graphics & Video Thumbnails',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Create customized promotional assets featuring your guest’s portrait and key soundbite.',
        },
        {
          toolId: 'google-drive',
          role: 'Raw WAV & Multitrack Backup',
          stage: 'production',
          stageLabel: 'STORAGE',
          reason: 'Reliable cold storage archive for master recording sessions and uncompressed episode masters.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'Show Bible, Research & Show Notes',
      primaryReason:
        'The premier hub for episode outlines, guest background research, interview questioning arcs, and sponsor talking points.',
      supportingToolIds: [
        {
          toolId: 'descript',
          role: 'Transcript Verification & Quotes',
          stage: 'production',
          stageLabel: 'TRANSCRIPTS',
          reason: 'Generate accurate full-episode transcripts to pull pulling pull-quotes for newsletters and blog recaps.',
        },
        {
          toolId: 'google-drive',
          role: 'Guest Release Forms & Research PDF Archive',
          stage: 'production',
          stageLabel: 'ARCHIVE',
          reason: 'Store signed appearance releases, book excerpts, and background materials.',
        },
        {
          toolId: 'canva',
          role: 'Visual Show Notes & Quote Slides',
          stage: 'packaging',
          stageLabel: 'GRAPHICS',
          reason: 'Turn written episode key takeaways into shareable infographic slides.',
        },
        {
          toolId: 'buffer',
          role: 'Newsletter & Social Episode Blurb',
          stage: 'distribution',
          stageLabel: 'SYNDICATION',
          reason: 'Broadcast your episode synopsis and listening links to social channels on launch morning.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'Podcast Cover & Audiogram Design',
      primaryReason:
        'Pre-made templates for 3000x3000px podcast square cover artwork, episode badging, audiogram backgrounds, and quote cards.',
      supportingToolIds: [
        {
          toolId: 'descript',
          role: 'Audiogram Video Clip Generator',
          stage: 'production',
          stageLabel: 'AUDIOGRAM',
          reason: 'Combine your Canva background graphics with animated audio waveforms and moving captions for social clips.',
        },
        {
          toolId: 'notion',
          role: 'Brand Style Guide & Episode Assets',
          stage: 'production',
          stageLabel: 'ASSETS',
          reason: 'Keep typography pairings, cover badges, and recurring visual guidelines organized for your team.',
        },
        {
          toolId: 'buffer',
          role: 'Teaser Graphic Distribution',
          stage: 'distribution',
          stageLabel: 'SCHEDULING',
          reason: 'Schedule visual teaser countdowns across Twitter/X, LinkedIn, and Instagram leading up to launch.',
        },
        {
          toolId: 'riverside',
          role: 'High-Res Guest Headshots Capture',
          stage: 'production',
          stageLabel: 'SOURCE',
          reason: 'Grab uncompressed 4K video frame stills of your guest during recording to use in episode artwork.',
        },
      ],
    },
    grow: {
      primaryToolId: 'buffer',
      primaryRole: 'Episode Teaser & Multi-Channel Syndication',
      primaryReason:
        'Schedule weekly launch announcements, audiograms, and guest quote carousels to maintain continuous discoverability.',
      supportingToolIds: [
        {
          toolId: 'descript',
          role: 'Vertical Video Soundbite Clipping',
          stage: 'production',
          stageLabel: 'CLIPS',
          reason: 'Extract 45-second video shorts with karaoke-style captions from your podcast video to post on TikTok & Shorts.',
        },
        {
          toolId: 'canva',
          role: 'High-Contrast Quote Cards',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Design eye-catching soundbite quotes that guests will enthusiastically reshare with their existing audience.',
        },
        {
          toolId: 'metricool',
          role: 'Social Discovery & Link Click Tracking',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Analyze which social promotional clips actually drove the most outbound clicks to Spotify and Apple Podcasts.',
        },
        {
          toolId: 'notion',
          role: 'Guest Outreach & Cross-Promotion CRM',
          stage: 'production',
          stageLabel: 'RELATIONSHIPS',
          reason: 'Coordinate partner cross-promotions, podcast guest swaps, and newsletter shoutouts.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'metricool',
      primaryRole: 'Omnichannel Campaign & Outbound Traffic',
      primaryReason:
        'Track outbound link clicks from social channels directly to your podcast listening landing pages alongside audience growth.',
      supportingToolIds: [
        {
          toolId: 'notion',
          role: 'Download Tracking & Episode Log',
          stage: 'production',
          stageLabel: 'RECORD',
          reason: 'Maintain a centralized record of 30-day downloads per episode, tracking which guest topics outperform.',
        },
        {
          toolId: 'canva',
          role: 'Sponsor Deck & Media Kit Generation',
          stage: 'packaging',
          stageLabel: 'MEDIA KIT',
          reason: 'Turn verified download numbers and audience demographics into a crisp visual sponsorship kit.',
        },
        {
          toolId: 'descript',
          role: 'Audience Pacing & Intro Refinement',
          stage: 'production',
          stageLabel: 'REFINEMENT',
          reason: 'Shorten episode preamble intros and tighten banter to boost overall episode completion rates.',
        },
        {
          toolId: 'buffer',
          role: 'Promo Cadence Optimization',
          stage: 'distribution',
          stageLabel: 'DISTRIBUTION',
          reason: 'Adjust social promotional intervals based on when listener traffic spikes occur during the week.',
        },
      ],
    },
  },

  gaming: {
    edit: {
      primaryToolId: 'davinci-resolve',
      primaryRole: 'High-Framerate Gameplay Montage & Cuts',
      primaryReason:
        'Handles 60fps/120fps high-bitrate gameplay footage smoothly, with multi-track game audio vs. discord mic balancing.',
      supportingToolIds: [
        {
          toolId: 'obs-studio',
          role: 'Lossless Gameplay & Mic Capture',
          stage: 'production',
          stageLabel: 'SOURCE',
          reason: 'Separates game sound, Discord chat, and your mic into isolated audio tracks for seamless editing.',
        },
        {
          toolId: 'canva',
          role: 'High-CTR Gaming Thumbnails',
          stage: 'packaging',
          stageLabel: 'THUMBNAILS',
          reason: 'Combine game screenshots, expressive face cutouts, and high-impact outlined text for YouTube search.',
        },
        {
          toolId: 'capcut',
          role: 'Quick Viral Gaming Shorts & Clips',
          stage: 'production',
          stageLabel: 'CLIPS',
          reason: 'Fast vertical reformatting, zooms onto kill feeds, and dynamic subtitles for TikTok and Shorts.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Retention & Highlight Drop-Off',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'See which gameplay moments kept viewers watching and cut out slow inventory navigation.',
        },
      ],
    },
    record: {
      primaryToolId: 'obs-studio',
      primaryRole: 'Zero-Lag Game Capture & Stream Control',
      primaryReason:
        'Direct GPU game capture hook, custom scene transitions, and multi-track audio recording with near-zero performance penalty.',
      supportingToolIds: [
        {
          toolId: 'streamlabs',
          role: 'Stream Overlays, Alerts & Chatbot',
          stage: 'packaging',
          stageLabel: 'STREAM OVERLAYS',
          reason: 'Plug-and-play alert animations for new followers, subs, and live chat overlays on screen.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'VOD Highlight Trimming',
          stage: 'production',
          stageLabel: 'POST-PRODUCTION',
          reason: 'Quickly cut 4-hour live stream recordings down to exciting 15-minute YouTube highlight videos.',
        },
        {
          toolId: 'canva',
          role: 'Twitch/YouTube Offline Banners & Badges',
          stage: 'packaging',
          stageLabel: 'GRAPHICS',
          reason: 'Design channel panels, stream schedule graphics, and custom emotes.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Stream Concurrency & VOD Watch Time',
          stage: 'distribution',
          stageLabel: 'METRICS',
          reason: 'Identify which games and stream titles delivered the highest average viewer duration.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'Gaming Guides, Lore Outlines & Walkthroughs',
      primaryReason:
        'Structure in-depth game guides, weapon stat comparisons, boss walkthrough steps, and YouTube script timelines.',
      supportingToolIds: [
        {
          toolId: 'obs-studio',
          role: 'Specific Scenario Footage Recording',
          stage: 'production',
          stageLabel: 'CAPTURE',
          reason: 'Record specific gameplay examples and timestamped clips to illustrate your written points.',
        },
        {
          toolId: 'canva',
          role: 'Stat Charts & Infographic Thumbnails',
          stage: 'packaging',
          stageLabel: 'GRAPHICS',
          reason: 'Design tier-list graphics and visual stat comparison charts for your video and community posts.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'Scripted Video Essay Editing',
          stage: 'production',
          stageLabel: 'EDITING',
          reason: 'Sync voiceover pacing with game lore footage and atmospheric soundtrack cues.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Viewer Chapter Retention',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Check which written tips viewers replayed most often in the video timeline.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'High-Impact Gaming Thumbnails & Badges',
      primaryReason:
        'Fast thumbnail creation with glow effects, neon text accents, character cutouts, and 16:9 gaming layouts.',
      supportingToolIds: [
        {
          toolId: 'streamlabs',
          role: 'Live HUD Overlays & Alert Themes',
          stage: 'packaging',
          stageLabel: 'STREAM HUD',
          reason: 'Equip animated webcam borders, custom donation bars, and matching alert themes.',
        },
        {
          toolId: 'obs-studio',
          role: 'Live Scene Compositing',
          stage: 'production',
          stageLabel: 'SCENES',
          reason: 'Layer your designed graphics over game captures and webcams with chroma-key transparency.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Thumbnail CTR Monitoring',
          stage: 'distribution',
          stageLabel: 'CTR',
          reason: 'Test whether high-contrast character art improves browse feature click-through rates.',
        },
        {
          toolId: 'buffer',
          role: 'Stream Schedule Announcements',
          stage: 'distribution',
          stageLabel: 'DISPATCH',
          reason: 'Post weekly stream calendars with eye-catching designs across Discord and Twitter/X.',
        },
      ],
    },
    grow: {
      primaryToolId: 'capcut',
      primaryRole: 'Viral Gaming Clips & Shorts Repurposing',
      primaryReason:
        'Turn clutch gaming moments and funny stream reactions into fast vertical clips for TikTok, Reels, and YouTube Shorts.',
      supportingToolIds: [
        {
          toolId: 'buffer',
          role: 'Automated Multi-Platform Clip Distribution',
          stage: 'distribution',
          stageLabel: 'SYNDICATION',
          reason: 'Post your daily gaming highlight across TikTok, Instagram Reels, and YouTube Shorts simultaneously.',
        },
        {
          toolId: 'canva',
          role: 'Viral Thumbnail & Cover Art',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Create bold preview art with expressive reactions to catch viewers scrolling on their phones.',
        },
        {
          toolId: 'youtube-analytics',
          role: 'Shorts vs. Long-Form Subscriber Attribution',
          stage: 'distribution',
          stageLabel: 'INSIGHTS',
          reason: 'Track how many new viewers converted into regular livestream fans from your vertical clips.',
        },
        {
          toolId: 'notion',
          role: 'Stream Collaboration & Tournament Tracker',
          stage: 'production',
          stageLabel: 'ORGANIZATION',
          reason: 'Coordinate group games with other creators and schedule community tournament nights.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'youtube-analytics',
      primaryRole: 'Audience Loyalty & Retention Metrics',
      primaryReason:
        'Discover which games retain viewers longest, average view durations, and what external search terms lead to your channel.',
      supportingToolIds: [
        {
          toolId: 'metricool',
          role: 'Multi-Platform Community Tracking',
          stage: 'distribution',
          stageLabel: 'CROSS-PLATFORM',
          reason: 'Track cross-channel community expansion across YouTube, Twitch, Twitter/X, and TikTok.',
        },
        {
          toolId: 'notion',
          role: 'Game Performance Log & Review',
          stage: 'production',
          stageLabel: 'LOGGING',
          reason: 'Track metrics by game title to make informed decisions on what series to continue playing.',
        },
        {
          toolId: 'canva',
          role: 'Thumbnail Refresh Studio',
          stage: 'packaging',
          stageLabel: 'ITERATION',
          reason: 'Update low-performing thumbnails with brighter game logos and simplified facial expressions.',
        },
        {
          toolId: 'davinci-resolve',
          role: 'Montage Pacing Refinement',
          stage: 'production',
          stageLabel: 'EDITING',
          reason: 'Cut gameplay intros down to 5 seconds based on viewer drop-off analytics.',
        },
      ],
    },
  },

  other: {
    edit: {
      primaryToolId: 'capcut',
      primaryRole: 'Fast Versatile Video Assembly',
      primaryReason:
        'Universal multi-aspect-ratio editor suitable for desktop and mobile, with automated subtitles and straightforward timeline controls.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Graphics & Presentation Visuals',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Create title slides, diagrams, and video cards in any aspect ratio.',
        },
        {
          toolId: 'notion',
          role: 'Content Outline & Production Tracker',
          stage: 'production',
          stageLabel: 'WORKFLOW',
          reason: 'Organize project deliverables, review feedback, and keep asset checklists in check.',
        },
        {
          toolId: 'buffer',
          role: 'Multi-Channel Publishing',
          stage: 'distribution',
          stageLabel: 'DISTRIBUTION',
          reason: 'Distribute your finalized video deliverables across target channels with automated scheduling.',
        },
        {
          toolId: 'google-drive',
          role: 'Master Export Backup & Client Delivery',
          stage: 'production',
          stageLabel: 'DELIVERY',
          reason: 'Store master renders securely and generate easy download links for partners or clients.',
        },
      ],
    },
    record: {
      primaryToolId: 'obs-studio',
      primaryRole: 'Universal Screen & Audio Capture',
      primaryReason:
        'Dependable open-source recording for webinars, desktop software tutorials, multi-source cameras, and presentations.',
      supportingToolIds: [
        {
          toolId: 'descript',
          role: 'Transcript-Driven Cleanup & Audio Polish',
          stage: 'production',
          stageLabel: 'EDITING',
          reason: 'Quickly remove filler words and apply studio-level microphone clarity to recorded sessions.',
        },
        {
          toolId: 'canva',
          role: 'Slide Decks & Presentation Templates',
          stage: 'packaging',
          stageLabel: 'SLIDES',
          reason: 'Build sleek presentation decks to present smoothly during recording.',
        },
        {
          toolId: 'notion',
          role: 'Session Outline & Speaker Prompts',
          stage: 'production',
          stageLabel: 'PREP',
          reason: 'Keep detailed notes, agendas, and speaking points visible on your second monitor.',
        },
        {
          toolId: 'google-drive',
          role: 'Session Archive & Shared Folder',
          stage: 'production',
          stageLabel: 'ARCHIVE',
          reason: 'Archive multi-gigabyte session recordings safely with automatic cloud sync.',
        },
      ],
    },
    write: {
      primaryToolId: 'notion',
      primaryRole: 'All-in-One Writing Workspace & Knowledge Base',
      primaryReason:
        'The most versatile modern writing platform for newsletters, essays, course curriculums, and multi-channel publication calendars.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Header Banners & Editorial Graphics',
          stage: 'packaging',
          stageLabel: 'GRAPHICS',
          reason: 'Design crisp newsletter headers, blog hero graphics, and visual summaries.',
        },
        {
          toolId: 'buffer',
          role: 'Article Distribution & Micro-Blogging',
          stage: 'distribution',
          stageLabel: 'DISTRIBUTION',
          reason: 'Schedule teaser threads and article announcements across your social channels.',
        },
        {
          toolId: 'google-drive',
          role: 'Long-Term Research & Document Vault',
          stage: 'production',
          stageLabel: 'VAULT',
          reason: 'Archive reference papers, interview transcripts, and large media files.',
        },
        {
          toolId: 'metricool',
          role: 'Reader Engagement & Traffic Analysis',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'Monitor social click-through velocity on your written content links.',
        },
      ],
    },
    design: {
      primaryToolId: 'canva',
      primaryRole: 'Universal Creative Design Platform',
      primaryReason:
        'Covers every digital format: social posts, pitch decks, flyers, logos, website banners, and animated graphics with drag-and-drop ease.',
      supportingToolIds: [
        {
          toolId: 'adobe-express',
          role: 'Quick Media Conversion & Micro-Assets',
          stage: 'packaging',
          stageLabel: 'ENHANCEMENT',
          reason: 'Instant background removal, QR code generation, and fast photo adjustments.',
        },
        {
          toolId: 'notion',
          role: 'Design System & Brand Guidelines',
          stage: 'production',
          stageLabel: 'GUIDELINES',
          reason: 'Keep brand typography, color palettes, tone guidelines, and assets accessible to your team.',
        },
        {
          toolId: 'buffer',
          role: 'Visual Portfolio Showcase',
          stage: 'distribution',
          stageLabel: 'SHOWCASE',
          reason: 'Schedule consistent visual posts across your professional social portfolios.',
        },
        {
          toolId: 'google-drive',
          role: 'Raw Asset Storage & Vector Archives',
          stage: 'production',
          stageLabel: 'STORAGE',
          reason: 'Secure central backup for raw photography, layered files, and master font licenses.',
        },
      ],
    },
    grow: {
      primaryToolId: 'buffer',
      primaryRole: 'Multi-Channel Publishing & Queue Engine',
      primaryReason:
        'Centralize all outbound social distribution, plan content calendars, and prevent inconsistent broadcast gaps.',
      supportingToolIds: [
        {
          toolId: 'canva',
          role: 'Social Visuals & Promotional Cards',
          stage: 'packaging',
          stageLabel: 'PACKAGING',
          reason: 'Produce branded visual assets that increase link engagement and message clarity.',
        },
        {
          toolId: 'notion',
          role: 'Growth Experiments & Lead Pipeline',
          stage: 'production',
          stageLabel: 'EXPERIMENTS',
          reason: 'Track audience growth experiments, conversion hypotheses, and partnership outreach.',
        },
        {
          toolId: 'metricool',
          role: 'Cross-Network Reach & Audience Analytics',
          stage: 'distribution',
          stageLabel: 'ANALYTICS',
          reason: 'View audience growth curves and best engagement time windows in one single place.',
        },
        {
          toolId: 'capcut',
          role: 'Promotional Teaser Clip Assembly',
          stage: 'production',
          stageLabel: 'MEDIA',
          reason: 'Quickly cut promotional video teasers to accompany product and content launches.',
        },
      ],
    },
    analyze: {
      primaryToolId: 'metricool',
      primaryRole: 'Multi-Platform Community & Traffic Intelligence',
      primaryReason:
        'Combines web traffic, social reach, post interactions, and competitor tracking into one unified executive dashboard.',
      supportingToolIds: [
        {
          toolId: 'notion',
          role: 'Monthly KPI Review & Strategy Docs',
          stage: 'production',
          stageLabel: 'REPORTING',
          reason: 'Summarize analytics observations into actionable quarterly objectives and key results.',
        },
        {
          toolId: 'canva',
          role: 'Executive Reports & Presentation Decks',
          stage: 'packaging',
          stageLabel: 'PRESENTATION',
          reason: 'Transform raw data metrics into visual charts and sponsor-ready reporting decks.',
        },
        {
          toolId: 'buffer',
          role: 'Post Schedule Optimization',
          stage: 'distribution',
          stageLabel: 'CALIBRATION',
          reason: 'Calibrate future posting queues to match the proven high-engagement days identified in analytics.',
        },
        {
          toolId: 'google-drive',
          role: 'Historical CSV & Report Archive',
          stage: 'production',
          stageLabel: 'ARCHIVE',
          reason: 'Safeguard long-term monthly exports and audience demographic spreadsheets.',
        },
      ],
    },
  },
};

export function recommendCreatorStack(platform: PlatformId, goal: GoalId): CreatorStackResult {
  const platformConfig = REC_MATRIX[platform] || REC_MATRIX.other;
  const rule = platformConfig[goal] || REC_MATRIX.other[goal] || REC_MATRIX.other.edit!;

  const toolMap = new Map<string, Tool>();
  TOOLS.forEach((t) => toolMap.set(t.id, t));

  const recommendations: StackRecommendation[] = [];

  // 1. Primary Tool (The Core Engine)
  const primaryTool = toolMap.get(rule.primaryToolId);
  if (primaryTool) {
    recommendations.push({
      tool: primaryTool,
      role: rule.primaryRole,
      workflowStage: 'primary',
      stageLabel: 'CORE TOOL',
      reason: rule.primaryReason,
      isHero: true,
    });
  }

  // 2. Supporting Workflow Tools (Pre-production, Packaging, Distribution, Analytics)
  for (const item of rule.supportingToolIds) {
    const tool = toolMap.get(item.toolId);
    if (tool && tool.id !== rule.primaryToolId) {
      recommendations.push({
        tool,
        role: item.role,
        workflowStage: item.stage,
        stageLabel: item.stageLabel,
        reason: item.reason,
      });
    }
  }

  const platformLabel = getPlatformLabel(platform);
  const goalLabel = getGoalLabel(goal);

  // Dynamic context sentence
  const contextSummary = `A focused ${recommendations.length}-tool setup for ${goalLabel.toLowerCase()}ing on ${platformLabel}. Built for practical execution without unnecessary bloat.`;
  const headline = `Your ${platformLabel} ${goalLabel} Stack`;

  return {
    platform,
    goal,
    platformLabel,
    goalLabel,
    headline,
    contextSummary,
    recommendations,
  };
}
