import { useEffect, useRef, useState } from "react";
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
    <div className="flex flex-col justify-center items-center">
      <section
        className="main flex justify-center items-center w-3/4"
        style={{ height: "800px" }}
      >
        <main id="capture" className="w-3/4 h-full relative" ref={canvasRef}>
          <CanvasItem
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            onChangeType={currentTemplate}
          ></CanvasItem>

          <div className="absolute w-3/4 mb-4 bottom-0 border left-1/2 -translate-x-1/2">
            <div className="w-full flex h-64 bg-slate-100">
              <div className="w-3/4 flex flex-col justify-between border p-2">
                <p className="frame-text-1">
                  I confess, I haven't tried too hard to concentrate, not when I
                  know you are but a daydreamaway.
                </p>
                <span className="text-right">icon</span>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center border p-2">
                <img className="w-5/6 h-5/6" src={previewImages} />
                <p className="frame-text-2 h-1/6 flex justify-center items-center">
                  Eliet
                </p>
              </div>
            </div>
          </div>
        </main>
        <div className="detail w-1/4 h-full border">
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
        </div>
      </section>

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
