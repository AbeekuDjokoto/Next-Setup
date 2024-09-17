import React from 'react';
import Star from './Star';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1 mt-3">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
        />
      ))}
    </div>
  );
};

export default Rating;
