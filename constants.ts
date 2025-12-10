import { WebsiteData, Service, BlogPost, ThemeSettings, SEO } from './types';

export const SUPPORT_PHONE_NUMBER = '+1 (510)-370-1986';
export const SUPPORT_PHONE_LINK = 'tel:+15103701986';

const defaultSEO: SEO = {
  url: '', // This will be set dynamically per page
  title: 'System Mechanic USA Support',
  metaDescription: 'Get expert help with System Mechanic issues. Call +1 (510)-370-1986 for 24/7 live support on installation, login, billing, and more.',
};

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryColor: '#dc2626', // red-600
  secondaryColor: '#f8fafc', // slate-50
  accentColor: '#ef4444', // red-500
  textPrimaryColor: '#1e293b', // slate-800
  textSecondaryColor: '#475569', // slate-600
  fontSans: 'ui-sans-serif, system-ui, sans-serif',
  fontSerif: 'ui-serif, Georgia, serif',
  fontMono: 'ui-monospace, SFMono-Regular, monospace',
  heroImage: 'https://picsum.photos/1600/600?random=1',
  aboutImage1: 'https://picsum.photos/800/600?random=2',
  aboutImage2: 'https://picsum.photos/800/600?random=3',
  contactImage: 'https://picsum.photos/800/600?random=4',
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'install',
    title: 'Installation, Uninstallation, & Reactivation',
    description: 'Expert guidance for seamless installation, complete uninstallation, and hassle-free reactivation of your System Mechanic software.'
  },
  {
    id: 'account',
    title: 'Account Recovery, Login Issues, & Error Fixes',
    description: 'Assistance with recovering your account, resolving login difficulties, and fixing common errors to get you back on track.'
  },
  {
    id: 'payment',
    title: 'Credit Card Expiration & Payment Issues',
    description: 'Support for updating credit card information, resolving payment failures, and managing billing for uninterrupted service.'
  },
  {
    id: 'renewal',
    title: 'Renewal, Cancellation, & Subscription Management',
    description: 'Help with managing your subscription, renewing your service, or processing cancellations with clear, easy steps.'
  },
  {
    id: 'troubleshooting',
    title: 'General Customer Service & Troubleshooting',
    description: 'Comprehensive support for any System Mechanic-related query, from general inquiries to advanced troubleshooting.'
  },
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'fix-system-mechanic-login-issues',
    title: 'How to Fix System Mechanic Login Issues – Call ' + SUPPORT_PHONE_NUMBER + ' for Help',
    author: 'Support Team',
    date: '2023-10-26',
    summary: 'Experiencing trouble logging into your System Mechanic account? This guide provides common solutions. For immediate help, call our experts!',
    content: `
      <h2>Steps to Resolve System Mechanic Login Problems</h2>
      <p>System Mechanic is designed to keep your PC running smoothly, but sometimes you might encounter issues logging into your account. Here are some common troubleshooting steps:</p>
      <ol class="list-decimal list-inside space-y-2 mt-4">
        <li><strong>Check your internet connection:</strong> Ensure you have a stable internet connection.</li>
        <li><strong>Verify your credentials:</strong> Double-check your username and password for typos.</li>
        <li><strong>Reset your password:</strong> If you've forgotten your password, use the "Forgot Password" link on the login page.</li>
        <li><strong>Clear browser cache and cookies:</strong> Sometimes, old data can interfere with login processes.</li>
        <li><strong>Disable VPN or proxy:</strong> Temporarily disable any VPN or proxy services you might be using.</li>
        <li><strong>Check for service outages:</strong> Visit the official System Mechanic website or social media for any reported outages.</li>
      </ol>
      <p class="mt-4">If you've tried these steps and are still unable to log in, don't worry! Our 24/7 support team is here to help. You can reach us anytime for instant assistance:</p>
      <p class="text-xl font-bold mt-2"><a href="${SUPPORT_PHONE_LINK}" class="text-accent hover:underline">${SUPPORT_PHONE_NUMBER}</a></p>
      <p>We're dedicated to getting you back into your account quickly.</p>
    `,
    imageUrl: 'https://picsum.photos/800/400?random=5',
    seo: {
      ...defaultSEO,
      url: '/blog/fix-system-mechanic-login-issues',
      title: 'How to Fix System Mechanic Login Issues – Call ' + SUPPORT_PHONE_NUMBER + ' for Help',
      metaDescription: 'Having trouble logging into System Mechanic? Follow our guide or call ' + SUPPORT_PHONE_NUMBER + ' for instant assistance.',
    },
  },
  {
    id: '2',
    slug: 'reactivate-system-mechanic-account',
    title: 'How to Reactivate Your System Mechanic Account – Get Support at ' + SUPPORT_PHONE_NUMBER,
    author: 'Support Team',
    date: '2023-11-15',
    summary: 'Need to reactivate your System Mechanic account or subscription? Learn the simple steps here or call us for help!',
    content: `
      <h2>Reactivating Your System Mechanic Account</h2>
      <p>If your System Mechanic subscription has expired or become inactive, reactivating it is usually a straightforward process. Here's a general guide:</p>
      <ol class="list-decimal list-inside space-y-2 mt-4">
        <li><strong>Open System Mechanic:</strong> Launch the application on your computer.</li>
        <li><strong>Look for Activation Prompts:</strong> The software will usually prompt you to reactivate or renew your license.</li>
        <li><strong>Enter your Activation Key:</strong> If you have a new activation key, enter it in the designated field.</li>
        <li><strong>Log into your iolo Account:</strong> You might need to log into your iolo Technologies account to manage your subscriptions.</li>
        <li><strong>Check Subscription Status:</strong> Ensure your payment method is up-to-date if you are on an auto-renewal plan.</li>
      </ol>
      <p class="mt-4">Sometimes, reactivation can be tricky due to account specifics or technical glitches. If you encounter any issues during the reactivation process, please don't hesitate to reach out to our dedicated support team:</p>
      <p class="text-xl font-bold mt-2"><a href="${SUPPORT_PHONE_LINK}" class="text-accent hover:underline">${SUPPORT_PHONE_NUMBER}</a></p>
      <p>We're available 24/7 to provide personalized assistance and ensure your System Mechanic is fully operational.</p>
    `,
    imageUrl: 'https://picsum.photos/800/400?random=6',
    seo: {
      ...defaultSEO,
      url: '/blog/reactivate-system-mechanic-account',
      title: 'How to Reactivate Your System Mechanic Account – Get Support at ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Need to reactivate your System Mechanic account or subscription? Learn the simple steps here or call ' + SUPPORT_PHONE_NUMBER + ' for help!',
    },
  },
  {
    id: '3',
    slug: 'resolve-system-mechanic-installation-problems',
    title: 'Steps to Resolve System Mechanic Installation Problems – Call ' + SUPPORT_PHONE_NUMBER,
    author: 'Support Team',
    date: '2023-12-01',
    summary: 'Having trouble installing System Mechanic? This guide covers common issues and solutions. For direct help, contact us now!',
    content: `
      <h2>Troubleshooting System Mechanic Installation Issues</h2>
      <p>Installing System Mechanic should be a smooth process, but occasional issues can arise. Here’s a guide to help you resolve common installation problems:</p>
      <ol class="list-decimal list-inside space-y-2 mt-4">
        <li><strong>Check System Requirements:</strong> Ensure your computer meets the minimum system requirements for System Mechanic.</li>
        <li><strong>Download from Official Source:</strong> Always download the installer directly from the official iolo Technologies website.</li>
        <li><strong>Disable Antivirus Temporarily:</strong> Your antivirus software might interfere with the installation. Temporarily disable it, install, then re-enable.</li>
        <li><strong>Run as Administrator:</strong> Right-click the installer file and select "Run as administrator."</li>
        <li><strong>Clear Previous Installation Files:</strong> If you had a previous installation, ensure all residual files are removed before a new attempt.</li>
        <li><strong>Check Disk Space:</strong> Make sure you have enough free disk space for the installation.</li>
      </ol>
      <p class="mt-4">If these steps don't resolve your installation issues, our technical support specialists are ready to provide immediate assistance. Don't let installation problems slow you down!</p>
      <p class="text-xl font-bold mt-2"><a href="${SUPPORT_PHONE_LINK}" class="text-accent hover:underline">${SUPPORT_PHONE_NUMBER}</a></p>
      <p>Call us 24/7 for expert help with any System Mechanic installation challenge.</p>
    `,
    imageUrl: 'https://picsum.photos/800/400?random=7',
    seo: {
      ...defaultSEO,
      url: '/blog/resolve-system-mechanic-installation-problems',
      title: 'Steps to Resolve System Mechanic Installation Problems – Call ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Having trouble installing System Mechanic? Follow our guide or call ' + SUPPORT_PHONE_NUMBER + ' for instant assistance.',
    },
  },
];

export const DEFAULT_WEBSITE_DATA: WebsiteData = {
  theme: DEFAULT_THEME_SETTINGS,
  homePage: {
    headline: 'Need help with System Mechanic? Call ' + SUPPORT_PHONE_NUMBER + ' for instant support.',
    tagline: '24/7 Live Assistance for Installation, Reactivation, Login, Billing, and More.',
    servicesSummary: [
      'Installation, Uninstallation, & Reactivation',
      'Account Recovery, Login Issues, & Error Fixes',
      'Credit Card Expiration & Payment Issues',
      'Renewal, Cancellation, & Subscription Management',
      'General Customer Service & Troubleshooting',
    ],
    heroImageUrl: 'https://picsum.photos/1920/1080?random=1',
    seo: {
      ...defaultSEO,
      url: '/',
      title: 'System Mechanic USA Support – 24/7 Assistance ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Get expert help with System Mechanic issues. Call ' + SUPPORT_PHONE_NUMBER + ' for 24/7 live support on installation, login, billing, and more.',
    },
  },
  aboutPage: {
    title: 'About System Mechanic USA Assistance',
    sections: [
      {
        heading: 'Our Mission',
        content: `At System Mechanic USA Assistance, our mission is to provide unparalleled 24/7 live support to System Mechanic users across the United States. We understand that technical issues can arise at any time, causing frustration and disrupting your productivity. That's why our dedicated team of experts is always on standby, ready to deliver prompt, reliable, and customer-centric solutions to get your software running smoothly. We believe in empowering our customers with immediate and effective assistance, ensuring a seamless experience with their System Mechanic products.`,
        imageUrl: 'https://picsum.photos/800/600?random=2',
        imageAlt: 'Our Mission - Customer Service',
      },
      {
        heading: 'Why Choose Us?',
        content: `Choosing System Mechanic USA Assistance means opting for peace of mind. Our team comprises highly trained professionals with deep expertise in System Mechanic software and common PC optimization challenges. We pride ourselves on our commitment to resolving your issues quickly and efficiently, whether it's an installation problem, a login error, billing inquiry, or advanced troubleshooting. With 24/7 availability, you'll never be left waiting for support. We're here to ensure your System Mechanic software works optimally, allowing you to enjoy a fast, clean, and error-free computer experience.`,
        imageUrl: 'https://picsum.photos/800/600?random=3',
        imageAlt: 'Why Choose Us - Reliable Team',
      },
    ],
    seo: {
      ...defaultSEO,
      url: '/about-us',
      title: 'About System Mechanic USA Assistance – 24/7 Expert Support | ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Learn about System Mechanic USA Assistance. We offer 24/7 expert support for all your System Mechanic needs. Call ' + SUPPORT_PHONE_NUMBER + ' today.',
    },
  },
  servicesPage: {
    title: 'Our Comprehensive Support Services',
    introduction: 'We offer a wide range of services to ensure your System Mechanic experience is always smooth and problem-free. Our 24/7 live support team is ready to assist you with any issue.',
    serviceList: DEFAULT_SERVICES,
    seo: {
      ...defaultSEO,
      url: '/services',
      title: 'System Mechanic Support Services – Install, Reactivate, Billing & More | ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Comprehensive technical support for System Mechanic users. Call us at ' + SUPPORT_PHONE_NUMBER + ' for help with installation, login issues, billing problems, and more.',
    },
  },
  blogPage: {
    title: 'Helpful Articles & Guides',
    introduction: 'Explore our library of articles and step-by-step guides to resolve common System Mechanic issues. For personalized assistance, our support team is always available!',
    seo: {
      ...defaultSEO,
      url: '/blog',
      title: 'System Mechanic Blog – Troubleshooting Guides & Tips | ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Find solutions to common System Mechanic problems with our detailed blog articles and guides. For live support, call ' + SUPPORT_PHONE_NUMBER + '.',
    },
  },
  blogPosts: DEFAULT_BLOG_POSTS,
  contactPage: {
    title: 'Contact Our Support Team',
    formIntro: 'Reach out to us using the form below, or for immediate assistance, please call our 24/7 support line.',
    phone: SUPPORT_PHONE_NUMBER,
    address: '123 Support Lane, Anytown, CA 90210, USA',
    email: 'support@systemmechanicusaassistance.com',
    seo: {
      ...defaultSEO,
      url: '/contact-us',
      title: 'Contact System Mechanic USA Support – Call ' + SUPPORT_PHONE_NUMBER,
      metaDescription: 'Get in touch with System Mechanic USA Assistance for 24/7 support. Call ' + SUPPORT_PHONE_NUMBER + ' or fill out our contact form for help.',
    },
  },
  footer: {
    companyName: 'System Mechanic USA Assistance',
    phone: SUPPORT_PHONE_NUMBER,
    privacyPolicyLinkText: 'Privacy Policy',
    termsOfServiceLinkText: 'Terms of Service',
    copyrightText: `© ${new Date().getFullYear()} System Mechanic USA Assistance. All rights reserved.`,
  },
  navbar: {
    brandName: 'System Mechanic USA Assistance',
    homeLinkText: 'Home',
    aboutLinkText: 'About Us',
    servicesLinkText: 'Services',
    blogLinkText: 'Blog',
    contactLinkText: 'Contact Us',
    adminLinkText: 'Admin',
  },
};
