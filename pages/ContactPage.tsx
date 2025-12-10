import React, { useState } from 'react';
import { ContactPageContent, ThemeSettings } from '../types';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface ContactPageProps {
  content: ContactPageContent;
  theme: ThemeSettings;
}

const ContactPage: React.FC<ContactPageProps> = ({ content, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API.
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Optionally reset form
    // setFormData({ name: '', email: '', issueType: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <SEOManager seo={content.seo} />
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6">
        {content.title}
      </h1>
      <p className="text-xl text-textSecondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
        {content.formIntro}
      </p>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Contact Information Section */}
        <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200 order-2 lg:order-1 w-full">
          <h2 className="text-3xl font-bold text-textPrimary mb-6">Get In Touch Directly</h2>
          <div className="space-y-6">
            <div>
              <p className="text-lg font-semibold text-primary mb-2">24/7 Support Hotline:</p>
              <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call Us Now" className="justify-start" />
            </div>
            {content.email && (
              <div>
                <p className="text-lg font-semibold text-primary mb-2">Email Us:</p>
                <a href={`mailto:${content.email}`} className="text-accent text-lg hover:underline">
                  {content.email}
                </a>
              </div>
            )}
            {content.address && (
              <div>
                <p className="text-lg font-semibold text-primary mb-2">Our Location:</p>
                <address className="not-italic text-textSecondary text-lg">
                  {content.address}
                </address>
              </div>
            )}
          </div>
          <img
            src={theme.contactImage}
            alt="Customer support team"
            className="w-full h-auto rounded-lg mt-8 shadow-md object-cover max-h-64"
          />
        </div>

        {/* Contact Form Section */}
        <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200 order-1 lg:order-2 w-full">
          <h2 className="text-3xl font-bold text-textPrimary mb-6">Send Us a Message</h2>
          {isSubmitted ? (
            <div className="text-center py-10">
              <p className="text-xl text-green-600 font-semibold mb-4">Thank you for your message!</p>
              <p className="text-textSecondary">We will get back to you as soon as possible. For urgent matters, please call us.</p>
              <Button onClick={() => setIsSubmitted(false)} className="mt-6" variant="primary">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textPrimary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textPrimary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="issueType" className="block text-sm font-medium text-textPrimary mb-2">
                  Issue Type
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select an issue type</option>
                  <option value="installation">Installation/Uninstallation</option>
                  <option value="login">Login/Account Issues</option>
                  <option value="billing">Billing/Payment</option>
                  <option value="renewal">Renewal/Cancellation</option>
                  <option value="technical">Technical Troubleshooting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-textPrimary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;