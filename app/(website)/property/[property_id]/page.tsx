import { httpClient } from '@/config';
import { Metadata, ResolvingMetadata } from 'next';

import SingleProperty from './SingleProperty';
import { sortImagesInOrder } from '@/utils';

const getData = async (slug: string | string[]) => {
  const res = await httpClient(`/property/${slug}`);
  return res;
};

type Props = {
  params: { property_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.property_id;

  const property: any = await httpClient(`/property/${id}`);
  const propertyImages = sortImagesInOrder(property?.images ?? []) as string[];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: property.name,
    openGraph: {
      images: [propertyImages?.[0], ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const { property_id } = params;
  const property = await getData(property_id);
  console.log('property', property);
  return <SingleProperty property={property} />;
}
