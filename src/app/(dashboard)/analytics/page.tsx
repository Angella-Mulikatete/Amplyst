"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AnalyticsOverviewPage() {
  // In a real app, this page would fetch and display aggregate analytics
  // or a list of campaigns to view individual analytics for.

  // Mock campaigns for linking to individual analytics pages
  const mockCampaignsForAnalytics = [
    { id: '1', name: 'Eco-Friendly Product Launch' },
    { id: '2', name: 'Mobile Game Promotion' },
    // Add more mock campaigns or fetch a list
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Overview"
        description="Track the performance of your campaigns and gain valuable insights."
      />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Overall Performance Summary</CardTitle>
          <CardDescription>
            This section will display aggregate metrics across all your campaigns.
            (Feature under development)
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive analytics charts and summaries will be available here soon.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Campaign-Specific Analytics</CardTitle>
          <CardDescription>
            Select a campaign below to view its detailed performance report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockCampaignsForAnalytics.length > 0 ? (
            <ul className="space-y-3">
              {mockCampaignsForAnalytics.map(campaign => (
                <li key={campaign.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-secondary/50">
                  <span className="font-medium">{campaign.name}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/analytics/${campaign.id}`}>
                      View Report
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No campaigns available to display analytics for.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
