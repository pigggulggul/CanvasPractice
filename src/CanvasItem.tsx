import useCanvas from "./useCanvas";

type canvasType = {
  canvasWidth: number;
  canvasHeight: number;
};
export default function CanvasItem(props: canvasType) {
  const canvasWidth = props.canvasWidth;
  const canvasHeight = props.canvasHeight;
  const canvasRef = useCanvas(canvasWidth, canvasHeight);
  return <canvas ref={canvasRef} style={{ backgroundColor: "red" }}></canvas>;
}
