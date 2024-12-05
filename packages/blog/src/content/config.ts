import { defineCollection, z } from 'astro:content'

const articleDefinition = defineCollection({
    type: 'content',
    /** 
     * We do not organize articles into folders.
     * We recommend using [collection] as the classification identifier in mdx.
     * 
     * ```plaintext
     * /src
     *     /content
     *         /article
     *             /...
     *             /all-your-mdx-files.mdx
     *         /config.ts
     *     /...
     * ```
     *
     * @example
     * ```mdx
     * ---
     * headline: "Setup angular project"
     * description: "Create a angular project in one minutes."
     * overview: "AI Summary"
     * created: 1/1/2000
     * imageUrl: "source.jpg"
     * tags: ['test file', 'Tag 1', 'Tag 2', 'Tag3']
     * collection: 'Angular'
     * ---
     * ```
     */
    schema: z.object({
        headline: z.string(),
        description: z.string(),
        overview: z.string(),
        created: z.coerce.date(),
        imageUrl: z.string(),
        tags: z.array(z.string()),
        collection: z.string(),
    }),
})

export const collections = {
    article: articleDefinition,
}
