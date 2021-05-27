/**
 * Removes sensitive information from a URI; uses simple numeric masking (per DTE's business logic).
 * @param url The full URI.
 */
const maskUrl = (url: string): string => url.replace(/[0-9]/g, 'X');

export default maskUrl;
