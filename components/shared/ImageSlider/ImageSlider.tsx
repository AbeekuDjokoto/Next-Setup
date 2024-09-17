'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/shared';
import { Modal } from '@/components/shared/Modal';
import { PropertyCarousel } from '@/components/shared/PropertyCarousel';

function ImageSlider({ images: imgs = [] }: { images: string[] }) {
  const [active, setActive] = React.useState(() => imgs[0]);
  const { showModal, closeModal, contentType, openModal } = useModal();

  React.useEffect(() => {
    setActive(imgs[0]);
  }, [imgs]);

  return (
    <>
      <div className="h-max relative">
        <div className="grid xl:hidden md:grid-cols-[auto,max-content] gap-3">
          <div className="overflow-hidden w-full h-[400px] md:h-max grid place-items-start rounded-lg">
            <img
              onClick={() => openModal('open-modal')}
              src={active}
              alt="ownkey"
              className="w-full h-full object-contain cursor-pointer object-center"
            />
          </div>
          <div className="flex md:flex-col gap-2 md:h-[600px] overflow-y-auto noscroll-indicator">
            {imgs.map((image) => {
              return (
                <div
                  onClick={() => setActive(image)}
                  key={image}
                  className={cn(
                    'overflow-hidden cursor-pointer w-[55px] h-[55px] md:h-[75px] md:w-[75px] border grid place-items-center rounded-lg shrink-0	',
                    {
                      'bg-blue-100 border-[4px] border-blue-100': image === active,
                    },
                  )}>
                  <img src={image} alt="ownkey" className="w-full h-full object-fill" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden xl:grid md:grid-cols-[560px,auto] gap-3">
          <div
            className="overflow-hidden relative cursor-pointer w-full max-w-[560px] h-[200px] md:h-[450px] md:grid place-items-center rounded-lg hidden "
            onClick={() => openModal('open-modal')}>
            <img src={active} alt="ownkey" className="w-full h-full cursor-pointer" />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition duration-300"></div>
          </div>
          <div className="hidden md:grid md:grid-cols-[auto,auto] gap-2 md:h-[450px] overflow-y-auto noscroll-indicator">
            {imgs.slice(1, 5).map((image) => {
              return (
                <div
                  onClick={() => openModal('open-modal')}
                  key={image}
                  className={cn(
                    'overflow-hidden cursor-pointer w-full h-[55px] md:h-[220px] md:w-full border grid place-items-center rounded-lg shrink-0 relative',
                    {
                      'bg-blue-100 border-[4px] border-blue-100': image === active,
                    },
                  )}>
                  <img src={image} alt="ownkey" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="hidden xl:block absolute bottom-4 right-5 bg-white border border-black p-2 rounded"
          onClick={() => openModal('open-modal')}>
          See all photos
        </button>
      </div>
      <Modal show={showModal} hideModal={closeModal}>
        <PropertyCarousel images={imgs} />
      </Modal>
    </>
  );
}

export { ImageSlider };
