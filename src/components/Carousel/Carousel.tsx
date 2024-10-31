import React from 'react';

import { CAROUSEL_IMAGE } from '@/mocks';

import { Icon } from '../Icon';
import { SliderContent } from '../SliderContent';

const len = CAROUSEL_IMAGE.length - 1;

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="relative m-auto">
      <div>
        <SliderContent activeIndex={activeIndex} sliderImage={CAROUSEL_IMAGE} />
        <Arrows
          prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)}
          nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)}
        />
      </div>
    </div>
  );
};

export function Arrows({ prevSlide, nextSlide }: { prevSlide: () => void; nextSlide: () => void }) {
  function prev() {
    prevSlide();
  }

  function next() {
    nextSlide();
  }

  return (
    <div className="flex items-center justify-between">
      <Icon
        name="ButtonRight"
        onClick={prev}
        className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2"
      />
      <Icon
        name="ButtonRight"
        onClick={next}
        className="cursor-pointer absolute -rotate-180 top-1/2 left-4 transform -translate-y-1/2"
      />
    </div>
  );
}
