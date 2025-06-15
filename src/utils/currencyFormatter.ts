// utils/currencyFormatter.ts

// Memoization cache for formatters
const formatterCache = new Map<string, Intl.NumberFormat>();

/**
 * Formats currency values
 * @param value - Numeric value
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const cacheKey = `${locale}-${currency}`;
  
  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    );
  }
  
  return formatterCache.get(cacheKey)!.format(value);
};

/**
 * Compact currency formatter (e.g., $1.5K)
 * @param value - Numeric value
 * @param currency - Currency code (default: 'USD')
 */
export const formatCompactCurrency = (
  value: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const cacheKey = `compact-${locale}-${currency}`;
  
  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        notation: 'compact',
        maximumFractionDigits: 1
      })
    );
  }
  
  return formatterCache.get(cacheKey)!.format(value);
};

/**
 * Gets currency symbol
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale (default: 'en-US')
 */
export const getCurrencySymbol = (
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const formatted = formatCurrency(0, currency, locale);
  return formatted.replace(/\d/g, '').replace(/[.,]/g, '').trim();
};