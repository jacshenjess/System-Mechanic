import React from 'react';
import { AboutPageContent, ThemeSettings } from '../types';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface AboutPageProps {
  content: AboutPageContent;
  theme: ThemeSettings;
}

const AboutPage: React.FC<AboutPageProps> = ({ content, theme }) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <SEOManager seo={content.seo} />
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-12">
        {content.title}
      </h1>

      {content.sections.map((section, index) => (
        <section
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center mb-16 md:mb-24 gap-8 lg:gap-16`}
        >
          <div className="md:w-1/2">
            <img
              src={section.imageUrl || (index % 2 === 0 ? theme.aboutImage1 : theme.aboutImage2)}
              alt={section.imageAlt || section.heading}
              className="rounded-lg shadow-xl w-full h-auto object-cover max-h-96"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
              {section.heading}
            </h2>
            <p className="text-lg text-textSecondary leading-relaxed">
              {section.content}
            </p>
          </div>
        </section>
      ))}

      {/* Call to Action at the bottom */}
      <div className="mt-12 md:mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
          Ready for reliable support?
        </h2>
        <p className="text-lg text-textSecondary mb-8 max-w-3xl mx-auto">
          Our customer-centric approach means your satisfaction is our top priority.
          Experience the difference of dedicated, 24/7 live assistance.
        </p>
        <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call Us Today" />
      </div>
    </div>
  );
};

export default AboutPage;