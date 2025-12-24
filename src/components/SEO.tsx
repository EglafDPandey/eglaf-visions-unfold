import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  schema?: object | object[];
}

const defaults = {
  siteName: 'Eglaf Technology',
  description: 'Custom Software & AI Solutions - Transform your business with cutting-edge technology',
  ogImage: '/og-image.png',
  siteUrl: 'https://eglaftechnology.com',
};

// Pre-built schema generators
export const schemas = {
  service: (service: {
    name: string;
    description: string;
    url: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: 'Eglaf Technology',
      url: defaults.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
  }),

  article: (article: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || defaults.ogImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.authorName || 'Eglaf Technology',
      url: defaults.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Eglaf Technology',
      url: defaults.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${defaults.siteUrl}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }),

  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

export function SEO({
  title,
  description = defaults.description,
  keywords,
  ogImage = defaults.ogImage,
  canonical,
  schema,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${defaults.siteName}` : defaults.siteName;

  const schemaScripts = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {schemaScripts.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
