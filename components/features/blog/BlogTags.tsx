'use client';

import { Button } from '@/components/shared/Button';
import { useSlider } from '@/hooks/shared';
import { Chevron } from '@/public/assets/icons/index';
import { BlogCategories } from '@/types/blog';
import { getPropertyCardSize } from '@/utils';

import React from 'react';

type Categories = {
  categories: BlogCategories[];
  onFilter: (category: BlogCategories) => void;
};

export const BlogTag = ({ categories, onFilter }: Categories) => {
  const propertyBoard = React.useRef<HTMLDivElement>(null);
  const next = React.useRef<HTMLDivElement>(null);
  const prev = React.useRef<HTMLDivElement>(null);

  const { moveLeft, moveRight } = useSlider(
    categories,
    getPropertyCardSize('large'),
    propertyBoard,
    prev,
    next,
  );

  return (
    <>
      <div className="relative w-full">
        {/* <div
          role="button"
          onClick={moveLeft}
          ref={prev}
          className="absolute max-sm:hidden z-10 left-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer
            max-sm:hidden">
          <Chevron className="-rotate-90" />
        </div> */}
        <div
          className="flex gap-5 property-slider overflow-auto transition-all ease-in duration-500 noscroll-indicator hide-scrollbar',
            'max-sm:flex-col'">
          {categories.map((category, index) => (
            <Button
              key={category.title}
              className={`text-[#18181B] text-[14px] font-medium px-3 py-3 overflow-hidden relative shrink-0 rounded-none ${
                index === 0 ? 'bg-[#C92251] text-white' : 'bg-[#F2F2F2]'
              }`}
              onClick={() => onFilter(category)}>
              {category.title}
            </Button>
          ))}
        </div>
        <div
          role="button"
          onClick={moveRight}
          ref={next}
          className="absolute max-sm:hidden z-10 right-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer">
          <Chevron className="rotate-90" />
        </div>
      </div>
    </>
  );
};
