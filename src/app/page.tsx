'use client';
import ApiProvider, { useAcfData } from './components/ApiProvider'; // Import useAcfData as well
import Header from './components/Header';
import HeroSection from './components/Hero'; // Adjust paths as needed
import AboutSection from './components/About';
import Services from './components/Services';
import PortfolioCarousel from './components/PortfolioCarousel';

// Define a Client Component for rendering the main content that uses ACF data
const MainContent = () => {
  const acfData = useAcfData(); // Get acfData from context

  return (
    <>
      <Header acfData={acfData} />
      <HeroSection acfData={acfData} />
      <AboutSection acfData={acfData} />
      <Services acfData={acfData}/>
      {/* Pass acfData directly to PortfolioCarousel */}
      <PortfolioCarousel acfData={acfData}/>
    </>
  );
};

export default function Page() {
  return (
    <ApiProvider>
      <MainContent /> {/* Render the MainContent as a child */}
    </ApiProvider>
  );
}