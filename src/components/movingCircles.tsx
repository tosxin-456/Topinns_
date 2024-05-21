// src/components/MovingCircles.tsx
import React, { useEffect, useState } from 'react';
import '../css/MovingCicles.css';

interface MovingCirclesProps {
  color: string;
}

const MovingCircles: React.FC<MovingCirclesProps> = ({ color }) => {
  const [circles, setCircles] = useState<Array<{ id: number; top: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const numCircles = 5;
    const newCircles = Array.from({ length: numCircles }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setCircles(newCircles);
  }, []);

  return (
    <div className="circles-container">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="circle"
          style={{
            top: `${circle.top}%`,
            left: `${circle.left}%`,
            animationDelay: `${circle.delay}s`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default MovingCircles;
