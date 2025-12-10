import React from 'react';
import { ServicesPageContent } from '../types';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface ServicesPageProps {
  content: ServicesPageContent;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ content }) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <SEOManager seo={content.seo} />
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6">
        {content.title}
      </h1>
      <p className="text-xl text-textSecondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
        {content.introduction}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.serviceList.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
          >
            {service.icon && (
              <div className="text-accent text-5xl mb-4">
                {/* Placeholder for SVG icon, could use a library like Heroicons */}
                <span role="img" aria-label="service icon">{service.icon}</span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-textPrimary mb-3">
              {service.title}
            </h2>
            <p className="text-textSecondary mb-6 flex-grow">
              {service.description}
            </p>
            <CallToAction
              phoneNumber={SUPPORT_PHONE_NUMBER}
              text="Call for this Service"
              className="mt-auto"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
          Don't see your issue listed?
        </h2>
        <p className="text-lg text-textSecondary mb-8 max-w-3xl mx-auto">
          Our team handles a comprehensive range of System Mechanic issues.
          Contact us with your specific problem for immediate and effective support.
        </p>
        <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Speak to an Expert Now" />
      </div>
    </div>
  );
};

export default ServicesPage;