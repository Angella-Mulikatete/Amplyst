import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
//import bcrypt from "bcryptjs";

// Query to get the current user's profile
export const getMyProfile = query({
  handler: async (ctx): Promise<Doc<"profiles"> | null> => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || !identity.tokenIdentifier) {
      return null;
    }
    const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();

    if (!user) {
      return null;
    }
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
      return profile;
  },
});

// Mutation to create or update a user's profile
export const insertProfile = mutation({
      args: {
        role: v.union(
          v.literal("influencer"),
          v.literal("brand"),
          v.literal("agency"),
        ),
        name: v.string(),
        bio: v.optional(v.string()),
        profilePictureUrl: v.optional(v.string()),
        niche: v.optional(v.string()),
        location: v.optional(v.string()),
        followerCount: v.optional(v.string()),
        socialAccounts: v.optional(
            v.object({
                instagram: v.string(),
                tiktok: v.string(),
                youtube: v.string(),
                twitter: v.string(),
            })
        ),
        portfolio: v.optional(v.array(v.any())),

      },
      handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity || !identity.tokenIdentifier) {

          throw new Error("User not authenticated");
        }
        const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
        if (!user) {
          throw new Error("User not found in database");
        }

        const user = await ctx.db
          .query("users")
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
          .unique();

        if (!user) {
          throw new Error("Authenticated user not found in users table");
        }

        const existingProfile = await ctx.db
          .query("profiles")
          .withIndex("by_userId", (q) => q.eq("userId", user._id))
          .unique();

        if (existingProfile) {
          await ctx.db.patch(existingProfile._id, {
            ...args,
            userId: user._id, // Ensure userId is always set
          });
          return existingProfile._id;
        } else {
          const profileId = await ctx.db.insert("profiles", {
            userId: user._id,
            ...args,
          });
          return profileId;
        }
      },
    });


// export const createOrGetUser = mutation({

export const createOrGetUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called createOrGetUser without authentication");
    }

    // Extract role from Clerk public metadata
    if (typeof identity.publicMetadata !== 'object' || identity.publicMetadata === null) {
      throw new Error("User identity public metadata is missing or malformed");
    }

    const publicMetadata = (identity.unsafeMetadata ?? identity.publicMetadata) as { role?: "influencer" | "brand" | "agency" };

    if (!publicMetadata.role) {
      throw new Error("User role is missing in public metadata");
    }

    const role = publicMetadata.role;

    // Check if the user already exists
    const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();

    if (user) {
      // If the user exists, return their ID
      return user._id;
    }

    // If the user doesn't exist, create a new one
    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      role
    });

    return userId;
  },
});

    export const listInfluencers = query({
      args: {}, // Add filters later: niche, location, etc.
      handler: async (ctx) => {
        const influencers = await ctx.db
          .query("profiles")
          .filter((q) => q.eq(q.field("role"), "influencer"))
          .collect();
        return influencers;
      },
    });
