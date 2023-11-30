import React, { useEffect, useRef, useState } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, cancelFrame, benchmark } from "../shared";

export const AppSVGReactComponents = () => {
  const frameRef = useRef<number>(0);
  const [points, setPoints] = useState<IPoint[]>(getRandomPoints);

  useEffect(() => {
    const animate = () => {
      setPoints(oldPoints => shiftPoints(oldPoints.slice()));
      frameRef.current = nextFrame(animate);
    };
    animate();
    return () => cancelFrame(frameRef.current);
  }, []);

  benchmark();

  return (
    <div className="app">
      <svg width={WIDTH} height={HEIGHT}>
        {
          points.map((point, i) => (
            <circle
              key={i}
              r="2"
              fill="#333"
              strokeWidth="0.5"
              stroke="#ffa1a1"
              cx={point.x}
              cy={point.y}
            />
          ))
        }
      </svg>
    </div>
  );
};
