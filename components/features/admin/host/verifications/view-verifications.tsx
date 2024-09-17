import React from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

export function ViewVerifications({ docs = [] }: { docs: any[] }) {
  const [active, setActive] = React.useState();

  return (
    <>
      <div className="grid md:grid-cols-[auto,max-content] gap-3">
        <div className="w-full h-[450px] bg-gray-100 grid place-items-center rounded-lg">
          <Image src={''} alt={'doc'} />
        </div>
        <div className="flex md:flex-col gap-2 max-h-[450px] overflow-y-auto noscroll-indicator">
          {docs.map((image) => {
            return (
              <div
                onClick={() => setActive(image)}
                key={image}
                className={cn(
                  'cursor-pointer h-[75px] w-[75px] border grid place-items-center rounded-lg shrink-0	',
                  {
                    'bg-gray-100': image === active,
                  },
                )}>
                <Image src={''} alt="doc" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
