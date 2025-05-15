import React from 'react';
import './CardWrapper.css'; // Import the styling

const CardWrapper = ({ children }) => {
  return (
    <div className="card-container">
      <div className="card">
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
