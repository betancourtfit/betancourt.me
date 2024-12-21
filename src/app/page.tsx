import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import "./globals.css";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <PortfolioSection />
    </div>
  );
}
