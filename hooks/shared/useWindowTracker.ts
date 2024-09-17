import React from 'react';

export function useWindowTracker() {
  const [windowWidth, setWindowWidth] = React.useState(674);

  React.useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });
    }
  }, [windowWidth]);

  return {
    windowWidth,
    md: windowWidth < 769,
    sm: windowWidth < 641,
  };
}
