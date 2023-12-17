import { useEffect, useRef, useState } from "react";
import "./App.css";
import CanvasItem from "./CanvasItem";
import useClientWidthHeight from "./script/useClientWidthHeight";
import html2canvas from "html2canvas";
import TypeA from "./component/TypeA";

type templateType = {
  thumb: string;
  name: string;
  thumbType: string;
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewImages, setPreviewImages] = useState<string>();
  const [currentTemplate, setcurrentTemplate] = useState<string>("");
  const template: templateType[] = [
    { thumb: "typeA", name: "타입A", thumbType: "jpg" },
    { thumb: "typeB", name: "타입B", thumbType: "jpg" },
  ];
  const templateList = template.map((item, index) => {
    const imgSrc = "/src/images/thumbnail/" + item.thumb + "." + item.thumbType;
    return (
      <li
        className=" p-4 m-4 flex flex-col items-center cursor-pointer hover:bg-slate-100 "
        key={item.thumb}
        onClick={() => {
          changeTemplate(item.thumb);
        }}
      >
        <img className="relative w-36 h-36" src={imgSrc} alt="" />
        <p>{item.name}</p>
      </li>
    );
  });

  const clientRect = useClientWidthHeight(canvasRef);
  let canvasWidth: number;
  let canvasHeight: number;
  // if (clientRect.width > 1535) {
  //   canvasWidth = 1536;
  // } else if (clientRect.width > 1279) {
  //   canvasWidth = 1280;
  // } else if (clientRect.width > 1023) {
  //   canvasWidth = 1024;
  // } else if (clientRect.width > 767) {
  //   canvasWidth = 768;
  // } else {
  //   canvasWidth = 640;
  // }
  canvasWidth = 1400;
  canvasHeight = 1050;
  const onHtmlToPng = () => {
    const target = canvasRef.current;
    const onCapture = () => {
      console.log("onCapture");
      if (!target) {
        return alert("결과 저장에 실패했습니다");
      }
      html2canvas(target).then((canvas) => {
        onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
      });
    };

    const onSaveAs = (uri: string, filename: string) => {
      console.log("onSaveAs");
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
    onCapture();
  };
  function selectType() {
    switch (currentTemplate) {
      case "typeA": {
        console.log("typeA");
        return (
          <TypeA
            canvasRef={canvasRef}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            template={currentTemplate}
          ></TypeA>
        );
        break;
      }
      case "typeB": {
        console.log("typeB");
        return (
          <TypeA
            canvasRef={canvasRef}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            template={currentTemplate}
          ></TypeA>
        );
      }

      default:
        return <div></div>;
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {selectType()}
      {/* template */}
      <section className="template w-3/4">
        <ul className="flex border border-red-100">{templateList}</ul>
      </section>

      <button onClick={onHtmlToPng}>다운로드</button>
    </div>
  );

  function changeTemplate(type: string) {
    setcurrentTemplate(type);
    setPreviewImages("");
  }
}

export default App;
