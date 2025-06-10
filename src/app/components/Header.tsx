'use client';

import React, { useState, useEffect } from 'react'; // Added React import for clarity
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// ---
// Define the interface for the ACF data that this component expects
// ---
export interface HeaderAcfData {
  logo: string; // Assuming this is a URL string for the logo image
  nav1: string;
  nav2: string;
  nav3: string;
  header_button_url: string;
  header_button_text: string;
  mobilecontacturl: string;
  mobilecontacttext: string;
}

// ---
// Define the props interface for the Header component
// ---
interface HeaderProps {
  acfData: HeaderAcfData;
}

const Header = ({ acfData }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll behavior for shadow and background opacity
  useEffect(() => {
    const handleScroll = () => {
      // This condition determines when the header styling changes
      // Based on your code, it becomes 'scrolled' after 900px
      setIsScrolled(window.scrollY > 900); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-6 z-50 mx-auto w-full max-w-7xl px-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8 
        ${isScrolled ? 'translate-y-0' : 'translate-y-0'} 
        `}
    >
      <div
        className={`flex w-full items-center justify-between rounded-full px-4 py-3 shadow-md transition-colors sm:px-6 md:py-4 lg:px-8
          ${
            isScrolled
              ? 'bg-[#db3246] backdrop-blur-sm shadow-lg'
              : 'bg-[#db3246] shadow-md'
          }`}
        aria-label="Main navigation"
      >
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-6 md:gap-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-nexa-heavy tracking-tight text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-sm"
            aria-label="Guava home"
          >
            <Image
              src={acfData.logo} // Using acfData for the logo path
              alt="Guava Logo"
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden gap-8 text-sm font-nexa-heavy text-white md:flex">
            {[acfData.nav1, acfData.nav2, acfData.nav3].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative py-2 transition-colors duration-200 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Call to Action & Mobile menu button */}
        <div className="flex items-center gap-4">
          <Link
            href={acfData.header_button_url}
            className="inline-flex items-center rounded-full border-2 border-white bg-[#db3246] px-5 py-2 text-sm font-nexa-heavy text-white shadow-sm transition-all duration-200 hover:bg-white/90 active:scale-[0.98] focus:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-full"
          >
            {acfData.header_button_text}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex rounded-full p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-full md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        id="mobile-menu"
        className={`absolute left-4 right-4 top-full mt-2 transform origin-top rounded-xl bg-[#db3246] shadow-lg md:hidden
          ${
            mobileMenuOpen
              ? 'scale-y-100 opacity-100'
              : 'pointer-events-none scale-y-0 opacity-0'
          }
          transition-all duration-200 ease-in-out`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col space-y-3 p-4 text-base font-nexa-heavy text-white">
          {[acfData.nav1, acfData.nav2, acfData.nav3].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-lg px-4 py-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <hr className="my-1 border-white/20" />
          <Link
            href={acfData.mobilecontacturl}
            className="rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            {acfData.mobilecontacttext}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;