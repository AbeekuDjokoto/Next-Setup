import React from 'react';

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => (
  <svg
    className={`h-5 w-5 ${filled ? 'fill-[#E2A027]' : 'fill-gray-300'}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .587l3.668 7.425 8.19 1.19-5.918 5.759 1.397 8.155L12 18.893l-7.337 3.868L6.06 15.96 0 10.2l8.19-1.19L12 .587z" />
  </svg>
);

export default Star;
