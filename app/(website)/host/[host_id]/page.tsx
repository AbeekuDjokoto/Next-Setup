import { Metadata, ResolvingMetadata } from 'next';
import HostInformation from './SingleHost';
import { httpClient } from '@/config';

const getData = async (slug: string | string[]) => {
  const res = await httpClient(`/agents?host_user_name=${slug}`);
  return res;
};

export async function generateMetadata(
  { params }: { params: { host_id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.host_id;
  // const hostIdParams = Array.isArray(id) ? id[0] : id;
  // const splittedHostId = hostIdParams.split('-');
  // const hostId =
  //   splittedHostId.length === 2
  //     ? hostIdParams
  //     : `${splittedHostId.at(-2)}-${splittedHostId.at(-1)}`;

  const hostResponse: any = await httpClient(`/agents?host_user_name=${id}`);
  const host = hostResponse?.results?.[0];
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
  // const hostIdParams = Array.isArray(host_id) ? host_id[0] : host_id;
  // const splittedHostId = hostIdParams.split('-');
  // const hostId =
  //   splittedHostId.length === 2
  //     ? hostIdParams
  //     : `${splittedHostId.at(-2)}-${splittedHostId.at(-1)}`;
  const hostResponse: any = await getData(host_id);
  const host = hostResponse?.results?.[0];
  return <HostInformation host={host} />;
}
