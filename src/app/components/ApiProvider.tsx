// src/components/ApiProvider.tsx
'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import Spinner from './Spinner'; // Import your Spinner component

type AcfData = any; // You can later type this better

// Create a Context
const AcfDataContext = createContext<AcfData | null>(null);

type ApiProviderProps = {
  children: React.ReactNode; // Now children is just a regular ReactNode
};

const ApiProvider = ({ children }: ApiProviderProps) => {
  const [acfData, setAcfData] = useState<AcfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/pages');
        if (!res.ok) throw new Error('Failed to fetch ACF data');

        const json = await res.json();
        // assuming first page has ACF fields
        setAcfData(json[0]?.acf || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />; // <-- RENDER YOUR SPINNER HERE
  if (error) return <p>Error: {error}</p>;
  if (!acfData) return <p>No data found.</p>;

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
  if (context === undefined) {
    throw new Error('useAcfData must be used within an ApiProvider');
  }
  return context;
};