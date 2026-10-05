/**
 * WhatsApp Product Link Generation Rules
 * Single Source of Truth for INHOME FURNITURE
 * 
 * ⚠️ P0 IMMUTABLE GROUND TRUTH: Any implementation or modification that deviates
 * from these exact sanitization rules or message templates is considered a P0 parity bug.
 */

export function formatWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function buildProductEnquiryUrl(
  productName: string,
  categorySlug: string,
  productSlug: string,
  variant: 'standard' | 'customise' = 'standard',
  shopNumber: string = '919999999999'
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in';
  const productUrl = `${baseUrl}/${categorySlug}/${productSlug}`;

  const message = variant === 'customise'
    ? `Hi INHOME Furniture, I'd like to customise this ${productName} (size/wood): ${productUrl}. Please share details.`
    : `Hi INHOME Furniture, I like this ${productName}: ${productUrl}. Please share details.`;

  return `https://wa.me/${formatWhatsAppNumber(shopNumber)}?text=${encodeURIComponent(message)}`;
}

export function buildCustomDesignEnquiryUrl(
  shopNumber: string = '919999999999'
): string {
  const message = `Hi INHOME Furniture, I have my own furniture design / reference photo. I'd like to share dimensions and get a quote.`;
  return `https://wa.me/${formatWhatsAppNumber(shopNumber)}?text=${encodeURIComponent(message)}`;
}
