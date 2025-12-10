import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarContent } from '../types';
import { SUPPORT_PHONE_LINK, SUPPORT_PHONE_NUMBER } from '../constants';

interface NavbarProps {
  navbarContent: NavbarContent;
}

const Navbar: React.FC<NavbarProps> = ({ navbarContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: '/', text: navbarContent.homeLinkText },
    { to: '/about-us', text: navbarContent.aboutLinkText },
    { to: '/services', text: navbarContent.servicesLinkText },
    { to: '/blog', text: navbarContent.blogLinkText },
    { to: '/contact-us', text: navbarContent.contactLinkText },
    { to: '/admin', text: navbarContent.adminLinkText },
  ];

  return (
    <nav className="bg-primary p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <NavLink to="/" className="text-white text-2xl font-bold whitespace-nowrap mr-6">
          {navbarContent.brandName}
        </NavLink>

        {/* Hamburger menu for mobile */}
        <div className="flex items-center">
          <a href={SUPPORT_PHONE_LINK} className="text-white text-sm font-semibold md:hidden mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>


        {/* Desktop menu */}
        <div className="hidden md:flex flex-grow justify-end items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-white px-4 py-2 hover:bg-red-700 rounded-md transition duration-300 ${
                  isActive ? 'bg-red-700' : ''
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
          <a href={SUPPORT_PHONE_LINK} className="text-white bg-accent px-4 py-2 ml-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {SUPPORT_PHONE_NUMBER}
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-primary rounded-lg shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-white px-4 py-3 hover:bg-red-700 transition duration-300 ${
                  isActive ? 'bg-red-700' : ''
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
          <a href={SUPPORT_PHONE_LINK} onClick={() => setIsOpen(false)} className="block text-white bg-accent px-4 py-3 mx-4 my-2 rounded-md text-center hover:bg-red-600 transition duration-300">
            Call {SUPPORT_PHONE_NUMBER}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;