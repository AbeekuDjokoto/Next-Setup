import { Button, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  onHandleSubmit: (...args: any) => void;
  verification: any;
  isLoading: boolean;
}
export function DenyApprove({ onHandleSubmit, verification, isLoading }: Props) {
  const [status, setStatus] = React.useState('pending');

  function onSubmit(status: string) {
    setStatus('active');
    onHandleSubmit({ id: verification.id, status });
  }

  return (
    <div className={cn('flex justify-end items-center')}>
      {status === 'pending' && (
        <div className="flex justify-between items-center gap-4">
          <Button variant="outline" onClick={() => onSubmit('VERIFIED')}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Approve
          </Button>
        </div>
      )}

      <div
        className={cn(
          'p-1 red flex items-center gap-2 rounded-3xl',
          {
            hidden: status === 'pending',
          },
          { 'bg-green-100': status === 'active' },
          { 'bg-red-100': status === 'deactive' },
        )}>
        <div
          className={cn(
            'px-3 py-1 rounded-3xl text-white text-sm',
            { 'bg-green-600': status === 'active' },
            { 'bg-red-500': status === 'deactive' },
          )}>
          {status === 'active' ? 'Approve' : 'declined'}
        </div>
        <p
          className={cn(
            'text-xs pr-5',
            { 'text-green-600': status === 'active' },
            { 'text-red-500': status === 'deactive' },
          )}>
          {status === 'active' ? 'Host has been approved' : 'Host has been declined'}
        </p>
      </div>
    </div>
  );
}
