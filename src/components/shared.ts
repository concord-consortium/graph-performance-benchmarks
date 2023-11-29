export const COUNT = 10000;
export const WIDTH = 600;
export const HEIGHT = 400;

export interface IPoint {
  id: string;
  x: number;
  y: number;
}

export const getRandomPoints = () => {
  const points: IPoint[] = [];
  for (let i = 0; i < COUNT; i++) {
    points.push({
      id: `id-${i}`,
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
    });
  }
  return points;
};

const UPDATE_RATIO = 1;
export const shiftPoints = (points: IPoint[]) => {
  for (let i = 0; i < points.length; i++) {
    if (Math.random() < UPDATE_RATIO) {
      points[i].x += Math.random() * 2 - 1;
      points[i].y += Math.random() * 2 - 1;
    }
  }
};

export const getSVGElement = () => {
  const app = document.createElement("div");
  app.setAttribute("class", "app");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", WIDTH.toString());
  svg.setAttribute("height", HEIGHT.toString());

  document.getElementById("app")?.appendChild(app);
  app.appendChild(svg);

  return svg;
};

export const getCanvas = ({ devicePixelRatio }: { devicePixelRatio: number } = { devicePixelRatio: 2 }) => {
  const app = document.createElement("div");
  app.setAttribute("class", "app");

  const canvas = document.createElement("canvas");
  // Setup support for HDPI displays so it's more comparable to SVG quality.
  canvas.setAttribute("width", (WIDTH * devicePixelRatio).toString());
  canvas.setAttribute("height", (HEIGHT * devicePixelRatio).toString());
  canvas.style.width = `${WIDTH}px`;
  canvas.style.height = `${HEIGHT}px`;

  if (devicePixelRatio !== 1) {
    const ctx = canvas.getContext("2d");
    ctx?.scale(devicePixelRatio, devicePixelRatio);
  }

  document.getElementById("app")?.appendChild(app);
  app.appendChild(canvas);

  return canvas;
};

const BENCHMARK_FRAME = 100;
const deltas: number[] = new Array(BENCHMARK_FRAME).fill(0);
let bi = 0;
let sum = 0;
let prevTimestamp = performance.now();

export const benchmark = () => {
  const now = performance.now();
  const delta = now - prevTimestamp;
  // Subtract the oldest delta from the sum
  sum -= deltas[bi % BENCHMARK_FRAME];
  // Add the new delta to the sum
  sum += delta;
  // Store the new delta
  deltas[bi % BENCHMARK_FRAME] = delta;
  if (bi >= BENCHMARK_FRAME) {
    const avg = sum / BENCHMARK_FRAME;
    document.getElementById("delta")!.innerHTML = avg.toFixed(2);
    document.getElementById("fps")!.innerHTML = (1000 / avg).toFixed(2);
  }
  prevTimestamp = now;
  bi++;
};

export const nextFrame = (fn: () => void) => {
  benchmark();
  return requestAnimationFrame(fn);
  // return setTimeout(fn);
};

export const cancelFrame = (id: number) => {
  cancelAnimationFrame(id);
  clearTimeout(id);
};
