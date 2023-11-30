import { getRandomPoints, shiftPoints, nextFrame, getSVGElement, benchmark } from "../shared";
import { types } from "mobx-state-tree";
import { autorun } from "mobx";

const PointsStore = types.model({
  pointsUpdateFlag: 0,
  param1: 2,
  param2: 2
}).volatile(self => ({
  points: getRandomPoints(),
})).views(self => ({
  get param3() {
    return self.param1 / self.param2;
  },
  getParam4() {
    return Math.random() < 0.5 ? -1 : 1;
  }
})).actions(self => ({
  shiftPoints() {
    shiftPoints(self.points, () => self.param3 * self.getParam4());
    self.pointsUpdateFlag++;
  }
}));

// Note this is NOT a react component. It's just a function that renders directly to the DOM using autorun.
export const AppSVGMSTVolatileObservables = {
  main: () => {
    const svg = getSVGElement();

    const store = PointsStore.create({});
    const animate = () => {
      store.shiftPoints();
      nextFrame(animate);
    };

    animate();

    autorun(() => {
      // eslint-disable-next-line no-unused-expressions
      store.pointsUpdateFlag; // This is needed to make sure the component re-renders when the points change.

      if (svg.children.length === 0) {
        // Create circles, this happens only once
        for (let i = 0; i < store.points.length; i++) {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("r", "2");
          circle.setAttribute("fill", "#333");
          circle.setAttribute("stroke-width", "0.5");
          circle.setAttribute("stroke", "#ffa1a1");
          svg.appendChild(circle);
        }
      }
      for (let i = 0; i < store.points.length; i++) {
        const circle = svg.children[i] as SVGCircleElement;
        circle.setAttribute("cx", store.points[i].x.toString());
        circle.setAttribute("cy", store.points[i].y.toString());
      }
      benchmark();
    });
  }
};
