import { useEffect, useRef } from "react";

export default function useCanvas(canvasWidth: number, canvasHeight: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;
      if (canvas && ctx) {
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
      }
    };
    setCanvas();

    // console.log(canvasWidth);
    // console.log(canvasHeight);
  }, [canvasWidth, canvasHeight]);
  return canvasRef;
}
