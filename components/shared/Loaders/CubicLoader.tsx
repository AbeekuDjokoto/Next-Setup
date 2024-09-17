import React from 'react';

export const CubicLoader = () => {
  return (
    <div className="flex items-center justify-center h-16 w-16">
      <Spinner />
    </div>
  );
};

import './CubicLoader.scss';

const Spinner = () => {
  return (
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  );
};
