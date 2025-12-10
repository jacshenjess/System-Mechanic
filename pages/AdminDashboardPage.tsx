import React, { useState, useEffect } from 'react';
import {
  WebsiteData,
  ThemeSettings,
  HomePageContent,
  AboutPageContent,
  ServicesPageContent,
  BlogPageContent,
  BlogPost,
  ContactPageContent,
  FooterContent,
  NavbarContent,
  Service,
  SEO,
  WebsiteSection,
} from '../types';
import Button from '../components/Button';
import { SUPPORT_PHONE_NUMBER } from '../constants';

interface AdminDashboardPageProps {
  websiteData: WebsiteData;
  setWebsiteData: React.Dispatch<React.SetStateAction<WebsiteData>>;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ websiteData, setWebsiteData }) => {
  const [activeTab, setActiveTab] = useState<WebsiteSection>('homePage');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<BlogPost | null>(null);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleContentChange = (
    section: Exclude<WebsiteSection, 'theme' | 'blogPosts'>,
    field: string,
    value: string | string[],
  ) => {
    setWebsiteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSEOChange = (section: WebsiteSection, field: keyof SEO, value: string) => {
    if (section === 'blogPosts') {
      if (!editingPostId) return;
      setWebsiteData((prev) => ({
        ...prev,
        blogPosts: prev.blogPosts.map((post) =>
          post.id === editingPostId
            ? { ...post, seo: { ...post.seo, [field]: value } }
            : post,
        ),
      }));
    } else {
      setWebsiteData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          seo: {
            ...(prev[section] as { seo: SEO }).seo,
            [field]: value,
          },
        },
      }));
    }
  };

  // Service list management
  const handleServiceChange = (id: string, field: keyof Service, value: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      servicesPage: {
        ...prev.servicesPage,
        serviceList: prev.servicesPage.serviceList.map((service) =>
          service.id === id ? { ...service, [field]: value } : service,
        ),
      },
    }));
  };

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Description for the new service.',
    };
    setWebsiteData((prev) => ({
      ...prev,
      servicesPage: {
        ...prev.servicesPage,
        serviceList: [...prev.servicesPage.serviceList, newService],
      },
    }));
  };

  const deleteService = (id: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      servicesPage: {
        ...prev.servicesPage,
        serviceList: prev.servicesPage.serviceList.filter((service) => service.id !== id),
      },
    }));
  };

  // Blog post management
  const startEditingPost = (id: string) => {
    setEditingPostId(id);
    setNewPost(null); // Clear new post form when editing existing
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setNewPost(null);
  };

  const handleBlogPostChange = (id: string, field: keyof BlogPost, value: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post,
      ),
    }));
  };

  const handleNewPostChange = (field: keyof BlogPost, value: string) => {
    setNewPost((prev) => ({
      ...(prev || {} as BlogPost), // Ensure prev is an object
      id: prev?.id || `blog-${Date.now()}`,
      slug: prev?.slug || '', // Will generate later if empty
      author: prev?.author || 'Admin',
      date: prev?.date || new Date().toISOString().split('T')[0],
      summary: prev?.summary || '',
      content: prev?.content || '',
      imageUrl: prev?.imageUrl || 'https://picsum.photos/800/400?random=8',
      seo: {
        ...(prev?.seo || {} as SEO),
        url: prev?.seo?.url || '', // Will generate later
        title: prev?.seo?.title || 'New Blog Post',
        metaDescription: prev?.seo?.metaDescription || 'A new blog post from System Mechanic USA Assistance.',
      },
      [field]: value,
    }));
  };

  const addBlogPost = () => {
    if (!newPost) return;
    const finalSlug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
    const finalPost = {
      ...newPost,
      slug: finalSlug,
      seo: {
        ...newPost.seo,
        url: `/blog/${finalSlug}`,
        title: newPost.seo.title || `${newPost.title} – Call ${SUPPORT_PHONE_NUMBER}`,
        metaDescription: newPost.seo.metaDescription || `Read about ${newPost.title}. For live support, call ${SUPPORT_PHONE_NUMBER}.`,
      },
    };
    setWebsiteData((prev) => ({
      ...prev,
      blogPosts: [...prev.blogPosts, finalPost],
    }));
    setNewPost(null); // Clear new post form
  };

  const deleteBlogPost = (id: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((post) => post.id !== id),
    }));
    cancelEditing();
  };

  const renderThemeSettings = (theme: ThemeSettings) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-2 text-primary">Colors</h3>
      {Object.entries(theme).filter(([key]) => key.includes('Color')).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-textPrimary capitalize mb-1">
            {key.replace(/([A-Z])/g, ' $1').replace('color', ' Color')}
          </label>
          <input
            type="color"
            id={key}
            name={key}
            value={value}
            onChange={handleThemeChange}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <h3 className="text-xl font-semibold mb-2 text-primary mt-6">Fonts</h3>
      {Object.entries(theme).filter(([key]) => key.includes('font')).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-textPrimary capitalize mb-1">
            {key.replace(/([A-Z])/g, ' $1').replace('font', 'Font')} (e.g., system-ui, sans-serif)
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleThemeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <h3 className="text-xl font-semibold mb-2 text-primary mt-6">Images (URLs)</h3>
      {Object.entries(theme).filter(([key]) => key.includes('Image')).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-textPrimary capitalize mb-1">
            {key.replace(/([A-Z])/g, ' $1')} URL
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleThemeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {value && <img src={value} alt={key} className="mt-2 w-32 h-20 object-cover rounded-md" />}
        </div>
      ))}
    </div>
  );

  const renderSEOForm = (section: WebsiteSection, seo: SEO) => (
    <div className="border border-gray-200 p-4 rounded-md mt-6 bg-gray-50">
      <h4 className="font-bold text-lg mb-4 text-textPrimary">SEO Settings</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">URL (Read-only)</label>
          <input type="text" value={seo.url} readOnly className="w-full px-3 py-2 border bg-gray-100 rounded-md" />
        </div>
        <div>
          <label htmlFor={`${section}-seo-title`} className="block text-sm font-medium text-textPrimary mb-1">Title</label>
          <input
            type="text"
            id={`${section}-seo-title`}
            value={seo.title}
            onChange={(e) => handleSEOChange(section, 'title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`${section}-seo-description`} className="block text-sm font-medium text-textPrimary mb-1">Meta Description</label>
          <textarea
            id={`${section}-seo-description`}
            value={seo.metaDescription}
            onChange={(e) => handleSEOChange(section, 'metaDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = (sectionKey: WebsiteSection) => {
    const currentContent = websiteData[sectionKey] as any;

    switch (sectionKey) {
      case 'theme':
        return renderThemeSettings(websiteData.theme);
      case 'homePage':
        const homePage = currentContent as HomePageContent;
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="home-headline" className="block text-sm font-medium text-textPrimary mb-1">Headline</label>
              <input type="text" id="home-headline" value={homePage.headline} onChange={(e) => handleContentChange('homePage', 'headline', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="home-tagline" className="block text-sm font-medium text-textPrimary mb-1">Tagline</label>
              <textarea id="home-tagline" value={homePage.tagline} onChange={(e) => handleContentChange('homePage', 'tagline', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">Services Summary (comma-separated)</label>
              <textarea
                value={homePage.servicesSummary.join(', ')}
                onChange={(e) => handleContentChange('homePage', 'servicesSummary', e.target.value.split(',').map(s => s.trim()))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label htmlFor="home-heroImageUrl" className="block text-sm font-medium text-textPrimary mb-1">Hero Image URL</label>
              <input type="text" id="home-heroImageUrl" value={homePage.heroImageUrl} onChange={(e) => handleContentChange('homePage', 'heroImageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              {homePage.heroImageUrl && <img src={homePage.heroImageUrl} alt="Hero" className="mt-2 w-48 h-24 object-cover rounded-md" />}
            </div>
            {renderSEOForm('homePage', homePage.seo)}
          </div>
        );
      case 'aboutPage':
        const aboutPage = currentContent as AboutPageContent;
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="about-title" className="block text-sm font-medium text-textPrimary mb-1">Page Title</label>
              <input type="text" id="about-title" value={aboutPage.title} onChange={(e) => handleContentChange('aboutPage', 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            {aboutPage.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-md bg-gray-50">
                <h4 className="font-semibold text-lg mb-3">Section {index + 1}</h4>
                <div>
                  <label htmlFor={`about-section-${index}-heading`} className="block text-sm font-medium text-textPrimary mb-1">Heading</label>
                  <input
                    type="text"
                    id={`about-section-${index}-heading`}
                    value={section.heading}
                    onChange={(e) => {
                      const newSections = [...aboutPage.sections];
                      newSections[index] = { ...newSections[index], heading: e.target.value };
                      handleContentChange('aboutPage', 'sections', newSections as any);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor={`about-section-${index}-content`} className="block text-sm font-medium text-textPrimary mb-1">Content</label>
                  <textarea
                    id={`about-section-${index}-content`}
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...aboutPage.sections];
                      newSections[index] = { ...newSections[index], content: e.target.value };
                      handleContentChange('aboutPage', 'sections', newSections as any);
                    }}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label htmlFor={`about-section-${index}-image`} className="block text-sm font-medium text-textPrimary mb-1">Image URL</label>
                  <input
                    type="text"
                    id={`about-section-${index}-image`}
                    value={section.imageUrl || ''}
                    onChange={(e) => {
                      const newSections = [...aboutPage.sections];
                      newSections[index] = { ...newSections[index], imageUrl: e.target.value };
                      handleContentChange('aboutPage', 'sections', newSections as any);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {section.imageUrl && <img src={section.imageUrl} alt="Section" className="mt-2 w-32 h-20 object-cover rounded-md" />}
                </div>
                <div className="mt-3">
                  <label htmlFor={`about-section-${index}-imageAlt`} className="block text-sm font-medium text-textPrimary mb-1">Image Alt Text</label>
                  <input
                    type="text"
                    id={`about-section-${index}-imageAlt`}
                    value={section.imageAlt || ''}
                    onChange={(e) => {
                      const newSections = [...aboutPage.sections];
                      newSections[index] = { ...newSections[index], imageAlt: e.target.value };
                      handleContentChange('aboutPage', 'sections', newSections as any);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
            {renderSEOForm('aboutPage', aboutPage.seo)}
          </div>
        );
      case 'servicesPage':
        const servicesPage = currentContent as ServicesPageContent;
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="services-title" className="block text-sm font-medium text-textPrimary mb-1">Page Title</label>
              <input type="text" id="services-title" value={servicesPage.title} onChange={(e) => handleContentChange('servicesPage', 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="services-intro" className="block text-sm font-medium text-textPrimary mb-1">Introduction</label>
              <textarea id="services-intro" value={servicesPage.introduction} onChange={(e) => handleContentChange('servicesPage', 'introduction', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Services List</h3>
            {servicesPage.serviceList.map((service, index) => (
              <div key={service.id} className="border p-4 rounded-md bg-gray-50 relative">
                <h4 className="font-semibold text-lg mb-3">Service {index + 1}</h4>
                <Button onClick={() => deleteService(service.id)} variant="outline" size="sm" className="absolute top-2 right-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                  Delete
                </Button>
                <div>
                  <label htmlFor={`service-${service.id}-title`} className="block text-sm font-medium text-textPrimary mb-1">Title</label>
                  <input
                    type="text"
                    id={`service-${service.id}-title`}
                    value={service.title}
                    onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor={`service-${service.id}-description`} className="block text-sm font-medium text-textPrimary mb-1">Description</label>
                  <textarea
                    id={`service-${service.id}-description`}
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            ))}
            <Button onClick={addService} variant="secondary" className="mt-4">Add New Service</Button>
            {renderSEOForm('servicesPage', servicesPage.seo)}
          </div>
        );
      case 'blogPage':
        const blogPage = currentContent as BlogPageContent;
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="blog-title" className="block text-sm font-medium text-textPrimary mb-1">Page Title</label>
              <input type="text" id="blog-title" value={blogPage.title} onChange={(e) => handleContentChange('blogPage', 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="blog-intro" className="block text-sm font-medium text-textPrimary mb-1">Introduction</label>
              <textarea id="blog-intro" value={blogPage.introduction} onChange={(e) => handleContentChange('blogPage', 'introduction', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            {renderSEOForm('blogPage', blogPage.seo)}
          </div>
        );
      case 'blogPosts':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-2 text-primary">Blog Posts Management</h3>
            {websiteData.blogPosts.map((post) => (
              <div key={post.id} className="border p-4 rounded-md bg-gray-50 flex justify-between items-center">
                <span>{post.title}</span>
                <Button onClick={() => startEditingPost(post.id)} variant="outline" size="sm">Edit</Button>
              </div>
            ))}
            <Button onClick={() => setNewPost({
              id: `blog-${Date.now()}`,
              slug: '',
              title: '',
              author: 'Admin',
              date: new Date().toISOString().split('T')[0],
              summary: '',
              content: '',
              imageUrl: 'https://picsum.photos/800/400?random=8',
              seo: {
                url: '', title: 'New Blog Post', metaDescription: 'A new blog post from System Mechanic USA Assistance.'
              },
            })} variant="secondary">Add New Blog Post</Button>

            {(editingPostId || newPost) && (
              <div className="border p-6 rounded-md bg-white shadow-md">
                <h4 className="font-bold text-lg mb-4 text-accent">
                  {editingPostId ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Title</label>
                    <input
                      type="text"
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.title : newPost?.title || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'title', e.target.value) : handleNewPostChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Slug</label>
                    <input
                      type="text"
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.slug : newPost?.slug || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'slug', e.target.value) : handleNewPostChange('slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Author</label>
                    <input
                      type="text"
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.author : newPost?.author || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'author', e.target.value) : handleNewPostChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Date</label>
                    <input
                      type="date"
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.date : newPost?.date || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'date', e.target.value) : handleNewPostChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Summary</label>
                    <textarea
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.summary : newPost?.summary || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'summary', e.target.value) : handleNewPostChange('summary', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Content (HTML)</label>
                    <textarea
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.content : newPost?.content || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'content', e.target.value) : handleNewPostChange('content', e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Image URL</label>
                    <input
                      type="text"
                      value={editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.imageUrl : newPost?.imageUrl || ''}
                      onChange={(e) => editingPostId ? handleBlogPostChange(editingPostId, 'imageUrl', e.target.value) : handleNewPostChange('imageUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {(editingPostId && websiteData.blogPosts.find(p => p.id === editingPostId)?.imageUrl) && <img src={websiteData.blogPosts.find(p => p.id === editingPostId)?.imageUrl} alt="Blog Post" className="mt-2 w-32 h-20 object-cover rounded-md" />}
                    {(newPost?.imageUrl) && <img src={newPost?.imageUrl} alt="Blog Post" className="mt-2 w-32 h-20 object-cover rounded-md" />}
                  </div>
                  {renderSEOForm('blogPosts', (editingPostId ? websiteData.blogPosts.find(p => p.id === editingPostId)?.seo : newPost?.seo) || {} as SEO)}
                  <div className="flex space-x-4 mt-6">
                    {editingPostId ? (
                      <>
                        <Button onClick={cancelEditing} variant="outline">Done Editing</Button>
                        <Button onClick={() => deleteBlogPost(editingPostId)} variant="primary" className="bg-red-500 hover:bg-red-600">Delete Post</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={addBlogPost} variant="primary">Create Post</Button>
                        <Button onClick={cancelEditing} variant="outline">Cancel</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'contactPage':
        const contactPage = currentContent as ContactPageContent;
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-title" className="block text-sm font-medium text-textPrimary mb-1">Page Title</label>
              <input type="text" id="contact-title" value={contactPage.title} onChange={(e) => handleContentChange('contactPage', 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="contact-formIntro" className="block text-sm font-medium text-textPrimary mb-1">Form Introduction</label>
              <textarea id="contact-formIntro" value={contactPage.formIntro} onChange={(e) => handleContentChange('contactPage', 'formIntro', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-textPrimary mb-1">Phone Number (Read-only)</label>
              <input type="text" id="contact-phone" value={contactPage.phone} readOnly className="w-full px-3 py-2 border bg-gray-100 rounded-md" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-textPrimary mb-1">Email</label>
              <input type="email" id="contact-email" value={contactPage.email || ''} onChange={(e) => handleContentChange('contactPage', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="contact-address" className="block text-sm font-medium text-textPrimary mb-1">Address</label>
              <input type="text" id="contact-address" value={contactPage.address || ''} onChange={(e) => handleContentChange('contactPage', 'address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            {renderSEOForm('contactPage', contactPage.seo)}
          </div>
        );
      case 'footer':
        const footerContent = currentContent as FooterContent;
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="footer-companyName" className="block text-sm font-medium text-textPrimary mb-1">Company Name</label>
              <input type="text" id="footer-companyName" value={footerContent.companyName} onChange={(e) => handleContentChange('footer', 'companyName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="footer-phone" className="block text-sm font-medium text-textPrimary mb-1">Phone (Read-only)</label>
              <input type="text" id="footer-phone" value={footerContent.phone} readOnly className="w-full px-3 py-2 border bg-gray-100 rounded-md" />
            </div>
            <div>
              <label htmlFor="footer-privacyPolicyLinkText" className="block text-sm font-medium text-textPrimary mb-1">Privacy Policy Link Text</label>
              <input type="text" id="footer-privacyPolicyLinkText" value={footerContent.privacyPolicyLinkText} onChange={(e) => handleContentChange('footer', 'privacyPolicyLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="footer-termsOfServiceLinkText" className="block text-sm font-medium text-textPrimary mb-1">Terms of Service Link Text</label>
              <input type="text" id="footer-termsOfServiceLinkText" value={footerContent.termsOfServiceLinkText} onChange={(e) => handleContentChange('footer', 'termsOfServiceLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="footer-copyrightText" className="block text-sm font-medium text-textPrimary mb-1">Copyright Text</label>
              <input type="text" id="footer-copyrightText" value={footerContent.copyrightText} onChange={(e) => handleContentChange('footer', 'copyrightText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        );
      case 'navbar':
        const navbarContent = currentContent as NavbarContent;
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="navbar-brandName" className="block text-sm font-medium text-textPrimary mb-1">Brand Name</label>
              <input type="text" id="navbar-brandName" value={navbarContent.brandName} onChange={(e) => handleContentChange('navbar', 'brandName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-homeLinkText" className="block text-sm font-medium text-textPrimary mb-1">Home Link Text</label>
              <input type="text" id="navbar-homeLinkText" value={navbarContent.homeLinkText} onChange={(e) => handleContentChange('navbar', 'homeLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-aboutLinkText" className="block text-sm font-medium text-textPrimary mb-1">About Us Link Text</label>
              <input type="text" id="navbar-aboutLinkText" value={navbarContent.aboutLinkText} onChange={(e) => handleContentChange('navbar', 'aboutLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-servicesLinkText" className="block text-sm font-medium text-textPrimary mb-1">Services Link Text</label>
              <input type="text" id="navbar-servicesLinkText" value={navbarContent.servicesLinkText} onChange={(e) => handleContentChange('navbar', 'servicesLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-blogLinkText" className="block text-sm font-medium text-textPrimary mb-1">Blog Link Text</label>
              <input type="text" id="navbar-blogLinkText" value={navbarContent.blogLinkText} onChange={(e) => handleContentChange('navbar', 'blogLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-contactLinkText" className="block text-sm font-medium text-textPrimary mb-1">Contact Us Link Text</label>
              <input type="text" id="navbar-contactLinkText" value={navbarContent.contactLinkText} onChange={(e) => handleContentChange('navbar', 'contactLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="navbar-adminLinkText" className="block text-sm font-medium text-textPrimary mb-1">Admin Link Text</label>
              <input type="text" id="navbar-adminLinkText" value={navbarContent.adminLinkText} onChange={(e) => handleContentChange('navbar', 'adminLinkText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        );
      default:
        return <p>Select a section to edit.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-10">
        Admin Dashboard
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <nav className="lg:w-1/4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Edit Sections</h2>
          <ul className="space-y-3">
            {[
              { key: 'homePage', label: 'Home Page' },
              { key: 'aboutPage', label: 'About Us Page' },
              { key: 'servicesPage', label: 'Services Page' },
              { key: 'blogPage', label: 'Blog Page Settings' },
              { key: 'blogPosts', label: 'Blog Posts' },
              { key: 'contactPage', label: 'Contact Page' },
              { key: 'navbar', label: 'Navbar' },
              { key: 'footer', label: 'Footer' },
              { key: 'theme', label: 'Theme Settings' },
            ].map(({ key, label }) => (
              <li key={key}>
                <Button
                  onClick={() => { setActiveTab(key as WebsiteSection); cancelEditing(); }}
                  variant={activeTab === key ? 'primary' : 'outline'}
                  className="w-full justify-start text-left"
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Editing Area */}
        <div className="lg:w-3/4 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-textPrimary mb-6 capitalize">
            {activeTab.replace(/([A-Z])/g, ' $1').replace('Page', ' Page')}
          </h2>
          {renderSectionContent(activeTab)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;