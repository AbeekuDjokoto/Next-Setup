import { httpClient } from '@/config';

const URL = 'https://ownkey.com';

export default async function sitemap() {
  const prop = (await httpClient.get('/properties')) as unknown as {
    page: number;
    total: number;
    result: any[];
  };

  const properties = prop.result.map((data: any) => ({
    url: `${URL}/${data.slug}`,
    lastModified: data.updated_at,
  }));

  const routes = [
    '',
    '/about-ownkey',
    '/terms-and-conditions',
    '/privacy-policy',
    '/faqs/client',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...properties];
}
