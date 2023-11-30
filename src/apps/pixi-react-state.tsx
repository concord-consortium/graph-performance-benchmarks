import React, { useEffect, useState } from "react";
import { Graphics, RenderTexture } from "pixi.js";
import { Stage, Sprite, useApp, useTick } from "@pixi/react";
import { getRandomPoints, shiftPoints, WIDTH, HEIGHT, benchmark } from "../shared";

const CircleSprites = () => {
  const app = useApp();
  const [points, setPoints] = useState(getRandomPoints());
  const [texture, setTexture] = useState<RenderTexture>();

  useEffect(() => {
    const graphics = new Graphics();
    graphics.beginFill(0x333333);
    graphics.lineStyle(0.5, 0xffa1a1);
    graphics.drawCircle(0, 0, 2);
    graphics.endFill();
    const newTexture = app.renderer.generateTexture(graphics);
    setTexture(newTexture);
  }, [app]);

  useTick(() => {
    setPoints(oldPoints => shiftPoints(oldPoints.slice()));
  });

  benchmark();

  return texture ? points.map((point, index) => (
    <Sprite key={index} texture={texture} x={point.x} y={point.y} />
  )) : null;
};

export const AppPixiReactState = () => {
  return (
    <Stage width={WIDTH} height={HEIGHT} options={{ backgroundColor: 0xdfdfdf }}>
      <CircleSprites />
    </Stage>
  );
};
