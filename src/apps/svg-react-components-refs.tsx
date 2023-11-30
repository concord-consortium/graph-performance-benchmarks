import React, { useEffect, useRef } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, cancelFrame, benchmark } from "../shared";

export const AppSVGReactComponentsRefs = () => {
  const frameRef = useRef<number>(0);
  const circleRefs = useRef<SVGCircleElement[]>([]);
  const points = useRef<IPoint[]>(getRandomPoints());

  useEffect(() => {
    const animate = () => {
      shiftPoints(points.current);
      for (let i = 0; i < circleRefs.current.length; i++) {
        const circle = circleRefs.current[i];
        circle.setAttribute("cx", points.current[i].x.toString());
        circle.setAttribute("cy", points.current[i].y.toString());
      }
      frameRef.current = nextFrame(animate);
      benchmark();
    };
    animate();
    return () => cancelFrame(frameRef.current);
  }, []);

  return (
    <div className="app">
      <svg width={WIDTH} height={HEIGHT}>
        {
          points.current.map((point, i) => (
            <circle
              ref={el => circleRefs.current[i] = el as SVGCircleElement}
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
