import React from 'react';

import { cn } from '@/lib/utils';
import { generateDots, generateMiddle } from '@/utils';

interface Props {
  page: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
  totalPages: number;
}

function TablePagination(props: Props) {
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
    <div className="w-full flex justify-between items-center p-3 bg-white text-sm leading-6 border border-grey-100 mt-2 rounded-md">
      <div className="mt-0.5">
        Showing page {page} of {totalPages}
      </div>

      <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-1">
        <button
          disabled={disablePrev}
          onClick={handlePrevPageClick}
          className={cn(
            'rounded-md p-1 md:p-2 disabled:opacity-50 bg-transparent hover:bg-blue-100',
            'disabled:cursor-not-allowed',
          )}>
          Prev
        </button>
        <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-4 justify-center items-center">
          {pages.map((p, i) => (
            <div key={`dot${i}`} className="flex">
              {p === 'dots' && <Dots key={`dot${i}`} />}
              {p !== 'dots' && (
                <button
                  key={`dot${i}`}
                  onClick={() => setPage(p)}
                  className={cn(
                    'box-border h-6 w-6 hover:via-blue-100',
                    'flex justify-center items-center rounded-md p-1 md:p-2 text-xs cursor-pointer',
                    { 'bg-blue-100 cursor-not-allowed border-blue-200 border-2': page === p },
                  )}>
                  {p}
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          disabled={disableNext}
          onClick={handleNextPageClick}
          className={cn(
            'bg-white rounded-md p-1 md:p-2 border-0 cursor-pointer hover:bg-blue-100',
            'disabled:opacity-50 bg-transparent disabled:cursor-not-allowed',
          )}>
          Next
        </button>
      </div>
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

export { TablePagination };
