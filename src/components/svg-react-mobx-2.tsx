import React, { useEffect } from "react";
import { HEIGHT, IPoint, WIDTH, getRandomPoints, shiftPoints, nextFrame, benchmark } from "./shared";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";

// Note that this variant can be really fasts when relatively small number of points gets updated each frame,
// as each Point component is observing only a single data point. However, when all points are updated each frame, this
// variant can be a bit slower than the previous one.

class PointsStore {
  @observable points: IPoint[] = getRandomPoints();

  constructor() {
    makeObservable(this);
  }

  @action shiftPoints() {
    shiftPoints(this.points);
  }
}

const store = new PointsStore();
const animate = () => {
  store.shiftPoints();
  nextFrame(animate);
};

export const AppSVGReactMobx2 = observer(() => {
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

const Point = observer(({ point }: { point: IPoint }) => {
  if (point.id === "id-0") {
    benchmark();
  }
  return <circle
    r="2"
    fill="#333"
    strokeWidth="0.5"
    stroke="#ffa1a1"
    cx={point.x}
    cy={point.y}
  />;
});
