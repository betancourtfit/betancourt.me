import { client, portfolioQuery, type PortfolioItem } from './sanity'

export async function getPortfolioData(): Promise<PortfolioItem[]> {
  try {
    const data = await client.fetch(portfolioQuery)
    
    // Filter out items without images (same logic as before)
    return data.filter((item: PortfolioItem) => item.image)
  } catch (error) {
    console.error('Error fetching portfolio data from Sanity:', error)
    return []
  }
}

export function groupPortfolioByCategory(items: PortfolioItem[]): Record<string, PortfolioItem[]> {
  return items.reduce((acc: Record<string, PortfolioItem[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})
}