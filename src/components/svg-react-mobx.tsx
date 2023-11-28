import React, { useEffect } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame } from "./shared";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";
import "./app.scss";

// We probably don't want to design apps like this, but it's interesting to see how fast it can be. svg-react-mobx-2 is
// probably a better approach, especially when it's not known how many points will be updated each frame.

class PointsStore {
  @observable points: IPoint[] = getRandomPoints();

  constructor() {
    makeObservable(this);
  }

  @action shiftPoints() {
    const newPoints = this.points.slice();
    shiftPoints(newPoints);
    this.points = newPoints;
  }
}

const store = new PointsStore();
const animate = () => {
  store.shiftPoints();
  nextFrame(animate);
};

export const AppSVGReactMobx = observer(() => {
  useEffect(() => {
    animate();
  }, []);

  return (
    <div className="app">
      <svg width={WIDTH} height={HEIGHT}>
        {
          store.points.map((point, i) => (
            <Point key={i} point={point} />
          ))
        }
      </svg>
    </div>
  );
});

// Note that `observer` is omitted here on purpose, as it would make the app slower. However, it might not be a good
// idea in real-world apps.
const Point = ({ point }: { point: IPoint }) => (
  <circle
    r="2"
    fill="#333"
    strokeWidth="0.5"
    stroke="#ffa1a1"
    cx={point.x}
    cy={point.y}
  />
);
