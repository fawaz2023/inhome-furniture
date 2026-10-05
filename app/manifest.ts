import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INHOME FURNITURE Kangeyam',
    short_name: 'INHOME',
    description: 'Custom Solid Wood Furniture Showcase & WhatsApp Enquiry in Kangeyam, Tamil Nadu',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#8B5A2B',
    icons: [
      {
        src: '/og-default.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  };
}
