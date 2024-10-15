import { Metadata, ResolvingMetadata } from 'next';
import { httpClient } from '@/config';

import HostInformation from './SingleHost';

const getData = async (slug: string | string[]) => {
  const res = await httpClient(`/agents/${slug}`);
  return res;
};

export async function generateMetadata(
  { params }: { params: { host_id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.host_id;
  const host: any = await httpClient(`/agents/${id}`);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Ownkey | Agent - ' + host?.user?.firstname + ' ' + host?.user?.lastname,
    description: host?.type?.description,
    openGraph: {
      images: [host?.user?.profileImage, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { host_id: string } }) {
  const { host_id } = params;
  const hostResponse: any = await getData(host_id);

  return <HostInformation host={hostResponse} />;
}
