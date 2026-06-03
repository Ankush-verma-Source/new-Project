// Config file to resolve the backend API Base URL
// In development, this defaults to an empty string so requests are proxied via Vite.
// In production, it resolves to the VITE_API_BASE_URL environment variable.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
