import { NavItem, UserRole } from '../types';
import {
  LayoutDashboard,
  UserCircle,
  Megaphone,
  Search,
  Wand2,
  BarChart3,
  MessageSquare,
  Settings,
  PlusCircle,
  Users,
  Briefcase,
  Star,
} from 'lucide-react';

export const USER_ROLES = ["influencer", "brand", "agency"] as const;

export const ROLE_DISPLAY_NAMES: Record<Exclude<UserRole, null>, string> = {
  influencer: "Influencer",
  brand: "Brand",
  agency: "Agency",
};

export const ROLE_ICONS: Record<Exclude<UserRole, null>, React.ElementType> = {
  influencer: Star,
  brand: Briefcase,
  agency: Users,
};


export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['influencer', 'brand', 'agency'],
  },
  {
    href: '/dashboard/profile',
    label: 'My Profile',
    icon: UserCircle,
    roles: ['influencer', 'brand', 'agency'],
  },
  {
    href: '/dashboard/campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    roles: ['influencer', 'brand', 'agency'],
  },
  {
    href: '/dashboard/campaigns/create',
    label: 'Create Campaign',
    icon: PlusCircle,
    roles: ['brand', 'agency'],
  },
  {
    href: '/dashboard/discover',
    label: 'Discover Influencers',
    icon: Search,
    roles: ['brand', 'agency'],
  },
  {
    href: '/dashboard/ai-matching',
    label: 'AI Matching',
    icon: Wand2,
    roles: ['brand', 'agency'],
  },
  {
    // Example: /dashboard/analytics (overview) or specific campaign analytics
    // For now, let's make a generic analytics link, specific campaign analytics will be linked from campaign cards
    href: '/dashboard/analytics',
    label: 'Analytics Overview',
    icon: BarChart3,
    roles: ['brand', 'agency'],
    disabled: true, // Placeholder, enable when page is ready
  },
  {
    href: '/dashboard/messages',
    label: 'Messages',
    icon: MessageSquare,
    roles: ['influencer', 'brand', 'agency'],
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    roles: ['influencer', 'brand', 'agency'],
    disabled: true, // Placeholder
  },
];

export const MOCK_INFLUENCER_NICHES = [
  "Fashion", "Tech", "Food", "Travel", "Gaming", "Beauty", "Fitness", "Lifestyle", "Parenting", "Education"
];

export const MOCK_SOCIAL_PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook", "Pinterest", "LinkedIn"];
