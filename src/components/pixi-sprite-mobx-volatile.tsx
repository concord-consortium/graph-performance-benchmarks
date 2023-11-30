import * as PIXI from "pixi.js";
import { getRandomPoints, shiftPoints, nextFrame, getCanvas, WIDTH, HEIGHT, benchmark, IPoint } from "./shared";
import { autorun, makeObservable, observable, action } from "mobx";

class PointsStore {
  @observable pointsUpdateFlag = 0;
  points: IPoint[] = getRandomPoints();
  constructor() {
    makeObservable(this);
  }
  @action shiftPoints() {
    shiftPoints(this.points);
    this.pointsUpdateFlag++;
  }
}

export const AppPixiSpriteMobxVolatile = {
  main: () => {
    const store = new PointsStore();
    const animate = () => {
      store.shiftPoints();
      nextFrame(animate);
    };
    animate();

    // pixi handles dpr by itself, so we need to set it to 1
    const canvas = getCanvas({ devicePixelRatio: 1 });
    const app = new PIXI.Application({
      view: canvas,
      width: WIDTH,
      height: HEIGHT,
      resolution: 2,
      backgroundColor: 0xdfdfdf
    });

    // Create a texture for the circle
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x333333);
    graphics.lineStyle(0.5, 0xffa1a1);
    graphics.drawCircle(0, 0, 2);
    graphics.endFill();
    const texture = app.renderer.generateTexture(graphics);

    // Create a sprite for each point
    const sprites = store.points.map(() => new PIXI.Sprite(texture));
    sprites.forEach(sprite => app.stage.addChild(sprite));

    autorun(() => {
      // eslint-disable-next-line no-unused-expressions
      store.pointsUpdateFlag; // This is needed to make sure the component re-renders when the points change.

      for (let i = 0; i < store.points.length; i++) {
        sprites[i].x = store.points[i].x;
        sprites[i].y = store.points[i].y;
      }

      benchmark();
    });
  }
};
