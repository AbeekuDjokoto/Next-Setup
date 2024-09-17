'use client';
import { Map } from '@/components/shared';
import { cn } from '@/lib/utils';

type Props = Readonly<{
  location: any;
  isHidden?: boolean;
}>;

export function PropertyLocationCard({ location, isHidden }: Props) {
  return (
    <>
      <p className="text-blue-950 font-bold">Property Location</p>
      <div
        className={cn('grid gap-6 p-2 pb-4 rounded-md border w-full max-w-md', {
          hidden: isHidden,
        })}>
        <div className="w-full h-[250px] bg-green-50 rounded-lg">
          <Map coordinates={{ lng: location?.longitude, lat: location?.latitude }} />
        </div>
      </div>
    </>
  );
}
