import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',  
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-29',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Portfolio Item Type (based on your actual Sanity schema)
export type PortfolioItem = {
  title: string;
  url: string;
  category: string; // Maps to the original Firebase structure
  date: string;
  description?: string;
  image: string;
  type?: string; // Additional field from your schema
}

// GROQ query for portfolio items (using actual field names)
export const portfolioQuery = `*[_type == "portfolio"]{
  title,
  url,
  category,
  date,
  description,
  image,
  type
}`