'use client';

// --- MODIFIED IMPORTS START ---
// Import all necessary ACF data interfaces from the centralized types file
import {
  HeaderAcfData,
  HeroAcfData,
  AboutAcfData,
  ServicesAcfData,
  PortfolioCarouselAcfData,
  FullAcfData // Import the combined interface as well
} from '@/types/acf'; // Assuming '@/types/acf' is your alias for 'src/types/acf'
// --- MODIFIED IMPORTS END ---

import ApiProvider, { useAcfData } from './components/ApiProvider';
import Header from './components/Header';
import HeroSection from './components/Hero';
import AboutSection from './components/About';
import Services from './components/Services';
import PortfolioCarousel from './components/PortfolioCarousel';


// Define a Client Component for rendering the main content that uses ACF data
const MainContent = () => {
  // Explicitly type acfData as FullAcfData
  const acfData: FullAcfData = useAcfData();

  return (
    <>
      {/* Ensure each component receives only its relevant slice of acfData if needed,
          or the full acfData if it's designed to pick its own properties.
          For simplicity, passing the full acfData here, but adjust as per component's needs. */}
      <Header acfData={acfData} />
      <HeroSection acfData={acfData} />
      <AboutSection acfData={acfData} />
      <Services acfData={acfData}/>
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