import React, { useEffect } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame } from "./shared";
import { types } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import "./app.scss";

const PointsStore = types.model({
  pointsUpdateFlag: 0
}).volatile(self => ({
  points: getRandomPoints(),
})).actions(self => ({
  shiftPoints() {
    shiftPoints(self.points);
    self.pointsUpdateFlag++;
  }
}));

const store = PointsStore.create({});
const animate = () => {
  store.shiftPoints();
  nextFrame(animate);
};

export const AppSVGReactMSTVolatile = observer(() => {
  useEffect(() => {
    animate();
  }, []);

  // eslint-disable-next-line no-unused-expressions
  store.pointsUpdateFlag; // This is needed to make sure the component re-renders when the points change.

  return (
    <div className="app">
      <svg width={WIDTH} height={HEIGHT}>
        {
          store.points.map((point, i) => (
            <PointComp key={i} point={point} />
          ))
        }
      </svg>
    </div>
  );
});

const PointComp = ({ point }: { point: IPoint }) => (
  <circle
    r="2"
    fill="#333"
    strokeWidth="0.5"
    stroke="#ffa1a1"
    cx={point.x}
    cy={point.y}
  />
);
