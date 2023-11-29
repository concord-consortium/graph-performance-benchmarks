import * as PIXI from "pixi.js";
import { getRandomPoints, shiftPoints, nextFrame, getCanvas, WIDTH, HEIGHT } from "./shared";
import "./app.scss";

export const AppPixiSprite = {
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
    const points = getRandomPoints();

    // Create a texture for the circle
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x333333);
    graphics.lineStyle(0.5, 0xffa1a1);
    graphics.drawCircle(0, 0, 2);
    graphics.endFill();
    const texture = app.renderer.generateTexture(graphics);

    // Create a sprite for each point
    const sprites = points.map(() => new PIXI.Sprite(texture));
    sprites.forEach(sprite => app.stage.addChild(sprite));

    const animate = () => {
      shiftPoints(points);

      for (let i = 0; i < points.length; i++) {
        sprites[i].x = points[i].x;
        sprites[i].y = points[i].y;
      }

      nextFrame(animate);
    };

    animate();
  }
};
