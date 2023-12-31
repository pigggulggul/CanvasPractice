import { useEffect, useRef } from "react";

export default function useCanvas(
  canvasWidth: number,
  canvasHeight: number,
  animate: (ctx: CanvasRenderingContext2D) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const setCanvas = () => {
      // const devicePixelRatio = window.devicePixelRatio ?? 1;
      let devicePixelRatio = 1;
      if (canvas && ctx) {
        if (canvasWidth > 1300) {
          devicePixelRatio = 2;
          canvasWidth /= 2;
          canvasHeight /= 2;
        }
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    };
    setCanvas();

    let requestId: number;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);

      if (ctx) {
        animate(ctx);
      }
    };
    requestAnimation();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [canvasWidth, canvasHeight]);
  return canvasRef;
}
