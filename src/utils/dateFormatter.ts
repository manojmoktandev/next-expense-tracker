// utils/dateFormatter.ts
// Memoization cache to store formatters (improves performance for repeated calls)
const formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Efficient date formatter with memoization and enhanced options
 * 
 * @param dateInput - Date object, ISO string, timestamp, or null/undefined
 * @param options - Custom formatting options (optional)
 * @param locale - BCP 47 language tag (default: 'en-US')
 * @returns Formatted date string or fallback for invalid dates
 */
export const formatDate = (
    dateInput: Date | string | number | null | undefined,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    },
    locale: string = 'en-US'
): string => {
    // Handle null/undefined inputs gracefully
    if (dateInput == null) return 'Invalid Date';

    // Parse date efficiently
    const date = dateInput instanceof Date
        ? dateInput
        : new Date(dateInput);

    // Validate date
    if (isNaN(date.getTime())) return 'Invalid Date';

    // Create cache key for memoization
    const cacheKey = `${locale}-${JSON.stringify(options)}`;

    // Use cached formatter or create new one
    let formatter = formatterCache.get(cacheKey);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(locale, options);
        formatterCache.set(cacheKey, formatter);
    }

    return formatter.format(date);
};

/**
 * Predefined format options for common use cases
 */
export const DateFormats = {
    SHORT: { year: 'numeric', month: 'short', day: 'numeric' },
    LONG: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    TIME: { hour: '2-digit', minute: '2-digit', hour12: true },
    DATE_TIME: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    },
    MONTH_YEAR: { year: 'numeric', month: 'long' },
    ISO: { year: 'numeric', month: '2-digit', day: '2-digit' }
} as const;


