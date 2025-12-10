export interface SEO {
  url: string;
  title: string;
  metaDescription: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface ThemeSettings {
  primaryColor: string; // e.g., #dc2626 for red-600
  secondaryColor: string; // e.g., #f8fafc for slate-50
  accentColor: string; // e.g., #ef4444 for red-500
  textPrimaryColor: string; // e.g., #1e293b for slate-800
  textSecondaryColor: string; // e.g., #475569 for slate-600
  fontSans: string; // e.g., 'ui-sans-serif, system-ui, sans-serif'
  fontSerif: string; // e.g., 'ui-serif, Georgia, serif'
  fontMono: string; // e.g., 'ui-monospace, SFMono-Regular, monospace'
  heroImage: string; // URL for the hero banner image
  aboutImage1: string; // URL for about us image
  aboutImage2: string; // URL for about us image
  contactImage: string; // URL for contact us image
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string; // Placeholder for an icon name or SVG
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string; // e.g., "YYYY-MM-DD"
  summary: string;
  content: string; // Can be markdown
  imageUrl: string;
  seo: SEO;
}

export interface HomePageContent {
  headline: string;
  tagline: string;
  servicesSummary: string[];
  heroImageUrl: string;
  seo: SEO;
}

export interface AboutPageContent {
  title: string;
  sections: Array<{
    heading: string;
    content: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;
  seo: SEO;
}

export interface ServicesPageContent {
  title: string;
  introduction: string;
  serviceList: Service[];
  seo: SEO;
}

export interface ContactPageContent {
  title: string;
  formIntro: string;
  address?: string;
  email?: string;
  phone: string; // Must be the support number
  seo: SEO;
}

export interface BlogPageContent {
  title: string;
  introduction: string;
  seo: SEO;
}

export interface NavbarContent {
  brandName: string;
  homeLinkText: string;
  aboutLinkText: string;
  servicesLinkText: string;
  blogLinkText: string;
  contactLinkText: string;
  adminLinkText: string;
}

export interface FooterContent {
  companyName: string;
  phone: string;
  privacyPolicyLinkText: string;
  termsOfServiceLinkText: string;
  copyrightText: string;
}

export interface WebsiteData {
  theme: ThemeSettings;
  homePage: HomePageContent;
  aboutPage: AboutPageContent;
  servicesPage: ServicesPageContent;
  blogPage: BlogPageContent;
  blogPosts: BlogPost[];
  contactPage: ContactPageContent;
  footer: FooterContent;
  navbar: NavbarContent;
}

export type WebsiteSection = keyof WebsiteData;
