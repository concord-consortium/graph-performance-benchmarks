import React, { useEffect } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame } from "./shared";
import { types } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import "./app.scss";

const Point = types.model({
  id: types.identifier,
  x: types.number,
  y: types.number
});

// Define a store just like a model
const PointsStore = types.model({
  points: types.array(Point),
}).actions(self => ({
  shiftPoints() {
    shiftPoints(self.points);
  }
}));

const store = PointsStore.create({
  points: getRandomPoints()
});
const animate = () => {
  store.shiftPoints();
  nextFrame(animate);
};

export const AppSVGReactMST = observer(() => {
  useEffect(() => {
    animate();
  }, []);

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

const PointComp = observer(({ point }: { point: IPoint }) => (
  <circle
    r="2"
    fill="#333"
    strokeWidth="0.5"
    stroke="#ffa1a1"
    cx={point.x}
    cy={point.y}
  />
));
