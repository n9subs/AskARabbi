/**
 * Utility functions to determine if AdSense ads should be displayed on a page
 * According to Google AdSense policies, ads should not be shown on:
 * - Pages with no content or low-value content
 * - Pages used primarily for navigation, alerts, or behavior
 * - Pages under construction
 * - Authentication/login pages
 * - Error pages
 */

export interface PageContext {
  pathname: string;
  hasContent?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
}

/**
 * List of pathnames that should never show AdSense ads
 */
const EXCLUDED_PATHS = [
  // Authentication pages
  '/auth/sign-in',
  '/auth/sign-up', 
  '/auth/verify-email',
  
  // Error pages
  '/error',
  '/404',
  '/not-found',
  
  // Legal/policy pages (minimal content, not primary content)
  '/terms',
  '/privacy',
];

/**
 * Path patterns that should be excluded (using regex)
 */
const EXCLUDED_PATH_PATTERNS = [
  /^\/auth\/.*$/,  // All auth routes
  /^\/api\/.*$/,   // All API routes
];

/**
 * Determines if AdSense ads should be displayed on the current page
 * @param context - Page context information
 * @returns true if ads should be shown, false otherwise
 */
export function shouldShowAds(context: PageContext): boolean {
  const { pathname, hasContent = true, isLoading = false, isEmpty = false } = context;
  
  // Never show ads during loading states
  if (isLoading) {
    return false;
  }
  
  // Never show ads on empty pages
  if (isEmpty) {
    return false;
  }
  
  // Never show ads on pages without content
  if (!hasContent) {
    return false;
  }
  
  // Check exact path matches
  if (EXCLUDED_PATHS.includes(pathname)) {
    return false;
  }
  
  // Check pattern matches
  if (EXCLUDED_PATH_PATTERNS.some(pattern => pattern.test(pathname))) {
    return false;
  }
  
  return true;
}

/**
 * Determines if a specific pathname should exclude ads
 * @param pathname - The current pathname
 * @returns true if ads should be excluded
 */
export function isExcludedPath(pathname: string): boolean {
  return !shouldShowAds({ pathname });
}

/**
 * Gets a list of all excluded paths for reference
 */
export function getExcludedPaths(): string[] {
  return [...EXCLUDED_PATHS];
}

/**
 * Gets a list of excluded path patterns for reference
 */
export function getExcludedPathPatterns(): RegExp[] {
  return [...EXCLUDED_PATH_PATTERNS];
}