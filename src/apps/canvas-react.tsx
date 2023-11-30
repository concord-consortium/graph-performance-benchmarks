import React, { useEffect, useRef, useState } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, cancelFrame, benchmark } from "../shared";

export const AppCanvasReact = () => {
  const frameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<IPoint[]>(getRandomPoints);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const devicePixelRatio = 2;
      ctx?.scale(devicePixelRatio, devicePixelRatio);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      setPoints(oldPoints => shiftPoints(oldPoints.slice()));

      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < points.length; i++) {
          ctx.beginPath();
          ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2, false);
          ctx.fillStyle = "#333";
          ctx.fill();
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = "#ffa1a1";
          ctx.stroke();
        }
      }

      frameRef.current = nextFrame(animate);
    };

    animate();

    return () => cancelFrame(frameRef.current);
  }, [points]);

  benchmark();

  return (
    <div className="app">
      <canvas width={WIDTH * 2} height={HEIGHT * 2} style={{ width: WIDTH, height: HEIGHT }} ref={canvasRef} />
    </div>
  );
};
