// src/types/acf.d.ts

// These should be copied from your individual component files after you've added 'export' to them.
// Ensure these match your actual ACF fields.

export interface HeaderAcfData {
  // Corrected: logo is a string URL, not an object
  logo: string; 
  // Corrected: nav items are simple strings, not objects with link/text
  nav1: string;
  nav2: string;
  nav3: string;
  header_button_url: string;
  header_button_text: string;
  mobilecontacturl: string;
  mobilecontacttext: string;
  // Add other header specific properties used in Header.tsx
  // e.g., contact_email?: string;
  // social_links?: Array<{ icon: string; url: string }>;
}

export interface HeroAcfData {
  hero_banner_text: string;
  hero_button1_url: string;
  hero_heading: string;
  hero_paragraph: string;
  hero_button2_url: string;
  hero_button2text: string;
  hero_button3_url: string;
  hero_button3_text: string;
  // Add other hero specific properties used in Hero.tsx
}

export interface AboutAcfData {
  header1: string;
  header2: string;
  paragraph1: string;
  paragraph2: string;
  button_url: string;
  button: string;
  video: string;
  header3: string;
  header3_first_subtitle: string;
  header3_first_paragraph: string;
  header3_second_subtitle: string;
  header3_second_paragraph: string;
  header3_third_subtitle: string;
  header3_third_paragraph: string;
  // Add other about specific properties used in About.tsx
}

export interface ServicesAcfData {
  // Define all ACF fields specific to your Services component here
  // Example (replace with your actual fields, I'm keeping the previous example here):
  services_heading: string;
  service_items: Array<{
    icon: string; // Or a type for LucideReact icon
    title: string;
    description: string;
  }>;
  // ... any other fields used by Services.tsx
}

// Interfaces for PortfolioCarousel
export interface ProjectItemFromAcf {
  title: string;
  client: string;
  description: string;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  image?: {
    url: string;
    // Add other image properties if your ACF returns them (e.g., width, height, alt)
  };
  project_url: string;
}

export interface PortfolioCarouselAcfData {
  projects_card?: ProjectItemFromAcf[];
}

// --- THE COMPREHENSIVE FULL ACF DATA INTERFACE ---
// This combines ALL interfaces from components that receive ACF data.
export interface FullAcfData extends
  HeaderAcfData,
  HeroAcfData,
  AboutAcfData,
  ServicesAcfData,
  PortfolioCarouselAcfData
{
  // Add any other top-level ACF fields that are fetched but don't belong
  // specifically to one component (e.g., global settings, footer data).
  // Example:
  // global_footer_text: string;
  // contact_phone: string;
}

// src/types/acf.d.ts (or src/types/acf.ts)

export interface ServicesAcfData {
  small_header: string;
  header1_title: string;
  header2_title: string;
  header_paragraph: string;
  card_title1: string;
  card_paragraph1: string;
  card_title2: string;
  card_paragraph2: string;
  card_title3: string;
  card_paragraph3: string;
  card_title4: string;
  card_paragraph4: string;
  card_title5: string;
  card_paragraph5: string;
  card_title6: string;
  card_paragraph6: string;
  // ... any other relevant fields
}

// Also include other interfaces like ProjectItemFromAcf, PortfolioCarouselAcfData etc.