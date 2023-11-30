import { getRandomPoints, shiftPoints, nextFrame, getCanvas, benchmark } from "./shared";

export const AppCanvas = {
  main: () => {
    const canvas = getCanvas();
    const ctx = canvas.getContext("2d");
    const points = getRandomPoints();

    const animate = () => {
      shiftPoints(points);

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
      nextFrame(animate);
      benchmark();
    };

    animate();
  }
};
