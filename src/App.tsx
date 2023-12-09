import { useRef } from "react";
import "./App.css";
import CanvasItem from "./CanvasItem";
import useClientWidthHeight from "./script/useClientWidthHeight";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clientRect = useClientWidthHeight(canvasRef);
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;

  return (
    <>
      <main className="h-screen" ref={canvasRef}>
        <CanvasItem
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        ></CanvasItem>
      </main>
    </>
  );
}

export default App;
