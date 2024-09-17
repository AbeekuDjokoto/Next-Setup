import { formatDate, setImage } from '@/utils';
import { Avatar, Rating } from 'flowbite-react';
import React from 'react';

type Props = {
  created_at: string;
  message: string;
  rating: number;
  user: {
    firstname: string;
    lastname: string;
    profileImage: string;
  };
};

export function SingleReview({ user, created_at, rating, message }: Props) {
  const [hasMore, setHasMore] = React.useState(message?.length > 200);
  const ratings = new Array(rating).fill({ active: true });

  const modifiedMessage = hasMore ? message?.substring(0, 200) : message;

  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <Avatar img={setImage('John', 'Doe', user.profileImage)} size="md" rounded />
        <div>
          <p>{formatDate(created_at)}</p>
          <div className="flex gap-1">
            {ratings.map(() => (
              <Rating>
                <Rating.Star />
              </Rating>
            ))}
          </div>
        </div>
      </div>
      <p>
        {modifiedMessage}{' '}
        {hasMore && (
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setHasMore(false)}>
            . . . Show More
          </span>
        )}
      </p>
    </div>
  );
}
