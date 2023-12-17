import { useRef, useState } from "react";
import CanvasItem from "../CanvasItem";

export default function TypeA(props: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasWidth: number;
  canvasHeight: number;
  template: string;
}) {
  const { canvasRef, canvasWidth, canvasHeight, template } = props;
  const [previewImages, setPreviewImages] = useState<string>();
  const [currentTemplate, setcurrentTemplate] = useState<string>(template);
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
  );
}
