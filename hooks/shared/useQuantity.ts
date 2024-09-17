import React from 'react';

export const useAmenityQuantity = () => {
  const [quantity, setQuantity] = React.useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 0) return;
    setQuantity((prev) => prev - 1);
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
  };
};
