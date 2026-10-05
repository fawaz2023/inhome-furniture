import { Product, Category } from '@/types/database';

export function getFurnitureStoreSchema(
  telephone?: string,
  rating?: { value: number; count: number }
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';
  const effectivePhone = telephone || process.env.NEXT_PUBLIC_SHOP_PHONE || undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'INHOME FURNITURE',
    image: `${baseUrl}/og-default.jpg`,
    '@id': baseUrl,
    url: baseUrl,
    ...(effectivePhone ? { telephone: effectivePhone } : {}),
    priceRange: '₹₹ - ₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'TCL Tower, 3/43A, Chennimalai Rd',
      addressLocality: 'Kangeyam',
      addressRegion: 'Tamil Nadu',
      postalCode: '638701',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.0062,
      longitude: 77.5623,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    ...(rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(rating.value),
            reviewCount: String(rating.count),
          },
        }
      : {}),
  };
}

export function getProductSchema(product: Product, categorySlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';
  const productUrl = `${baseUrl}/${categorySlug}/${product.slug}`;
  const isMadeToOrder = product.product_type === 'made_to_order';

  const productImage = product.og_image_url
    ? [product.og_image_url.startsWith('http') ? product.og_image_url : `${baseUrl}${product.og_image_url.startsWith('/') ? '' : '/'}${product.og_image_url}`]
    : product.images && product.images.length > 0
      ? product.images
      : [`${baseUrl}/og-default.jpg`];

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: productImage,
    description:
      product.description ||
      `Custom-crafted ${product.name} tailored to your dimensions by INHOME FURNITURE Kangeyam.`,
    brand: {
      '@type': 'Brand',
      name: 'INHOME FURNITURE',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      availability: isMadeToOrder
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}
