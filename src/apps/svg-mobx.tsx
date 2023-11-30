import { IPoint, getRandomPoints, getSVGElement, shiftPoints, nextFrame, benchmark } from "../shared";
import { autorun, makeObservable, observable, action } from "mobx";

class PointsStore {
  @observable points: IPoint[] = getRandomPoints();
  constructor() {
    makeObservable(this);
  }
  @action shiftPoints() {
    shiftPoints(this.points);
  }
}

export const AppSVGMobx = {
  main: () => {
    const svg = getSVGElement();
    const store = new PointsStore();

    const animate = () => {
      store.shiftPoints();
      nextFrame(animate);
    };
    animate();

    // Create circles, this happens only once
    for (let i = 0; i < store.points.length; i++) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "2");
      circle.setAttribute("fill", "#333");
      circle.setAttribute("stroke-width", "0.5");
      circle.setAttribute("stroke", "#ffa1a1");
      svg.appendChild(circle);
    }

    autorun(() => {
      for (let i = 0; i < store.points.length; i++) {
        const circle = svg.children[i] as SVGCircleElement;
        circle.setAttribute("cx", store.points[i].x.toString());
        circle.setAttribute("cy", store.points[i].y.toString());
      }
      benchmark();
    });
  }
};
