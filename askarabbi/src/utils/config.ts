/**
 * Application configuration
 */

// Groq configuration (used by SDK)
/*
export const groqConfig = {
  models: {
    default: 'llama3-70b-8192',
    alternative: 'llama-3.3-70b-versatile',
    premium: 'compound-beta',
  },
  defaultTemperature: 0.123,
  defaultMaxTokens: 8192,
  // SDK reads GROQ_API_KEY from process.env by default
};
*/

// Application configuration
export const appConfig = {
  defaultLanguage: 'he',
  supportedLanguages: ['he', 'en'],
  defaultRtl: true,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Export combined configuration
const config = {
  // groq: groqConfig, // Removed Groq config
  app: appConfig,
};

export default config; 