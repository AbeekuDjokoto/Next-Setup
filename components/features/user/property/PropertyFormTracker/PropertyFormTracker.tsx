'use client';

import { cn } from '@/lib/utils';
import CheckMarkIcon from '@/public/assets/icons/check-solid.svg';

type Tracker = {
  id: number;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
};
interface Props {
  trackerData: Tracker[];
}
function FormTracker({ trackerData }: Props) {
  return (
    <div className="pt-5 pb-10 pl-10 pr-10 min-w-[950px]">
      <div className="w-full flex justify-between">
        {trackerData.map((data) => {
          return (
            <div
              key={data.id}
              className={cn('w-full last-of-type:w-2 bg-gray-300 rounded-[3px]', {
                'bg-blue-900': data.isCompleted,
              })}>
              <div className="w-1.5 h-1.5 rounded-full bg-white relative">
                <div className="absolute flex justify-center bottom-[-40px] left-[-47.5px] w-[110px]">
                  <p className={cn('text-sm', { 'font-semibold': data.isActive })}>{data.label}</p>
                </div>
                <div
                  className={cn(
                    {
                      'flex justify-center items-center rounded-full w-[35px] h-[35px] top-1/2 left-[-13.5px] transform translate-y-[-50%] absolute bg-[#79a9e054]':
                        data.isActive,
                    },
                    {
                      'flex justify-center items-center rounded-full w-6 h-6 bg-blue-900 absolute top-1/2 left-[-2px] transform translate-y-[-50%]':
                        data.isCompleted,
                    },
                  )}>
                  <CheckMarkIcon
                    className={cn('hidden text-white w-3', { block: data.isCompleted })}
                  />
                  <div
                    className={cn(
                      'bg-white hidden justify-center items-center w-5 h-5 rounded-full',
                      {
                        flex: data.isActive,
                      },
                    )}>
                    <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { FormTracker };
