import React from 'react';
import { Link } from 'react-router-dom';
import { FooterContent } from '../types';
import { SUPPORT_PHONE_LINK } from '../constants';

interface FooterProps {
  footerContent: FooterContent;
  navbarBrandName: string;
}

const Footer: React.FC<FooterProps> = ({ footerContent, navbarBrandName }) => {
  return (
    <footer className="bg-primary text-white py-8 mt-auto shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-8 md:space-y-0">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold hover:text-secondary transition duration-300">
              {navbarBrandName}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
            <Link to="/" className="hover:text-secondary transition duration-300">Home</Link>
            <Link to="/about-us" className="hover:text-secondary transition duration-300">About Us</Link>
            <Link to="/services" className="hover:text-secondary transition duration-300">Services</Link>
            <Link to="/blog" className="hover:text-secondary transition duration-300">Blog</Link>
            <Link to="/contact-us" className="hover:text-secondary transition duration-300">Contact Us</Link>
          </div>

          {/* Contact Information */}
          <div className="flex-shrink-0">
            <p className="mb-2">24/7 Support: <a href={SUPPORT_PHONE_LINK} className="text-accent hover:underline">{footerContent.phone}</a></p>
            <p className="flex justify-center md:justify-start space-x-4">
              <Link to="/privacy-policy" className="hover:text-secondary transition duration-300">{footerContent.privacyPolicyLinkText}</Link>
              <Link to="/terms-of-service" className="hover:text-secondary transition duration-300">{footerContent.termsOfServiceLinkText}</Link>
            </p>
          </div>
        </div>

        <div className="border-t border-red-700 mt-8 pt-8 text-center text-sm">
          <p>{footerContent.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;