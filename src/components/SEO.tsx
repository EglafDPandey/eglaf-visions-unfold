import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const defaults = {
  siteName: 'Eglaf Technology',
  description: 'Custom Software & AI Solutions - Transform your business with cutting-edge technology',
  ogImage: '/og-image.png',
};

export function SEO({
  title,
  description = defaults.description,
  keywords,
  ogImage = defaults.ogImage,
  canonical,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${defaults.siteName}` : defaults.siteName;

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
    </Helmet>
  );
}
