import { getRandomPoints, getSVGElement, shiftPoints, nextFrame, benchmark } from "../shared";
import { getSnapshot, types } from "mobx-state-tree";
import { autorun } from "mobx";

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
    // It's also possible to update with snapshots but this was much slower:
    // const points = structuredClone(getSnapshot(self.points));
    // applySnapshot(self.points, shiftPoints(points));
  }
}));

export const AppSVGMSTSnapshot = {
  main: () => {
    const svg = getSVGElement();

    const store = PointsStore.create({
      points: getRandomPoints()
    });
    const animate = () => {
      store.shiftPoints();
      nextFrame(animate);
    };
    animate();

    autorun(() => {
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
      const points = getSnapshot(store.points);
      for (let i = 0; i < points.length; i++) {
        const circle = svg.children[i] as SVGCircleElement;
        circle.setAttribute("cx", points[i].x.toString());
        circle.setAttribute("cy", points[i].y.toString());
      }
      benchmark();
    });
  }
};
