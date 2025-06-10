// src/components/ApiProvider.tsx
'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import Spinner from './Spinner'; // Import your Spinner component

// Define types for your ACF data structure based on usage in other components
// Example: From Hero.tsx
export interface HeroAcfData {
  hero_banner_text: string;
  hero_button1_url: string;
  hero_heading: string;
  hero_paragraph: string;
  hero_button2_url: string;
  hero_button2text: string;
  hero_button3_url: string;
  hero_button3_text: string;
}

// Example: From PortfolioCarousel.tsx
interface ProjectItemFromAcf {
  title: string;
  client: string;
  description: string;
  tag1?: string; // Optional if not always present
  tag2?: string;
  tag3?: string;
  image?: {
    url: string;
    // Add other image properties if your ACF returns them (e.g., width, height, alt)
  };
  project_url: string;
}

// Combine all expected ACF fields into one comprehensive interface
interface FullAcfData extends HeroAcfData {
  projects_card: ProjectItemFromAcf[];
  // Add any other top-level ACF fields that your WordPress instance provides
  // e.g., some_other_field: string;
}

// Use the specific type for AcfData
type AcfData = FullAcfData;

// Create a Context
const AcfDataContext = createContext<AcfData | null>(null);

type ApiProviderProps = {
  children: React.ReactNode;
};

const ApiProvider = ({ children }: ApiProviderProps) => {
  const [acfData, setAcfData] = useState<AcfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- IMPORTANT: Update this URL for Vercel deployment! ---
        // Replace 'http://localhost/wordpress' with your live WordPress API base URL.
        // It's highly recommended to use an environment variable for this.
        // Example: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
        const wordpressApiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/wordpress'; // Fallback for local dev if env not set
        
        const res = await fetch(`${wordpressApiBaseUrl}/wp-json/wp/v2/pages`);
        
        if (!res.ok) throw new Error(`Failed to fetch ACF data: ${res.statusText}`);

        const json = await res.json();
        
        // Assuming the first page (index 0) contains the ACF fields you need.
        // We'll cast to `AcfData` as we are confident in our type definition.
        setAcfData((json[0]?.acf as AcfData) || {} as AcfData); 

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred during API fetch.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading data: {error}</p>;
  if (!acfData) return <p>No data found or data structure is empty.</p>;

  // Provide the acfData through context
  return (
    <AcfDataContext.Provider value={acfData}>
      {children}
    </AcfDataContext.Provider>
  );
};

export default ApiProvider;

// Custom hook to consume the ACF data
export const useAcfData = () => {
  const context = useContext(AcfDataContext);
  if (context === null) { // Changed undefined to null as the context is initialized with null
    throw new Error('useAcfData must be used within an ApiProvider');
  }
  return context;
};