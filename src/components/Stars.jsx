import React, { useEffect } from 'react';
import './Stars.css';

const Stars = ({ count = 100 }) => {
    useEffect(() => {
        const container = document.querySelector('.stars');
        console.log('Mounting stars...');
      
        if (!container) return;
      
        container.innerHTML = ''; // clear existing stars
      
        for (let i = 0; i < count; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.top = `${Math.random() * 100}%`;
          star.style.left = `${Math.random() * 100}%`;
          star.style.animationDuration = `${1 + Math.random() * 3}s`;
          container.appendChild(star);
        }
      }, [count]);

  return <div className="stars"></div>;
};

export default Stars;
