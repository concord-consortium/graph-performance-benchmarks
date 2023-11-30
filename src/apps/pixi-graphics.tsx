import * as PIXI from "pixi.js";
import { getRandomPoints, shiftPoints, nextFrame, getCanvas, WIDTH, HEIGHT, benchmark } from "../shared";

export const AppPixiGraphics = {
  main: () => {
    // pixi handles dpr by itself, so we need to set it to 1
    const canvas = getCanvas({ devicePixelRatio: 1 });

    const app = new PIXI.Application({
      view: canvas,
      width: WIDTH,
      height: HEIGHT,
      resolution: 2,
      backgroundColor: 0xdfdfdf
    });
    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);

    const points = getRandomPoints();

    const animate = () => {
      shiftPoints(points);

      graphics.clear();
      // Draw the circles
      for (let i = 0; i < points.length; i++) {
        graphics.beginFill(0x333333);
        graphics.lineStyle(0.5, 0xffa1a1);
        graphics.drawCircle(points[i].x, points[i].y, 2);
        graphics.endFill();
      }

      nextFrame(animate);
      benchmark();
    };

    animate();
  }
};
