import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { WebsiteData } from './types';
import { DEFAULT_WEBSITE_DATA } from './constants';

const LOCAL_STORAGE_KEY = 'systemMechanicWebsiteData';

const App: React.FC = () => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : DEFAULT_WEBSITE_DATA;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(websiteData));
  }, [websiteData]);

  // Apply theme settings to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', websiteData.theme.primaryColor);
    root.style.setProperty('--color-secondary', websiteData.theme.secondaryColor);
    root.style.setProperty('--color-accent', websiteData.theme.accentColor);
    root.style.setProperty('--color-text-primary', websiteData.theme.textPrimaryColor);
    root.style.setProperty('--color-text-secondary', websiteData.theme.textSecondaryColor);
    root.style.setProperty('--font-sans', websiteData.theme.fontSans);
    root.style.setProperty('--font-serif', websiteData.theme.fontSerif);
    root.style.setProperty('--font-mono', websiteData.theme.fontMono);
  }, [websiteData.theme]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar navbarContent={websiteData.navbar} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage content={websiteData.homePage} theme={websiteData.theme} />} />
            <Route path="/about-us" element={<AboutPage content={websiteData.aboutPage} theme={websiteData.theme} />} />
            <Route path="/services" element={<ServicesPage content={websiteData.servicesPage} />} />
            <Route path="/blog" element={<BlogListingPage content={websiteData.blogPage} blogPosts={websiteData.blogPosts} />} />
            <Route path="/blog/:slug" element={<BlogPostPage blogPosts={websiteData.blogPosts} />} />
            <Route path="/contact-us" element={<ContactPage content={websiteData.contactPage} theme={websiteData.theme} />} />
            <Route path="/admin" element={<AdminDashboardPage websiteData={websiteData} setWebsiteData={setWebsiteData} />} />
            {/* Placeholder for Privacy Policy and Terms of Service if needed */}
            <Route path="/privacy-policy" element={
              <div className="container mx-auto px-4 py-8 md:py-16 text-center">
                <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>
                <p className="text-textSecondary text-lg">
                  This is a placeholder for your Privacy Policy.
                  Please update this page with your actual legal terms.
                </p>
              </div>
            } />
            <Route path="/terms-of-service" element={
              <div className="container mx-auto px-4 py-8 md:py-16 text-center">
                <h1 className="text-4xl font-bold text-primary mb-6">Terms of Service</h1>
                <p className="text-textSecondary text-lg">
                  This is a placeholder for your Terms of Service.
                  Please update this page with your actual legal terms.
                </p>
              </div>
            } />
          </Routes>
        </main>
        <Footer footerContent={websiteData.footer} navbarBrandName={websiteData.navbar.brandName} />
      </div>
    </HashRouter>
  );
};

export default App;