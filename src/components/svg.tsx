import { getRandomPoints, getSVGElement, shiftPoints, nextFrame } from "./shared";
import "./app.scss";

export const AppSVG = {
  main: () => {
    const svg = getSVGElement();
    const points = getRandomPoints();

    const animate = () => {
      shiftPoints(points);

      if (svg.children.length === 0) {
        // Create circles, this happens only once
        for (let i = 0; i < points.length; i++) {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("r", "2");
          circle.setAttribute("fill", "#333");
          circle.setAttribute("stroke-width", "0.5");
          circle.setAttribute("stroke", "#ffa1a1");
          svg.appendChild(circle);
        }
      }
      for (let i = 0; i < svg.children.length; i++) {
        const circle = svg.children[i] as SVGCircleElement;
        circle.setAttribute("cx", points[i].x.toString());
        circle.setAttribute("cy", points[i].y.toString());
      }
      nextFrame(animate);
    };

    animate();
  }
};
