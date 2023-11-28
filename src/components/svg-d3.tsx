import { IPoint, getRandomPoints, getSVGElement, shiftPoints, nextFrame } from "./shared";
import * as d3 from "d3";
import "./app.scss";

export const AppSVGD3 = {
  main: () => {
    const points = getRandomPoints();
    const svg = getSVGElement();

    const animate = () => {
      shiftPoints(points);

      const circles = d3.select(svg)
        .selectAll("circle")
        .data<IPoint>(points || [], d => (d as IPoint)?.id);

      circles.enter()
        .append("circle")
        .attr("r", "2")
        .attr("fill", "#333")
        .attr("stroke-width", 0.5)
        .attr("stroke", "#ffa1a1");

      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      circles.exit().remove();

      nextFrame(animate);
    };

    animate();
  }
};
