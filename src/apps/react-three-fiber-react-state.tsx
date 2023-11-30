/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrthographicCamera } from "@react-three/drei";
import { IPoint, getRandomPoints, shiftPoints, benchmark, WIDTH, HEIGHT } from "../shared";

const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2, false);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffa1a1";
    ctx.stroke();
  }
  return canvas.toDataURL();
};

const circleTexture = createCircleTexture();

const Points = () => {
  const texture = useLoader(TextureLoader, circleTexture);
  const [points, setPoints] = useState<IPoint[]>(getRandomPoints);

  // Note that results may be bound to refresh rate of the screen, but useFrame is recommended approach.
  useFrame(() => {
    setPoints(oldPoints => shiftPoints(oldPoints.slice()));
  });

  benchmark();

  return points.map((point, i) => (
    <sprite key={i} position={[point.x, point.y, 0]} scale={[5, 5, 1]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  ));
};

export const AppReactThreeFiberReactState = () => {
  return (
    <div className="app">
      <div style={{ width: WIDTH, height: HEIGHT }}>
        <Canvas dpr={2}>
          <OrthographicCamera
            makeDefault
            zoom={1}
            bottom={0}
            top={HEIGHT}
            left={0}
            right={WIDTH}
            near={1}
            far={100}
            position={[0, 0, 50]}
          />
          <Points />
        </Canvas>
      </div>
    </div>
  );
};
/* eslint-enable react/no-unknown-property */
