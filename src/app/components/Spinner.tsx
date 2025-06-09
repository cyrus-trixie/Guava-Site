import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Modern orbital spinner */}
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
        
        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-400 border-r-red-300 animate-spin"></div>
        
        {/* Inner dot */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-red-400 to-red-300 animate-pulse shadow-lg"></div>
      </div>
      
      {/* Optional loading text */}
      <div className="mt-8 text-gray-800 text-sm font-medium tracking-wide">
        Loading...
      </div>
      
      {/* Accessibility */}
      <p className="sr-only">Loading content, please wait</p>
    </div>
  );
};

export default Spinner;