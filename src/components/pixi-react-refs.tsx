import React, { useEffect, useRef, useState } from "react";
import { Graphics, RenderTexture } from "pixi.js";
import { Stage, Sprite, useApp, useTick } from "@pixi/react";
import { getRandomPoints, shiftPoints, WIDTH, HEIGHT, benchmark, IPoint } from "./shared";

const CircleSprites = () => {
  const app = useApp();
  const [texture, setTexture] = useState<RenderTexture>();
  const points = useRef<IPoint[]>(getRandomPoints());
  const spriteRef = useRef<any[]>([]);

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
    shiftPoints(points.current);
    for (let i = 0; i < points.current.length; i++) {
      spriteRef.current[i].x = points.current[i].x;
      spriteRef.current[i].y = points.current[i].y;
    }
    benchmark();
  });

  return texture ? points.current.map((point, i) => (
    <Sprite key={i} ref={el => spriteRef.current[i] = el} texture={texture} x={point.x} y={point.y} />
  )) : null;
};

export const AppPixiReactRefs = () => {
  return (
    <Stage width={WIDTH} height={HEIGHT} options={{ backgroundColor: 0xdfdfdf }}>
      <CircleSprites />
    </Stage>
  );
};
