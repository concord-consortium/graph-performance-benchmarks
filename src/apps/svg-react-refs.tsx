import React, { useEffect, useRef } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, cancelFrame, benchmark } from "../shared";

export const AppSVGReactStateRefs = () => {
  const frameRef = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const points = useRef<IPoint[]>(getRandomPoints());

  useEffect(() => {
    const animate = () => {
      shiftPoints(points.current);

      const svg = svgRef.current;
      if (!svg) {
        return;
      }
      if (svg.children.length === 0) {
        // Create circles, this happens only once
        for (let i = 0; i < points.current.length; i++) {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("r", "2");
          circle.setAttribute("fill", "#333");
          circle.setAttribute("stroke-width", "0.5");
          circle.setAttribute("stroke", "#ffa1a1");
          svg.appendChild(circle);
        }
      }
      for (let i = 0; i < svg.children.length; i++) {
        const circle = svg.children[i] as SVGCircleElement;
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
      <svg width={WIDTH} height={HEIGHT} ref={svgRef} />
    </div>
  );
};
