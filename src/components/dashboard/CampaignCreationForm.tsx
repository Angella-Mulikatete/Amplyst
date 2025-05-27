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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Campaign } from "@/types";
import { MOCK_INFLUENCER_NICHES } from "@/lib/constants"; // For influencer niche selection
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const campaignFormSchema = z.object({
  name: z.string().min(5, "Campaign name must be at least 5 characters."),
  goals: z.string().min(10, "Campaign goals must be at least 10 characters."),
  targetAudience: z.string().min(10, "Target audience description is required."),
  budget: z.coerce.number().min(0, "Budget must be a positive number."),
  description: z.string().min(20, "Campaign description must be at least 20 characters.").max(1000, "Description too long."),
  contentRequirements: z.string().min(10, "Content requirements are needed."),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  // For AI Matching (optional during basic campaign creation)
  influencerNiche: z.string().optional(),
  targetAudienceDemographics: z.string().optional(),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"],
});

type CampaignFormData = z.infer<typeof campaignFormSchema>;

interface CampaignCreationFormProps {
  brandId: string; // Or agencyId
  onSubmitSuccess?: (campaign: Campaign) => void;
}

export function CampaignCreationForm({ brandId, onSubmitSuccess }: CampaignCreationFormProps) {
  const { toast } = useToast();
  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      goals: "",
      targetAudience: "",
      budget: 0,
      description: "",
      contentRequirements: "",
      startDate: undefined,
      endDate: undefined,
      influencerNiche: "",
      targetAudienceDemographics: "",
    },
  });

  function onSubmit(values: CampaignFormData) {
    const newCampaign: Campaign = {
      id: Date.now().toString(), // Mock ID
      brandId,
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Simulate saving
    console.log("New Campaign Data:", newCampaign);
    // Store in local storage for demo
    const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    localStorage.setItem('campaigns', JSON.stringify([...existingCampaigns, newCampaign]));

    toast({
      title: "Campaign Created!",
      description: `Your campaign "${newCampaign.name}" has been saved as a draft.`,
    });
    if (onSubmitSuccess) {
      onSubmitSuccess(newCampaign);
    }
    form.reset();
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Create New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Summer Glow Collection Launch" {...field} />
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
                    <FormLabel>Budget ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Goals</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Increase brand awareness by 20%, Drive 100 new sign-ups" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your ideal customer (age, interests, location, etc.)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed overview of the campaign, key messages, and product/service details." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Requirements</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 3 Instagram posts, 1 YouTube video review, 5 Instagram stories. Mention specific hashtags or CTAs." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-md font-semibold text-muted-foreground">AI Matching Details (Optional)</h3>
                <FormDescription>Provide these details if you plan to use AI for influencer matching.</FormDescription>
                 <FormField
                    control={form.control}
                    name="influencerNiche"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Preferred Influencer Niche</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Sustainable Fashion, Gaming, Vegan Cooking" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="targetAudienceDemographics"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Specific Target Audience Demographics (for AI)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Females aged 25-35 interested in eco-friendly products, located in California." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Create Campaign
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
