'use client';
import { cn } from '@/lib/utils';
import { Button, Icons } from '@/components/shared';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

type DeletePromptProps = {
  closeModal: () => void;
  onSubmit: (...args: any) => void;
  isLoading: boolean;
};
export function RefreshPropertyPrompt({ closeModal, onSubmit, isLoading }: DeletePromptProps) {
  return (
    <div className={cn('w-full p-4 min-w-[350px] rounded-lg grid gap-6 bg-white')}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Are you sure?</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <p className="text-gray-500">This action will refresh this resource</p>

      <div className="flex items-center justify-between gap-3">
        <Button onClick={onSubmit} variant="default" className="grow">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Refresh
        </Button>
        <Button onClick={closeModal} variant="outline" className="grow">
          Cancel
        </Button>
      </div>
    </div>
  );
}
