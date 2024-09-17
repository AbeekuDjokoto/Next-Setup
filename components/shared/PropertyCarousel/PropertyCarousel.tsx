'use client';
import * as React from 'react';

import { Card, CardContent } from '@/components/shared';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../Carousel/Carousel';

type Props = {
  images: string[];
};

export function PropertyCarousel({ images }: Props) {
  return (
    <Carousel className="mx-12">
      <CarouselContent className="max-w-6xl max-sm:h-[400px] h-[650px]">
        {images.map((url, index) => (
          <CarouselItem key={index} className="h-full w-full">
            <Card className="p-0 h-full w-full overflow-hidden bg-transparent border-none">
              <CardContent className="h-full w-full p-0">
                <img src={url} alt={url} className="w-full h-full object-contain" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
