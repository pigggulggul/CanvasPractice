import { useRef, useState } from "react";
import "./App.css";
import CanvasItem from "./CanvasItem";
import useClientWidthHeight from "./script/useClientWidthHeight";
import html2canvas from "html2canvas";

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
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;
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
  const upload = (event: any) => {
    console.log("upload 호출");
    console.log(event.target.files.length);
    setPreviewImages("");
    if (event.target.files.length > 1) {
      alert("사진은 최대 1개 까지 첨부가능합니다.");
    } else {
      //file째로(DTO-X 뷰에 찍히는 정보대로) 저장
      // files.value.fileInfos = event.target.files;
      for (const file of event.target.files) {
        //프리뷰
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setPreviewImages(e.target.result);
          console.log(previewImages);
        };
        reader.readAsDataURL(file);
      }
    }
    // 사용자가 올린 이미지
    console.log(event.target.files);
    // URL.createObjectURL로 사용자가 올린 이미지를 URL로 만들어서 화면에 표시할 수 있게 한다. img 태그의 src값에 바인딩해준다
    //   this.imageUploaded = URL.createObjectURL(this.image)
  };
  return (
    <>
      <main
        id="capture"
        ref={canvasRef}
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        <h1>현재 선택한 template : {currentTemplate}</h1>
        <CanvasItem
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        ></CanvasItem>

        <div style={{ width: "400px", position: "absolute", top: "10%" }}>
          <img src={previewImages} />
        </div>
      </main>
      {/* template */}
      <section className="template">
        <ul className="flex border border-red-100">{templateList}</ul>
      </section>

      <button onClick={onHtmlToPng}>다운로드</button>
      <div className="mypage-img-wrap">
        <label className="input-file-button" htmlFor="upfile">
          <span className=""> 사진등록 </span>
        </label>
        <input
          type="file"
          id="upfile"
          accept="image/*, .gif"
          onChange={upload}
          style={{ display: "none" }}
        />
      </div>
    </>
  );

  function changeTemplate(type: string) {
    setcurrentTemplate(type);
  }
}

export default App;
