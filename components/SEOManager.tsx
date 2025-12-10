import React from 'react';
import { useEffect } from 'react';
import { SEO } from '../types';

interface SEOManagerProps {
  seo: SEO;
}

const SEOManager: React.FC<SEOManagerProps> = ({ seo }) => {
  useEffect(() => {
    document.title = seo.title;

    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', seo.metaDescription);

    let metaOgTitleTag = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitleTag && seo.ogTitle) {
      metaOgTitleTag = document.createElement('meta');
      metaOgTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(metaOgTitleTag);
    }
    if (metaOgTitleTag && seo.ogTitle) {
      metaOgTitleTag.setAttribute('content', seo.ogTitle);
    }

    let metaOgDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (!metaOgDescriptionTag && seo.ogDescription) {
      metaOgDescriptionTag = document.createElement('meta');
      metaOgDescriptionTag.setAttribute('property', 'og:description');
      document.head.appendChild(metaOgDescriptionTag);
    }
    if (metaOgDescriptionTag && seo.ogDescription) {
      metaOgDescriptionTag.setAttribute('content', seo.ogDescription);
    }

    let metaOgImageTag = document.querySelector('meta[property="og:image"]');
    if (!metaOgImageTag && seo.ogImage) {
      metaOgImageTag = document.createElement('meta');
      metaOgImageTag.setAttribute('property', 'og:image');
      document.head.appendChild(metaOgImageTag);
    }
    if (metaOgImageTag && seo.ogImage) {
      metaOgImageTag.setAttribute('content', seo.ogImage);
    }

  }, [seo]);

  return null;
};

export default SEOManager;