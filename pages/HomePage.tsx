import React from 'react';
import { HomePageContent, ThemeSettings } from '../types';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface HomePageProps {
  content: HomePageContent;
  theme: ThemeSettings;
}

const HomePage: React.FC<HomePageProps> = ({ content, theme }) => {
  return (
    <div className="relative overflow-hidden">
      <SEOManager seo={content.seo} />
      
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] md:h-[70vh] flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${theme.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            {content.headline}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light drop-shadow-md">
            {content.tagline}
          </p>
          <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call Now" className="inline-block" />
        </div>
      </section>

      {/* Services Summary Section */}
      <section className="py-16 bg-secondary text-center px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-textPrimary">
            Comprehensive Support for All Your System Mechanic Needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.servicesSummary.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">{service}</h3>
                <p className="text-textSecondary">
                  {/* Placeholder for more detailed description if needed, or keep it concise */}
                  Expert assistance tailored to your specific issue.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Get Instant Support Now" />
          </div>
        </div>
      </section>

      {/* Call to Action Banner (Optional - could be combined with hero or other section) */}
      <section className="bg-accent py-12 text-center text-white px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Facing an issue? Don't wait, call our experts!
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Our team is available 24/7 to provide immediate, effective solutions for any System Mechanic problem you encounter.
          </p>
          <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call for 24/7 Support" className="inline-block" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;