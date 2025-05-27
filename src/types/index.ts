
export type UserRole = "influencer" | "brand" | "agency" | null;

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface InfluencerProfile {
  userId: string;
  bio: string;
  niche: string[]; // e.g., ["fashion", "tech"]
  location: string;
  profilePictureUrl?: string;
  socialMediaLinks: { platform: string; url: string; followers: number }[];
  audienceDemographics: {
    ageRange: string; // e.g., "18-24"
    genderSplit: { male: number; female: number; other: number }; // percentages
    topLocations: string[];
  };
  engagementRate: number; // percentage
  completedCampaigns?: number;
  portfolioHighlights?: string[];
}

export interface BrandProfile {
  userId: string;
  companyName: string;
  industry: string;
  website: string;
  companyLogoUrl?: string;
  companyDescription?: string;
}

export interface AgencyProfile {
  userId: string;
  agencyName: string;
  specialization: string[];
  website: string;
  agencyLogoUrl?: string;
  clientList?: string[];
}

export type CampaignStatus = "draft" | "active" | "paused" | "completed" | "archived";

export interface Campaign {
  id: string;
  brandId: string; // or agencyId
  name: string;
  goals: string; // e.g., "Increase brand awareness", "Drive sales"
  targetAudience: string; // Description
  budget: number;
  description: string;
  contentRequirements: string; // e.g., "3 Instagram posts, 1 YouTube video"
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: CampaignStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // For AI Matching
  influencerNiche?: string; 
  targetAudienceDemographics?: string;
}

export interface CampaignAnalyticsData {
  campaignId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  engagementRate: number; // Overall campaign engagement
  spend: number;
  dataPoints: { date: string; impressions: number; clicks: number; conversions: number }[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string; // ISO date string
  read: boolean;
}

export interface Chat {
  id: string;
  participantIds: string[]; // [userId1, userId2]
  lastMessage?: Message;
  updatedAt: string;
}

// For AI Influencer Matching flow
export type { AIInfluencerMatchingInput, AIInfluencerMatchingOutput } from '../ai/flows/ai-influencer-matching';
// For Campaign Summary flow
export type { CampaignSummaryInput, CampaignSummaryOutput } from '../ai/flows/campaign-summary';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[]; // Roles that can see this nav item
  subItems?: NavItem[];
  disabled?: boolean;
}
