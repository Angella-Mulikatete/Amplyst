"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { AIInfluencerMatchingInput, AIInfluencerMatchingOutput } from "@/types";
import { aiInfluencerMatching } from "@/ai/flows/ai-influencer-matching"; // Genkit flow
import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

// Schema from AIInfluencerMatchingInput in Genkit flow
const aiMatchingFormSchema = z.object({
  campaignDescription: z.string().min(20, "Campaign description must be at least 20 characters."),
  influencerNiche: z.string().min(3, "Influencer niche is required."),
  targetAudienceDemographics: z.string().min(10, "Target audience demographics are required."),
  budget: z.coerce.number().min(1, "Budget must be a positive number."),
});

type AIMatchingFormData = z.infer<typeof aiMatchingFormSchema>;

interface AIMatchingFormProps {
  onResults: (output: AIInfluencerMatchingOutput) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export function AIMatchingForm({ onResults, onLoadingChange }: AIMatchingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AIMatchingFormData>({
    resolver: zodResolver(aiMatchingFormSchema),
    defaultValues: {
      campaignDescription: "",
      influencerNiche: "",
      targetAudienceDemographics: "",
      budget: 1000, // Default budget
    },
  });

  async function onSubmit(values: AIMatchingFormData) {
    setIsSubmitting(true);
    onLoadingChange(true);
    try {
      const input: AIInfluencerMatchingInput = {
        campaignDescription: values.campaignDescription,
        influencerNiche: values.influencerNiche,
        targetAudienceDemographics: values.targetAudienceDemographics,
        budget: values.budget,
      };
      const result = await aiInfluencerMatching(input);
      onResults(result);
      toast({
        title: "AI Recommendations Ready!",
        description: `${result.recommendedInfluencers.length} influencers found matching your criteria.`,
      });
    } catch (error) {
      console.error("AI Matching Error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      onLoadingChange(false);
    }
  }

  return (
    <Card className="p-4 md:p-6 shadow-md">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="campaignDescription"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Campaign Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Describe your campaign goals, target audience, and what you're promoting..." {...field} rows={4}/>
                </FormControl>
                <FormDescription>Provide a detailed description for the best AI matching.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="influencerNiche"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Desired Influencer Niche</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Sustainable Fashion, Tech Gadgets, Vegan Cooking" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Campaign Budget ($)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
            control={form.control}
            name="targetAudienceDemographics"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Target Audience Demographics</FormLabel>
                <FormControl>
                    <Textarea placeholder="Describe your target audience: age, gender, location, interests, etc." {...field} rows={3} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get AI Recommendations
            </Button>
        </form>
        </Form>
    </Card>
  );
}
