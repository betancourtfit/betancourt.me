import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import "./globals.css";
import "./utils/fontawesome"; // Asegúrate de que este archivo configura Font Awesome correctamente

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = 3600

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PortfolioSection />
    </main>
  );
}