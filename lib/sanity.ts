import { createClient, type ClientConfig } from 'next-sanity';

import imageUrlBuilder from '@sanity/image-url';

const config: ClientConfig = {
  apiVersion: '2023-05-03',
  dataset: 'production',
  projectId: 'zaq443mf',
  useCdn: false,
  token:
    'sk9kLVj8E2PIcukrOtNPZqdOOEcMNSXMuR5FkQy1XXTTpiznoIlQ3deWmLgq4qMVvZUWuDijTE4xJ5ycQH4Jul7BGm68r1i4nTAYuLK1b6F8UtJZLHJfDk7pXcBVq7lLeSJpOfqBD2PiWqdMlXmTLMIdCzXwFY00cvlOhDLPRotoUPgV1P3E',
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
