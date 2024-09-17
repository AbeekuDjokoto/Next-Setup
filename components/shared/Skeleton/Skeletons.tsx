import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200/75', className)} {...props} />;
}

function PropertyListSkeleton() {
  return (
    <div className="flex max-sm:flex-col gap-2 overflow-hidden">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard className="max-sm:hidden" />
      <SkeletonCard className="max-sm:hidden" />
      <SkeletonCard className="max-sm:hidden" />
    </div>
  );
}
function HostListSkeleton() {
  return (
    <div className="flex max-sm:flex-col gap-2 overflow-hidden">
      <HostSkeletonCard />
      <HostSkeletonCard />
      <HostSkeletonCard className="max-sm:hidden" />
      <HostSkeletonCard className="max-sm:hidden" />
      <HostSkeletonCard className="max-sm:hidden" />
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-3 bg-gray-50 rounded-lg p-2 w-full sm:w-[270px]',
        className,
      )}>
      <Skeleton className="h-[175px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[100px]" />
      </div>
      <Skeleton className="h-5 w-[200px]" />
      <Skeleton className="h-5 w-[100px]" />
    </div>
  );
}

function HostSkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-3 bg-gray-50 rounded-lg p-2 w-full sm:w-[320px]',
        className,
      )}>
      <div className="grid place-items-center">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-[150px]" />
      </div>
      <div className="grid place-items-center">
        <Skeleton className="h-5 w-[200px]" />
      </div>
      <div className="flex justify-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-3 max-w-[400px]">
      <div className="flex gap-3">
        <div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="w-80 flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-10" />
    </div>
  );
}

function ReviewsListSkeleton() {
  return (
    <div className='flex flex-col gap-5'>
      <ReviewsSkeleton />
      <ReviewsSkeleton />
      <ReviewsSkeleton />
    </div>
  );
}

export {
  Skeleton,
  PropertyListSkeleton,
  HostListSkeleton,
  HostSkeletonCard,
  ReviewsSkeleton,
  ReviewsListSkeleton,
};
