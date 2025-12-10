import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, BlogPageContent } from '../types';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface BlogListingPageProps {
  content: BlogPageContent;
  blogPosts: BlogPost[];
}

const BlogListingPage: React.FC<BlogListingPageProps> = ({ content, blogPosts }) => {
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
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-textPrimary mb-3 leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                By {post.author} on {post.date}
              </p>
              <p className="text-textSecondary mb-6 flex-grow">
                {post.summary}
              </p>
              <Link to={`/blog/${post.slug}`} className="text-accent font-semibold hover:underline mt-auto">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
          Still need help after reading our articles?
        </h2>
        <p className="text-lg text-textSecondary mb-8 max-w-3xl mx-auto">
          Our 24/7 live support team is always available to provide personalized assistance.
        </p>
        <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call Our Support Team" />
      </div>
    </div>
  );
};

export default BlogListingPage;