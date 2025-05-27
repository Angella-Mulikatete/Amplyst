"use client";

import type { Campaign, CampaignAnalyticsData, CampaignSummaryOutput } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, TrendingUp, Users, DollarSign, MousePointerClick, Target as TargetIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LineChart } from "recharts";
import { campaignSummary } from "@/ai/flows/campaign-summary";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

interface CampaignAnalyticsDisplayProps {
  campaign: Campaign | null;
  analyticsData: CampaignAnalyticsData | null;
}

const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const chartConfig = {
  impressions: { label: "Impressions", color: CHART_COLORS[0] },
  clicks: { label: "Clicks", color: CHART_COLORS[1] },
  conversions: { label: "Conversions", color: CHART_COLORS[2] },
  engagement: { label: "Engagement", color: CHART_COLORS[3] },
};

export function CampaignAnalyticsDisplay({ campaign, analyticsData }: CampaignAnalyticsDisplayProps) {
  const [summary, setSummary] = useState<CampaignSummaryOutput | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleGenerateSummary = async () => {
    if (!campaign || !analyticsData) return;
    setIsSummaryLoading(true);
    try {
      const summaryInput = {
        campaignName: campaign.name,
        impressions: analyticsData.impressions,
        clicks: analyticsData.clicks,
        conversions: analyticsData.conversions,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        budget: campaign.budget,
      };
      const result = await campaignSummary(summaryInput);
      setSummary(result);
    } catch (error) {
      console.error("Failed to generate campaign summary:", error);
      // toast an error
    } finally {
      setIsSummaryLoading(false);
    }
  };

  if (!campaign || !analyticsData) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Analytics Unavailable</CardTitle>
          <CardDescription>Campaign data or analytics could not be loaded.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please ensure the campaign exists and has associated analytics data.</p>
        </CardContent>
      </Card>
    );
  }

  const performanceData = [
    { name: "Impressions", value: analyticsData.impressions, icon: TrendingUp },
    { name: "Clicks", value: analyticsData.clicks, icon: MousePointerClick },
    { name: "Conversions", value: analyticsData.conversions, icon: TargetIcon },
    { name: "Engagement Rate", value: analyticsData.engagementRate, unit: "%", icon: Users },
    { name: "Spend", value: analyticsData.spend, unit: "$", icon: DollarSign },
  ];
  
  const engagementRateData = [
    { name: 'Engaged', value: analyticsData.engagementRate },
    { name: 'Not Engaged', value: 100 - analyticsData.engagementRate },
  ];


  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {performanceData.map(item => (
          <Card key={item.name} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.unit === "$" && item.unit}
                {item.value.toLocaleString()}
                {item.unit === "%" && item.unit}
              </div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month (example)</p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Impressions, Clicks, and Conversions daily trend.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="impressions" stroke={chartConfig.impressions.color} activeDot={{ r: 6 }} name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke={chartConfig.clicks.color} activeDot={{ r: 6 }} name="Clicks"/>
                  <Line type="monotone" dataKey="conversions" stroke={chartConfig.conversions.color} activeDot={{ r: 6 }} name="Conversions"/>
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
            <CardDescription>Overall campaign engagement.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[300px]">
             <ChartContainer config={{ engagement: { label: "Engagement", color: CHART_COLORS[0] }, notEngaged: {label: "Not Engaged", color: CHART_COLORS[4]} }} className="h-[250px] w-full max-w-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie data={engagementRateData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                            {`${(percent * 100).toFixed(0)}%`}
                            </text>
                        );
                        }}
                    >
                        {engagementRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? chartConfig.engagement.color : CHART_COLORS[4]} />
                        ))}
                    </Pie>
                    <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>AI Campaign Summary</CardTitle>
          <CardDescription>Get an AI-generated summary of your campaign's performance.</CardDescription>
        </CardHeader>
        <CardContent>
          {isSummaryLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : summary ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-md text-primary">Overall Performance: {summary.overallPerformance}</h3>
                <p className="text-sm text-muted-foreground mt-1">{summary.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Key Insights:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                  {summary.keyInsights.map((insight, i) => <li key={i}>{insight}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Recommendations:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                  {summary.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Click the button to generate an AI summary.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateSummary} disabled={isSummaryLoading}>
            {isSummaryLoading ? <><Skeleton className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate AI Summary"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
