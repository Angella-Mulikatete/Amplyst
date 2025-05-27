// Implemented Genkit flow for AI-powered influencer recommendations based on campaign criteria.

'use server';

/**
 * @fileOverview AI-powered influencer matching flow.
 *
 * - aiInfluencerMatching - A function that provides AI-driven influencer recommendations.
 * - AIInfluencerMatchingInput - The input type for the aiInfluencerMatching function.
 * - AIInfluencerMatchingOutput - The output type for the aiInfluencerMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIInfluencerMatchingInputSchema = z.object({
  campaignDescription: z
    .string()
    .describe('Detailed description of the campaign, including goals, target audience, and content requirements.'),
  influencerNiche: z
    .string()
    .describe('The niche or category of influencers to search for (e.g., fashion, tech, food).'),
  targetAudienceDemographics: z
    .string()
    .describe('Description of the target audience demographics (e.g., age, gender, location, interests).'),
  budget: z.number().describe('The budget allocated for influencer collaborations.'),
});

export type AIInfluencerMatchingInput = z.infer<typeof AIInfluencerMatchingInputSchema>;

const AIInfluencerMatchingOutputSchema = z.object({
  recommendedInfluencers: z.array(
    z.object({
      name: z.string().describe('The name of the influencer.'),
      profileUrl: z.string().describe('The URL of the influencer profile.'),
      engagementRate: z.number().describe('The engagement rate of the influencer.'),
      audienceOverlapScore: z
        .number()
        .describe('A score indicating the overlap between the influencer audience and the target audience.'),
      reasoning: z
        .string()
        .describe('Reasoning for recommending this influencer based on provided campaign and influencer data.'),
    })
  ).describe('A list of recommended influencers with their profiles and reasons for recommendation.'),
});

export type AIInfluencerMatchingOutput = z.infer<typeof AIInfluencerMatchingOutputSchema>;

export async function aiInfluencerMatching(input: AIInfluencerMatchingInput): Promise<AIInfluencerMatchingOutput> {
  return aiInfluencerMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiInfluencerMatchingPrompt',
  input: {schema: AIInfluencerMatchingInputSchema},
  output: {schema: AIInfluencerMatchingOutputSchema},
  prompt: `You are an AI-powered influencer recommendation system. Given a campaign description, influencer niche, target audience demographics and budget, you will suggest a list of influencers that best fit the criteria.

Campaign Description: {{{campaignDescription}}}
Influencer Niche: {{{influencerNiche}}}
Target Audience Demographics: {{{targetAudienceDemographics}}}
Budget: {{{budget}}}

Consider various factors such as relevance, engagement rate, audience demographics, and potential ROI when recommending influencers. Provide a brief explanation for each recommendation.

Ensure that the output is a JSON object conforming to the AIInfluencerMatchingOutputSchema schema.`,
});

const aiInfluencerMatchingFlow = ai.defineFlow(
  {
    name: 'aiInfluencerMatchingFlow',
    inputSchema: AIInfluencerMatchingInputSchema,
    outputSchema: AIInfluencerMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
