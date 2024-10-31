import { noThumbnail } from '@/assets';
import { Icon } from '@/components';
import { cn } from '@/libs';

export function AgentsCard({ src }: { src: string }) {
  return (
    <div className="w-full border rounded-2xl border-[var(--border-color)] flex flex-col gap-[100px]">
      <div className="h-[100px] relative">
        <img src={noThumbnail} alt="" className="w-full h-full object-cover" />
        <div
          className={cn(
            'absolute w-[150px] h-[150px] rounded-full border border-black -bottom-[150%] left-1/2 py-3 px-4 flex flex-col justify-between transform -translate-x-1/2 -translate-y-1/2',
            !src && 'bg-white text-[64px] font-medium flex text-center justify-center',
          )}>
          EA
          {src && <img src={src} alt="" className="w-full h-full object-cover rounded-full" />}
        </div>
      </div>
      <div className="py-3 px-4 flex flex-col gap-2 text-[var(--black-100)] text-sm text-center">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Edward Apersil</p>
          <p className="font-medium text-[var(--red-100)]">Pro Agent</p>
          <div className="flex gap-[10px] items-center mx-auto">
            <Icon name="Star" />
            <p className="font-medium">4.0</p>
            <div className="w-2 h-2 bg-[var(--black-100)] rounded-full" />
            <p className="font-medium">120 Reviews</p>
          </div>
        </div>

        <button className="border border-[var(--border-color)] h-10 text-[var(--black-100)] rounded-full w-full flex gap-[10px] items-center justify-center">
          <Icon name="Telephone" />
          Call
        </button>
      </div>
    </div>
  );
}
