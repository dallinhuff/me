import { defineCollection, reference, z } from "astro:content"

import { file, glob } from "astro/loaders"

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().nullish(),
    related: z.array(reference("blog")).nullish(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    liveUrl: z.string().url().nullish(),
    sourceUrl: z.string().url().nullish(),
    tags: z.array(reference("tags")).nullish(),
    related: z.array(reference("projects")).nullish(),
  }),
})

const tags = defineCollection({
  loader: file("./src/collections/tags.yml"),
  schema: z.object({
    id: z.string(),
    display: z.string(),
  }),
})

export const collections = {
  blog,
  projects,
  tags,
}
