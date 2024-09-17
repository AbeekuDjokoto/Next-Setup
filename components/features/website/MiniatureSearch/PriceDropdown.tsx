'use client';
import { Input, Label } from '@/components/shared';
import { FilterType } from '@/types';

type Props = {
  filter: FilterType;
  type: string;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};
export function PriceDropdown({ filter, setFilter, type }: Props) {
  return (
    <div className="w-full grid gap-4 p-3">
      <Label htmlFor="min-price" className="font-medium">
        Price Range
      </Label>
      <div className="flex flex-col gap-2 items-center justify-between">
        <Input
          id="min-price"
          type="number"
          label="Min"
          placeholder="Min"
          value={filter.min_price}
          onChange={(e) =>
            setFilter((prev: any) => {
              return { ...prev, min_price: e.target.value };
            })
          }
        />
        <Input
          type="number"
          placeholder="Max"
          label="Max"
          value={filter.max_price}
          onChange={(e) =>
            setFilter((prev) => {
              return { ...prev, max_price: e.target.value };
            })
          }
        />

        <div className="flex gap-2 justify-betwee mt-4">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              id="gh"
              value="GHS"
              name="currency"
              checked={filter.currency === 'GHS'}
              onChange={(e) => {
                setFilter((prev) => {
                  return { ...prev, currency: e.target.value };
                });
              }}
            />
            <Label htmlFor="gh">GH₵</Label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              id="us"
              value="USD"
              checked={filter.currency === 'USD'}
              name="currency"
              onChange={(e) => {
                setFilter((prev) => {
                  return { ...prev, currency: e.target.value };
                });
              }}
            />
            <Label htmlFor="us">US$</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
