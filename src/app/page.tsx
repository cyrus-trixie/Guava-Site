'use client';

// --- MODIFIED IMPORTS START ---
// ONLY import FullAcfData from the centralized types file.
// The individual component ACF types are already included within FullAcfData
// via the 'extends' keyword in src/types/acf.d.ts.
import { FullAcfData } from './api/index'; // Assuming '@/types/acf' is your alias
// --- MODIFIED IMPORTS END ---

// These are imports for your React components, which are correct.
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
      {/* Pass acfData to components. Each component should internally know
          what properties it expects from the FullAcfData object. */}
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