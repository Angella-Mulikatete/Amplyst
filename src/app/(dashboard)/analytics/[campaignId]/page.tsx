"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { CampaignAnalyticsDisplay } from "@/components/dashboard/CampaignAnalyticsDisplay";
import type { Campaign, CampaignAnalyticsData } from "@/types";
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for a specific campaign and its analytics
const MOCK_CAMPAIGNS_DB: Campaign[] = [
  { id: '1', brandId: 'brand1', name: 'Eco-Friendly Product Launch', goals: 'Increase awareness...', targetAudience: 'Millennials...', budget: 5000, description: 'Desc1', contentRequirements: 'Req1', startDate: '2024-08-01T00:00:00Z', endDate: '2024-09-01T00:00:00Z', status: 'active', createdAt: '2024-07-15T00:00:00Z', updatedAt: '2024-07-15T00:00:00Z' },
  { id: '2', brandId: 'brand2', name: 'Mobile Game Promotion', goals: 'Drive downloads...', targetAudience: 'Gamers...', budget: 10000, description: 'Desc2', contentRequirements: 'Req2', startDate: '2024-07-20T00:00:00Z', endDate: '2024-08-20T00:00:00Z', status: 'draft', createdAt: '2024-07-10T00:00:00Z', updatedAt: '2024-07-10T00:00:00Z' },
];

const MOCK_ANALYTICS_DB: Record<string, CampaignAnalyticsData> = {
  '1': {
    campaignId: '1',
    impressions: 1250000,
    clicks: 62500,
    conversions: 1250,
    engagementRate: 4.8,
    spend: 4500,
    dataPoints: [
      { date: '2024-08-01', impressions: 50000, clicks: 2500, conversions: 50 },
      { date: '2024-08-02', impressions: 55000, clicks: 2800, conversions: 60 },
      { date: '2024-08-03', impressions: 60000, clicks: 3000, conversions: 55 },
      { date: '2024-08-04', impressions: 52000, clicks: 2600, conversions: 45 },
      { date: '2024-08-05', impressions: 65000, clicks: 3200, conversions: 70 },
    ],
  },
   '2': {
    campaignId: '2',
    impressions: 800000,
    clicks: 40000,
    conversions: 800,
    engagementRate: 3.5,
    spend: 7500,
    dataPoints: [
      { date: '2024-07-20', impressions: 30000, clicks: 1500, conversions: 30 },
      { date: '2024-07-21', impressions: 35000, clicks: 1800, conversions: 35 },
      { date: '2024-07-22', impressions: 40000, clicks: 2000, conversions: 40 },
    ],
  },
};

export default function CampaignAnalyticsPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [analyticsData, setAnalyticsData] = useState<CampaignAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (campaignId) {
      setIsLoading(true);
      // Simulate fetching campaign details and analytics
      setTimeout(() => {
        const camp = MOCK_CAMPAIGNS_DB.find(c => c.id === campaignId) || JSON.parse(localStorage.getItem('campaigns') || '[]').find((c:Campaign) => c.id === campaignId) || null;
        const data = MOCK_ANALYTICS_DB[campaignId] || (camp ? { // Generate some mock analytics if not in DB
            campaignId,
            impressions: Math.floor(Math.random() * 1000000),
            clicks: Math.floor(Math.random() * 50000),
            conversions: Math.floor(Math.random() * 1000),
            engagementRate: parseFloat((Math.random() * 10).toFixed(1)),
            spend: Math.floor(Math.random() * camp.budget),
            dataPoints: Array.from({length: 5}, (_, i) => ({
                date: new Date(new Date(camp.startDate).getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                impressions: Math.floor(Math.random() * 200000),
                clicks: Math.floor(Math.random() * 10000),
                conversions: Math.floor(Math.random() * 200)
            }))
        } : null);
        setCampaign(camp);
        setAnalyticsData(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [campaignId]);

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Campaign Analytics" description="Loading campaign performance data..." />
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-80 rounded-lg" />
            <Skeleton className="h-80 rounded-lg" />
          </div>
          <Skeleton className="h-60 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div>
        <PageHeader title="Campaign Not Found" description="The requested campaign analytics could not be loaded." />
        <p>Please check the campaign ID or try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Analytics: ${campaign.name}`}
        description="Detailed performance metrics and insights for your campaign."
      />
      <CampaignAnalyticsDisplay campaign={campaign} analyticsData={analyticsData} />
    </div>
  );
}
