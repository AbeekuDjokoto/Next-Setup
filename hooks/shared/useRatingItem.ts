import React from 'react';

export const useRateItem = () => {
  const [ratingValue, setRatingValue] = React.useState(0);

  const [stars, setStars] = React.useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
  ]);

  const chooseRating = (id: number) => {
    setRatingValue(id);
    setStars((prev) => {
      return prev.map((el) => {
        return el.id <= id ? { ...el, active: true } : { ...el, active: false };
      });
    });
  };

  return {
    stars,
    ratingValue,
    chooseRating,
  };
};
