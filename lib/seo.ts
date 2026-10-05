import { Product, Category } from '@/types/database';

export function getFurnitureStoreSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';

  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'INHOME FURNITURE',
    image: `${baseUrl}/og-default.jpg`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: '+919999999999',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '23',
    },
  };
}

export function getProductSchema(product: Product, categorySlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';
  const productUrl = `${baseUrl}/${categorySlug}/${product.slug}`;
  const isMadeToOrder = product.product_type === 'made_to_order';

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images && product.images.length > 0 ? product.images : [`${baseUrl}/og-default.jpg`],
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';

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
