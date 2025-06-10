// src/types/acf.d.ts

// These interfaces define the shape of your ACF data for different sections.
// Ensure the property names here EXACTLY match the field names in your WordPress ACF setup.

export interface HeaderAcfData {
  logo: string; // Corrected: logo is a string URL
  nav1: string;
  nav2: string;
  nav3: string;
  header_button_url: string;
  header_button_text: string;
  mobilecontacturl: string;
  mobilecontacttext: string;
  // Add other header specific properties if they exist in your ACF
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
  video: string; // Assuming this is a string URL for the video
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
  // If you also have a flexible content or repeater for service items,
  // ensure the structure matches what you fetch from ACF.
  // Example for a repeater field named 'service_items':
  // service_items?: Array<{
  //   icon: string; // Assuming icon name is a string, e.g., "Lightbulb"
  //   title: string;
  //   description: string;
  // }>;
}

// Interfaces for PortfolioCarousel
export interface ProjectItemFromAcf {
  title: string;
  client: string;
  description: string;
  tag1?: string; // Optional field
  tag2?: string; // Optional field
  tag3?: string; // Optional field
  image?: { // Image object, assuming it has a 'url' property
    url: string;
    // Add other image properties if your ACF returns them (e.g., width, height, alt)
  };
  project_url: string;
}

export interface PortfolioCarouselAcfData {
  projects_card?: ProjectItemFromAcf[]; // Array of project items (optional)
}

// --- THE COMPREHENSIVE FULL ACF DATA INTERFACE ---
// This combines ALL interfaces from components that receive ACF data.
// It assumes your single ACF fetch endpoint returns an object
// that contains all these top-level properties.
export interface FullAcfData extends
  HeaderAcfData,
  HeroAcfData,
  AboutAcfData,
  ServicesAcfData,
  PortfolioCarouselAcfData
{
  // Add any other top-level ACF fields that are fetched but don't belong
  // specifically to one component (e.g., global site settings).
  // Example:
  // global_footer_text?: string;
  // contact_phone?: string;
}