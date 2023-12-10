import { useEffect, useState } from "react";
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
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D>();
  // painting state
  const [painting, setPainting] = useState(false);

  const animate = (ctx: CanvasRenderingContext2D) => {};

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#000000";
        setGetCtx(ctx);
      }
    }
  }, []);
  const drawFn = (e: any) => {
    // mouse position
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    // drawing
    if (!painting && getCtx) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      getCtx!.lineTo(mouseX, mouseY);
      getCtx!.stroke();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={() => setPainting(true)}
      onMouseUp={() => setPainting(false)}
      onMouseMove={(e) => drawFn(e)}
      onMouseLeave={() => setPainting(false)}
    ></canvas>
  );
}
