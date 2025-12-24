import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  schema?: object | object[];
  noindex?: boolean;
}

const defaults = {
  siteName: 'Eglaf Technology',
  description: 'Eglaf Technology - Leading software development company in India offering custom web development, mobile app development, AI solutions, CRM development & SEO services. 10+ years experience. Get free consultation!',
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

// FAQ Schema generator
export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// JobPosting Schema generator
export const jobPostingSchema = (job: {
  title: string;
  description: string;
  department: string;
  employmentType: string;
  location: string;
  remote?: boolean;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: new Date().toISOString().split('T')[0],
  employmentType: job.employmentType.toUpperCase().replace('-', '_'),
  jobLocationType: job.remote ? 'TELECOMMUTE' : undefined,
  applicantLocationRequirements: job.remote ? {
    '@type': 'Country',
    name: 'India',
  } : undefined,
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'BH F623 Arved Transcube Plaza, Ranip',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382480',
      addressCountry: 'IN',
    },
  },
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Eglaf Technology',
    sameAs: defaults.siteUrl,
    logo: `${defaults.siteUrl}/favicon.png`,
  },
  industry: 'Software Development',
  occupationalCategory: job.department,
});

// CollectionPage Schema for listings (Blog, Portfolio)
export const collectionPageSchema = (collection: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: collection.name,
  description: collection.description,
  url: collection.url,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Eglaf Technology',
    url: defaults.siteUrl,
  },
});

// Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Eglaf Technology',
  image: `${defaults.siteUrl}/og-image.png`,
  '@id': defaults.siteUrl,
  url: defaults.siteUrl,
  telephone: '+91-9898598257',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'BH F623 Arved Transcube Plaza, Ranip',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382480',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0225,
    longitude: 72.5714,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.linkedin.com/company/eglaftechnology',
    'https://twitter.com/EglafTech',
  ],
};

// WebSite Schema for sitelinks search box
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Eglaf Technology',
  url: defaults.siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${defaults.siteUrl}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function SEO({
  title,
  description = defaults.description,
  keywords,
  ogImage = defaults.ogImage,
  canonical,
  schema,
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${defaults.siteName}` : `${defaults.siteName} - Custom Software & AI Solutions Company India`;

  const schemaScripts = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${defaults.siteUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaults.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@EglafTech" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Eglaf Technology" />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
      <meta name="geo.position" content="23.0225;72.5714" />
      <meta name="ICBM" content="23.0225, 72.5714" />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {schemaScripts.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
