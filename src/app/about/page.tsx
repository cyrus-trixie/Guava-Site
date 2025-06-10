// src/app/about/page.tsx

// 'use client' is optional. Only include it if you use client-side React features (useState, useEffect, event handlers)
// If your About page is purely static, you can omit 'use client' and it will be a Server Component by default.
'use client'; 

import React from 'react'; // Importing React is good practice, though sometimes not strictly necessary for JSX alone

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">About Us</h1>
      <p className="text-lg max-w-2xl text-center">
        This is a placeholder About page. Please replace this content with your actual about information.
      </p>
    </div>
  );
}