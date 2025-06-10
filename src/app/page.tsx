'use client';

// Import all necessary component-specific ACF data interfaces
// These paths assume your interfaces are defined within each component file.
// If you have a shared types file (e.g., src/types/acf.d.ts), you'd import from there instead.
import { HeaderAcfData } from './components/Header';
import { HeroAcfData } from './components/Hero'; // Assuming Hero component uses HeroAcfData
import { AboutAcfData } from './components/About'; // Assuming About component uses AboutAcfData
import { ServicesAcfData } from './components/Services'; // Assuming Services component uses ServicesAcfData
import { PortfolioCarouselAcfData } from './components/PortfolioCarousel';

import ApiProvider, { useAcfData } from './components/ApiProvider';
import Header from './components/Header';
import HeroSection from './components/Hero';
import AboutSection from './components/About';
import Services from './components/Services';
import PortfolioCarousel from './components/PortfolioCarousel';

// --- NEW CODE START ---
// Define the FullAcfData interface by combining all individual ACF data interfaces
interface FullAcfData extends
  HeaderAcfData,
  HeroAcfData, // Make sure this matches the actual interface name in Hero.tsx
  AboutAcfData, // Make sure this matches the actual interface name in About.tsx
  ServicesAcfData, // Make sure this matches the actual interface name in Services.tsx
  PortfolioCarouselAcfData
{
  // Add any other top-level ACF fields that might exist directly on the root
  // of your fetched ACF data, but are not specific to any one component.
  // For example:
  // site_global_setting_1?: string;
  // site_global_setting_2?: boolean;
}
// --- NEW CODE END ---

// Define a Client Component for rendering the main content that uses ACF data
const MainContent = () => {
  // --- MODIFIED LINE START ---
  // Explicitly type acfData as FullAcfData
  const acfData: FullAcfData = useAcfData(); 
  // --- MODIFIED LINE END ---

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