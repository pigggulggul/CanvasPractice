import { ILightSource, LightSource } from "./class/LightSource";
import { IPoint, Point } from "./class/Point";
import useCanvas from "./useCanvas";

type canvasType = {
  canvasWidth: number;
  canvasHeight: number;
};
export default function CanvasItem(props: canvasType) {
  const canvasWidth = props.canvasWidth;
  const canvasHeight = props.canvasHeight;

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(31,31,36)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const lightSource: ILightSource = new LightSource(canvasWidth, canvasHeight);

  let points: IPoint[] = [];
  const initPoints = () => {
    const POINT_NUMBER = 72;
    const POINT_GAP = canvasWidth / POINT_NUMBER;

    for (let i = 0; i <= POINT_NUMBER; i++) {
      const point: IPoint = new Point(POINT_GAP, i, canvasWidth, canvasHeight);
      points.push(point);
    }
  };
  if (canvasWidth !== 0 && canvasHeight !== 0) {
    initPoints();
  }

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    fillBackground(ctx);
    lightSource.drawRadialGradientBehindLightSource(ctx);
    lightSource.drawLightSource(ctx);

    for (let i = 0; i < points.length; i++) {
      lightSource.drawLightLines(
        ctx,
        points[i].pointCenterX,
        points[i].pointCenterY
      );
      points[i].animate(ctx);
    }
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef}></canvas>;
}
