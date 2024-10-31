import { Link } from 'react-router-dom';

import { fatherHelpingChild } from '@/assets';
import { Arrows, Icon } from '@/components';
import { cn } from '@/libs';
import { ROUTES } from '@/utils';

export function PropertyCard({ ispremium }: { ispremium: boolean }) {
  return (
    <div
      className={cn(
        'w-full border rounded-2xl p-2',
        ispremium ? 'border-[#E19F36]' : 'border-[var(--border-color)]',
      )}>
      <div className="h-[238px] relative rounded-xl">
        <img src={fatherHelpingChild} alt="" className="w-full h-full object-cover rounded-xl" />
        <div className="absolute top-0 left-0 w-full h-full py-3 px-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 text-[11px] font-medium">
              <div className="py-2 px-2 bg-white rounded-sm">Sale</div>
              <div className="py-2 px-2 bg-white rounded-sm">1 Month Ago</div>
            </div>
            <Icon name="Bookmark" className="w-6 h-6" />
          </div>

          <div className="flex justify-between">
            {ispremium && (
              <div className="py-2 px-2 bg-[#E19F36] rounded-sm text-[11px] text-white items-center">
                Premium
              </div>
            )}
            <Arrows
              prevSlide={function (): void {
                throw new Error('Function not implemented.');
              }}
              nextSlide={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <div className="py-2 px-2 bg-white rounded-sm text-[11px]">Negotiable</div>
          </div>
        </div>
      </div>
      <div className="py-3 px-4 flex flex-col gap-2 text-[var(--black-100)]">
        <div className="flex justify-between text-sm">
          <p>Apartment</p>
          <Link to={ROUTES.ABOUT} className="text-[#233876]">
            Contact Agent
          </Link>
        </div>
        <p className="font-semibold">5730 E Gelding Greater Accra, Ghana</p>
        <div className="flex justify-between">
          <div className="pr-3 border-r-[var(--border-color)] border-r">Pool</div>
          <div className="px-3 border-r-[var(--border-color)] border-r">Glass window</div>
          <div className="px-3">Tiled floors</div>
        </div>
        <div className="pb-2 border-b border-b-[var(--border-color)] flex gap-3 items-center">
          <div className="flex gap-[10px] items-center">
            <Icon name="Bed" />
            <p className="font-medium">2</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <Icon name="Shower" />
            <p className="font-medium">2</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <Icon name="Parking" />
            <p className="font-medium">2</p>
          </div>
        </div>
        <p className="font-medium text-xl">GH₵ 25000</p>
      </div>
    </div>
  );
}
