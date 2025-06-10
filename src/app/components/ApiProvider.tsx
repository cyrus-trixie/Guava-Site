// src/app/components/ApiProvider.tsx
'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import Spinner from './Spinner'; // Import your Spinner component

// --- IMPORTANT: Import FullAcfData from your new types file ---
import { FullAcfData } from '../api/index'; // Adjust path if your types file is elsewhere

// Remove all individual ACF interfaces and the old FullAcfData definition from here.
// They are now in src/types/acf.d.ts

// Use the specific type for AcfData
type AcfData = FullAcfData; // Now explicitly refers to the imported global type

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
        const wordpressApiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/wordpress';
        
        const res = await fetch(`${wordpressApiBaseUrl}/wp-json/wp/v2/pages`);
        
        if (!res.ok) throw new Error(`Failed to fetch ACF data: ${res.statusText}`);

        const json = await res.json();
        
        // Ensure the fetched data is cast to FullAcfData
        // This is a type assertion, telling TypeScript you're confident in the data structure.
        // If json[0]?.acf doesn't exist, provide a default empty object cast to FullAcfData
        // to satisfy the type.
        setAcfData((json[0]?.acf as FullAcfData) || {} as FullAcfData); 

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred during API fetch.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  if (context === null) {
    throw new Error('useAcfData must be used within an ApiProvider');
  }
  return context; // Now 'context' is correctly inferred as FullAcfData | null
};