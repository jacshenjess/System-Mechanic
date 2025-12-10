import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import CallToAction from '../components/CallToAction';
import SEOManager from '../components/SEOManager';
import { SUPPORT_PHONE_NUMBER, SUPPORT_PHONE_LINK } from '../constants';

interface BlogPostPageProps {
  blogPosts: BlogPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ blogPosts }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Blog Post Not Found</h1>
        <p className="text-lg text-textSecondary mb-8">
          The article you are looking for might have been moved or doesn't exist.
        </p>
        <Link to="/blog" className="text-accent hover:underline text-lg">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const currentUrl = window.location.href; // For social sharing
  const shareText = `Check out this helpful article from System Mechanic USA Assistance: "${post.title}"`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <SEOManager seo={post.seo} />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-6 md:p-8 lg:p-10">
        <Link to="/blog" className="text-accent hover:underline mb-6 block w-fit">
          &larr; Back to Blog
        </Link>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8 shadow-md"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          By <span className="font-semibold">{post.author}</span> on{' '}
          <time dateTime={post.date}>{post.date}</time>
        </p>

        <div
          className="prose prose-lg text-textSecondary max-w-none leading-relaxed [&_h2]:text-textPrimary [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mb-4 [&_p]:mb-4 [&_ol]:list-decimal [&_ol]:list-inside [&_li]:mb-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Share This Article:</h3>
          <div className="flex space-x-4">
            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
              aria-label="Share on Facebook"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .2-2.3C14.7 4.9 15 4.5 16 4.5h2V2.1c-.4-.1-1.2-.1-2.2-.1-2.5 0-4.2 1.5-4.2 4.2v2.2H8.5v4H12v6h4v-6h-2z"/></svg>
            </a>
            {/* Twitter Share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300"
              aria-label="Share on Twitter"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 6.9c-.8.3-1.6.6-2.4.7.9-.5 1.6-1.3 1.9-2.3-.8.5-1.7.9-2.7 1.1C18.1 4.3 17 3.9 15.9 3.9c-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1.9C8.6 8.8 5.7 7.2 3.8 4.7c-.3.5-.5 1.2-.5 1.9 0 1.4.7 2.6 1.8 3.4-.7 0-1.4-.2-2-.5v.1c0 2.1 1.5 3.9 3.5 4.3-.4.1-.8.1-1.2.1-.3 0-.6 0-.9-.1.6 1.7 2.2 2.9 4.2 2.9-1.5 1.2-3.4 1.9-5.5 1.9-.4 0-.8 0-1.1-.1 2 1.3 4.4 2.1 6.9 2.1 8.3 0 12.8-6.9 12.8-12.8 0-.2 0-.4 0-.6.9-.6 1.7-1.3 2.3-2.2z"/></svg>
            </a>
            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.summary)}&source=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300"
              aria-label="Share on LinkedIn"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 6.9v10.2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6.9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zM8 18.5H5.5V9.7H8v8.8zM6.7 8.6c-.9 0-1.5-.6-1.5-1.5 0-.8.6-1.4 1.5-1.4.9 0 1.5.6 1.5 1.5 0 .8-.6 1.4-1.5 1.4zM18.5 18.5h-2.5v-4.4c0-1.1-.5-2-1.8-2-1 0-1.6.7-1.8 1.4-.1.3-.1.6-.1.9v2.2H10v-8.8h2.5v1.1c.3-.5 1-1.2 2.2-1.2 2.1 0 3.5 1.4 3.5 4.3v4.6z"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-10 text-center bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-textPrimary mb-4">
            Need immediate assistance?
          </h3>
          <p className="text-lg text-textSecondary mb-6">
            If this article didn't fully resolve your issue, our 24/7 support team is just a call away.
            Get personalized, expert help for any System Mechanic problem.
          </p>
          <CallToAction phoneNumber={SUPPORT_PHONE_NUMBER} text="Call for Instant Support" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;