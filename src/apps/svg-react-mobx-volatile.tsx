import React, { useEffect } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, benchmark } from "../shared";
import { observer } from "mobx-react-lite";
import { action, makeObservable, observable } from "mobx";


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

const store = new PointsStore();
const animate = () => {
  store.shiftPoints();
  nextFrame(animate);
};

export const AppSVGReactMobxVolatile = observer(() => {
  useEffect(() => {
    animate();
  }, []);

  // eslint-disable-next-line no-unused-expressions
  store.pointsUpdateFlag; // This is needed to make sure the component re-renders when the points change.

  benchmark();

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
