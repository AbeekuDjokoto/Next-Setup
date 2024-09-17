'use client';
import React, { Suspense } from 'react';
import { Carousel } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';
import { MiniatureSearch } from '../MiniatureSearch';

export function Hero() {
  return (
    <div className="relative md:mb-[80px]">
      <div className="relative bg-gray-200 h-[175px] md:h-[400px] rounded-md md:rounded-2xl grid place-items-center">
        <div className="w-full h-full">
          <Carousel>
            <img
              src="/assets/images/carousels-01desk.png"
              alt="..."
              className="h-full  object-cover"
            />
            <img src="/assets/images/carousel-2.jpg" alt="..." className="h-full  object-cover" />
            <img src="/assets/images/carousel-3.jpg" alt="..." className="h-full  object-cover" />
          </Carousel>
        </div>
      </div>
      <div className="max-sm:mt-8 md:absolute w-full md:bottom-[-28%]">
        <Suspense
          fallback={
            <div className="w-full flex justify-center">
              <Skeleton className="h-[175px] max-w-[800px]" />
            </div>
          }>
          <MiniatureSearch />
        </Suspense>
      </div>
    </div>
  );
}
