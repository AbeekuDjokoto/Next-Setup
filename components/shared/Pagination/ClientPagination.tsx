import React from 'react';

import { generateDots, generateMiddle } from '@/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = Readonly<{
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}>;

export function ClientPagination(props: Props) {
  const { page, setPage, totalPages } = props;

  const pages = React.useMemo(() => {
    const first = 1;
    const last = totalPages !== 1 ? [totalPages] : [];
    const middle = generateMiddle({ page, totalPages });
    const { afterDots, beforeDots } = generateDots({ middle, totalPages });

    return [first, ...beforeDots, ...middle, ...afterDots, ...last];
  }, [page, totalPages]);

  const handleNextPageClick = () => setPage(page + 1);
  const handlePrevPageClick = () => setPage(page - 1);
  const disableNext = page === totalPages;
  const disablePrev = page === 1;

  return (
    <div className="flex gap-2 w-max justify-between items-center p-2 text-sm">
      <button
        disabled={disablePrev}
        onClick={handlePrevPageClick}
        data-testid="prev"
        className={cn(
          'rounded-full border p-2.5 disabled:opacity-50 bg-[#FAFAFA] hover:bg-blue-50',
          'disabled:cursor-not-allowed',
        )}>
        <ChevronLeft />
      </button>
      <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-4 justify-center items-center rounded-full px-1 py-1 border bg-[#FAFAFA]">
        {pages.map((p, i) => (
          <div key={`dot${i}`} className="flex">
            {p === 'dots' && <Dots key={`dot${i}`} />}
            {p !== 'dots' && (
              <button
                key={`dot${i}`}
                data-testid={`dot${i}`}
                onClick={() => setPage(p)}
                className={cn(
                  'box-border h-5 w-5 hover:bg-blue-100 text-gray-500',
                  'flex justify-center items-center rounded-full text-sm cursor-pointer p-4',
                  {
                    'text-white cursor-not-allowed bg-blue-800 rounded-full hover:bg-blue-800':
                      page === p,
                  },
                )}>
                {p}
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        data-testid="next"
        disabled={disableNext}
        onClick={handleNextPageClick}
        className={cn(
          'bg-[#FAFAFA] border rounded-full p-2.5 cursor-pointer hover:bg-blue-50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}>
        <ChevronRight />
      </button>
    </div>
  );
}

function Dots() {
  return (
    <div style={{ display: 'grid', placeContent: 'center' }}>
      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM16 0C14.9 0 14 0.9 14 2C14 3.1 14.9 4 16 4C17.1 4 18 3.1 18 2C18 0.9 17.1 0 16 0ZM9 0C7.9 0 7 0.9 7 2C7 3.1 7.9 4 9 4C10.1 4 11 3.1 11 2C11 0.9 10.1 0 9 0Z"
          fill="#677684"
        />
      </svg>
    </div>
  );
}
