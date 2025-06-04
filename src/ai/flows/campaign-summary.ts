// src/ai/flows/campaign-summary.ts
'use server';

/**
 * @fileOverview A campaign summary AI agent.
 *
 * - campaignSummary - A function that handles the campaign summary process.
 * - CampaignSummaryInput - The input type for the campaignSummary function.
 * - CampaignSummaryOutput - The return type for the campaignSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CampaignSummaryInputSchema = z.object({
  campaignName: z.string().describe('The name of the campaign.'),
  impressions: z.number().describe('The total number of impressions for the campaign.'),
  clicks: z.number().describe('The total number of clicks for the campaign.'),
  conversions: z.number().describe('The total number of conversions for the campaign.'),
  startDate: z.string().describe('The start date of the campaign (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date of the campaign (YYYY-MM-DD).'),
  budget: z.number().describe('The total budget for the campaign.'),
});
export type CampaignSummaryInput = z.infer<typeof CampaignSummaryInputSchema>;

const CampaignSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the campaign performance, highlighting key trends and insights.'),
  overallPerformance: z.string().describe('An assessment of the overall campaign performance (e.g., excellent, good, average, poor).'),
  keyInsights: z.array(z.string()).describe('A list of key insights derived from the campaign data.'),
  recommendations: z.array(z.string()).describe('A list of recommendations for optimizing future campaigns based on the insights.'),
});
export type CampaignSummaryOutput = z.infer<typeof CampaignSummaryOutputSchema>;

export async function campaignSummary(input: CampaignSummaryInput): Promise<CampaignSummaryOutput> {
  return campaignSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'campaignSummaryPrompt',
  input: {schema: CampaignSummaryInputSchema},
  output: {schema: CampaignSummaryOutputSchema},
  prompt: `You are an expert marketing analyst providing a summary of campaign performance.

  Analyze the following campaign data and provide a concise summary, overall performance assessment, key insights, and recommendations for future campaigns.

  Campaign Name: {{{campaignName}}}
  Impressions: {{{impressions}}}
  Clicks: {{{clicks}}}
  Conversions: {{{conversions}}}
  Start Date: {{{startDate}}}
  End Date: {{{endDate}}}
  Budget: {{{budget}}}

  Summary:
  Overall Performance:
  Key Insights:
  Recommendations:`, 
});

const campaignSummaryFlow = ai.defineFlow(
  {
    name: 'campaignSummaryFlow',
    inputSchema: CampaignSummaryInputSchema,
    outputSchema: CampaignSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
