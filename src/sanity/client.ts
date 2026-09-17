import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here" &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "grains-project-id"
);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  draftMode = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  draftMode?: boolean;
}): Promise<QueryResponse | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      ...(draftMode
        ? {
            perspective: "previewDrafts",
            token: process.env.SANITY_API_READ_TOKEN,
            useCdn: false,
          }
        : {
            perspective: "published",
            useCdn,
            next: { tags },
          }),
    });
  } catch (error) {
    console.warn("Sanity fetch encountered an error. Falling back to local content.", error);
    return null;
  }
}
