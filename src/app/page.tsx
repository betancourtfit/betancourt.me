import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import "./globals.css";
import "./utils/fontawesome"; // Asegúrate de que este archivo configura Font Awesome correctamente

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PortfolioSection />
    </main>
  );
}