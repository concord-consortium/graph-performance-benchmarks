import React from "react";
import { createRoot } from "react-dom/client";
import { AppSVG } from "./apps/svg";
import { AppSVGD3 } from "./apps/svg-d3";
import { AppSVGReactState } from "./apps/svg-react-state";
import { AppSVGReactStateRefs } from "./apps/svg-react-refs";
import { AppSVGReactComponents } from "./apps/svg-react-components";
import { AppSVGReactComponentsWrong } from "./apps/svg-react-components-wrong";
import { AppSVGReactPointComponents } from "./apps/svg-react-point-components";
import { AppSVGMobx } from "./apps/svg-mobx";
import { AppSVGMST } from "./apps/svg-mst";
import { AppSVGReactMobx } from "./apps/svg-react-mobx";
import { AppSVGReactMobx2 } from "./apps/svg-react-mobx-2";
import { AppSVGReactMST } from "./apps/svg-react-mst";
import { AppSVGReactMSTVolatile } from "./apps/svg-react-mst-volatile";
import { AppSVGMSTVolatile } from "./apps/svg-mst-volatile";
import { AppSVGMSTVolatileObservables } from "./apps/svg-mst-volatile-observables";
import { AppSVGMobxVolatile } from "./apps/svg-mobx-volatile";
import { AppCanvas } from "./apps/canvas";
import { AppCanvasReact } from "./apps/canvas-react";
import { AppReactThreeFiberRefs } from "./apps/react-three-fiber-refs";
import { AppReactThreeFiberReactState } from "./apps/react-three-fiber-react-state";
import { AppPixiGraphics } from "./apps/pixi-graphics";
import { AppPixiSprite } from "./apps/pixi-sprite";
import { AppPixiReactRefs } from "./apps/pixi-react-refs";
import { AppPixiReactState } from "./apps/pixi-react-state";
import { AppPixiSpriteMobx } from "./apps/pixi-sprite-mobx";
import { AppPixiSpriteMobxVolatile } from "./apps/pixi-sprite-mobx-volatile";
import { AppPixiSpriteMST } from "./apps/pixi-sprite-mst";
import { AppPixiSpriteMSTVolatile } from "./apps/pixi-sprite-mst-volatile";
import { AppSVGReactComponentsRefs } from "./apps/svg-react-components-refs";
import { AppSVGReactMobxVolatile } from "./apps/svg-react-mobx-volatile";

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
