import React from "react";
import { createRoot } from "react-dom/client";
import { AppSVG } from "./components/svg";
import { AppSVGD3 } from "./components/svg-d3";
import { AppSVGReactStateOnly } from "./components/svg-react";
import { AppSVGReactComponents } from "./components/svg-react-components";
import { AppSVGReactPointComponents } from "./components/svg-react-point-components";
import { AppSVGMobx } from "./components/svg-mobx";
import { AppSVGMST } from "./components/svg-mst";
import { AppSVGReactMobx } from "./components/svg-react-mobx";
import { AppSVGReactMobx2 } from "./components/svg-react-mobx-2";
import { AppSVGReactMST } from "./components/svg-react-mst";
import { AppSVGReactMSTVolatile } from "./components/svg-react-mst-volatile";
import { AppSVGMSTVolatile } from "./components/svg-mst-volatile";
import { AppSVGMobxVolatile } from "./components/svg-mobx-volatile";
import { AppCanvas } from "./components/canvas";
import { AppCanvasReact } from "./components/canvas-react";
import { AppReactThreeFiber } from "./components/react-three-fiber";
import { AppReactThreeFiberReactState } from "./components/react-three-fiber-react-state";

import "./index.scss";

const urlParamPage = new URLSearchParams(window.location.search).get("page");

const Apps: Record<string, React.FC | { main: () => void }> = {
  "svg": AppSVG,
  "svg-d3": AppSVGD3,
  "svg-react": AppSVGReactStateOnly,
  "svg-react-components": AppSVGReactComponents,
  "svg-react-point-components": AppSVGReactPointComponents,
  "svg-mobx": AppSVGMobx,
  "svg-mobx-volatile": AppSVGMobxVolatile,
  "svg-mst": AppSVGMST,
  "svg-mst-volatile": AppSVGMSTVolatile,
  "svg-react-mobx": AppSVGReactMobx,
  "svg-react-mobx-2": AppSVGReactMobx2,
  "svg-react-mst": AppSVGReactMST,
  "svg-react-mst-volatile": AppSVGReactMSTVolatile,
  "canvas": AppCanvas,
  "canvas-react": AppCanvasReact,
  "react-three-fiber": AppReactThreeFiber,
  "react-three-fiber-react-state": AppReactThreeFiberReactState,
};

const container = document.getElementById("app");
if (container) {
  const App = Apps[urlParamPage || "svg"];
  if (!App) {
    throw new Error(`No App found for page "${urlParamPage}"`);
  }
  if (typeof App === "object" && "main" in App) {
    App.main();
  } else {
    const root = createRoot(container);
    root.render(<App />);
  }
}
