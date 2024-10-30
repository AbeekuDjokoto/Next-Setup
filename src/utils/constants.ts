const removeTrailingSlash = (url?: string) => (url ? url.replace(/\/$/, '') : '');
export const ENV_VARS = {
  API_BASE_URL: removeTrailingSlash(import.meta.env.VITE_OWNKEY_CLIENT_PUBLIC_BASE_URL),
};

export const isTesting = process.env.NODE_ENV === 'test';
