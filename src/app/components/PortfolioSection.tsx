import { getPortfolioData, groupPortfolioByCategory } from '../../lib/portfolio'
import { type PortfolioItem } from '../../lib/sanity'

// This is now a Server Component with ISR
export default async function PortfolioSection() {
  // Fetch data on the server side
  const portfolioItems = await getPortfolioData()
  const groupedContent = groupPortfolioByCategory(portfolioItems)

  return (
    <div>
      {Object.entries(groupedContent).map(([category, items]) => (
        <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")}>
          <h2>{category}</h2>
          <div className="grid">
            {items.map((item: PortfolioItem, index: number) => (
              <div key={index} className="card">
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Leer más
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}