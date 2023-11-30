import React from "react";
import { createRoot } from "react-dom/client";
import { AppSVG } from "./components/svg";
import { AppSVGD3 } from "./components/svg-d3";
import { AppSVGReactState } from "./components/svg-react-state";
import { AppSVGReactStateRefs } from "./components/svg-react-refs";
import { AppSVGReactComponents } from "./components/svg-react-components";
import { AppSVGReactComponentsWrong } from "./components/svg-react-components-wrong";
import { AppSVGReactPointComponents } from "./components/svg-react-point-components";
import { AppSVGMobx } from "./components/svg-mobx";
import { AppSVGMST } from "./components/svg-mst";
import { AppSVGReactMobx } from "./components/svg-react-mobx";
import { AppSVGReactMobx2 } from "./components/svg-react-mobx-2";
import { AppSVGReactMST } from "./components/svg-react-mst";
import { AppSVGReactMSTVolatile } from "./components/svg-react-mst-volatile";
import { AppSVGMSTVolatile } from "./components/svg-mst-volatile";
import { AppSVGMSTVolatileObservables } from "./components/svg-mst-volatile-observables";
import { AppSVGMobxVolatile } from "./components/svg-mobx-volatile";
import { AppCanvas } from "./components/canvas";
import { AppCanvasReact } from "./components/canvas-react";
import { AppReactThreeFiberRefs } from "./components/react-three-fiber-refs";
import { AppReactThreeFiberReactState } from "./components/react-three-fiber-react-state";
import { AppPixiGraphics } from "./components/pixi-graphics";
import { AppPixiSprite } from "./components/pixi-sprite";
import { AppPixiReactRefs } from "./components/pixi-react-refs";
import { AppPixiReactState } from "./components/pixi-react-state";
import { AppPixiSpriteMobx } from "./components/pixi-sprite-mobx";
import { AppPixiSpriteMobxVolatile } from "./components/pixi-sprite-mobx-volatile";
import { AppPixiSpriteMST } from "./components/pixi-sprite-mst";
import { AppPixiSpriteMSTVolatile } from "./components/pixi-sprite-mst-volatile";
import { AppSVGReactComponentsRefs } from "./components/svg-react-components-refs";
import { AppSVGReactMobxVolatile } from "./components/svg-react-mobx-volatile";

import "./index.scss";

const urlParamPage = new URLSearchParams(window.location.search).get("page");

const Apps: Record<string, React.FC | { main: () => void }> = {
  "svg": AppSVG,
  "svg-d3": AppSVGD3,
  "svg-react-state": AppSVGReactState,
  "svg-react-refs": AppSVGReactStateRefs,
  "svg-react-components": AppSVGReactComponents,
  "svg-react-components-refs": AppSVGReactComponentsRefs,
  "svg-react-components-wrong": AppSVGReactComponentsWrong,
  "svg-react-point-components": AppSVGReactPointComponents,
  "svg-mobx": AppSVGMobx,
  "svg-mobx-volatile": AppSVGMobxVolatile,
  "svg-mst": AppSVGMST,
  "svg-mst-volatile": AppSVGMSTVolatile,
  "svg-mst-volatile-observables": AppSVGMSTVolatileObservables,
  "svg-react-mobx": AppSVGReactMobx,
  "svg-react-mobx-2": AppSVGReactMobx2,
  "svg-react-mst": AppSVGReactMST,
  "svg-react-mst-volatile": AppSVGReactMSTVolatile,
  "svg-react-mobx-volatile": AppSVGReactMobxVolatile,
  "canvas": AppCanvas,
  "canvas-react": AppCanvasReact,
  "react-three-fiber-refs": AppReactThreeFiberRefs,
  "react-three-fiber-react-state": AppReactThreeFiberReactState,
  "pixi-graphics": AppPixiGraphics,
  "pixi-sprite": AppPixiSprite,
  "pixi-sprite-mobx": AppPixiSpriteMobx,
  "pixi-sprite-mobx-volatile": AppPixiSpriteMobxVolatile,
  "pixi-sprite-mst": AppPixiSpriteMST,
  "pixi-sprite-mst-volatile": AppPixiSpriteMSTVolatile,
  "pixi-react-refs": AppPixiReactRefs,
  "pixi-react-state": AppPixiReactState,
};

const container = document.getElementById("app");
if (container) {
  const App = Apps[urlParamPage!];
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
