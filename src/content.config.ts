import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    category: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    releaseUrl: z.string().url().optional(),
    stats: z.record(z.string(), z.string()).optional(),
    keyHighlights: z.array(z.string()),
    architectureDecisions: z.array(
      z.object({
        decision: z.string(),
        rationale: z.string(),
      })
    ).optional(),
    coverGradient: z.string().optional(),
  }),
});

export const collections = { projects };
