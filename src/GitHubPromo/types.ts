import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

export const gitHubPromoSchema = z.object({
  profile: z.object({
    username: z.string(),
    name: z.string(),
    avatarUrl: z.string(),
    publicRepos: z.number(),
    followers: z.number(),
    following: z.number(),
  }),
  repositories: z.array(
    z.object({
      name: z.string(),
      description: z.string().nullable(),
      language: z.string().nullable(),
      stars: z.number(),
      forks: z.number(),
    })
  ),
  contributionData: z.array(z.array(z.number())).optional(),
  accentColor: zColor(),
  backgroundColor: zColor(),
});

export type GitHubPromoProps = z.infer<typeof gitHubPromoSchema>;
