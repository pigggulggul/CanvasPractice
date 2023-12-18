import { BaseSyntheticEvent, useRef, useState } from "react";
import CanvasItem from "../CanvasItem";

export default function TypeA(props: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasWidth: number;
  canvasHeight: number;
  template: string;
}) {
  const { canvasRef, canvasWidth, canvasHeight, template } = props;
  const [characterImage, setCharacterImage] = useState<string>();
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [currentTemplate, setcurrentTemplate] = useState<string>(template);
  const [line, setLine] = useState<string>("대사를 입력해주세요");
  const [character, setCharacter] = useState<string>("이름");
  const [eraserFlag, setEraserFlag] = useState<boolean>(false);
  const [characterResize, setCharacterResize] = useState<ImageResize>({
    zoom: 1.0,
    updown: 0,
    leftright: 0,
  });

  const uploadCharacter = (event: any) => {
    setCharacterImage("");
    if (event.target.files.length > 1) {
      alert("사진은 최대 1개 까지 첨부가능합니다.");
    } else {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setCharacterImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const uploadBackground = (event: any) => {
    setBackgroundImage("");
    if (event.target.files.length > 1) {
      alert("사진은 최대 1개 까지 첨부가능합니다.");
    } else {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setBackgroundImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const changeCharacter = (event: BaseSyntheticEvent) => {
    setCharacter(event.target.value);
  };
  const resizeZoomCharacter = (event: BaseSyntheticEvent) => {
    let num: number = parseFloat(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      zoom: num,
    }));
  };
  const resizeUpdownCharacter = (event: BaseSyntheticEvent) => {
    let num: number = parseInt(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      updown: num,
    }));
  };
  const resizeLeftrightCharacter = (event: BaseSyntheticEvent) => {
    let num: number = parseInt(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      leftright: num,
    }));
  };
  const changeLine = (event: BaseSyntheticEvent) => {
    setLine(event.target.value);
  };
  const eraserButton = () => {
    setEraserFlag(!eraserFlag);
  };
  return (
    <section className="main flex flex-col justify-center items-center">
      <main
        id="capture"
        className="relative"
        ref={canvasRef}
        style={{ height: "1050px", width: "1400px" }}
      >
        <CanvasItem
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          onChangeType={currentTemplate}
          eraser={eraserFlag}
        ></CanvasItem>

        <div className="absolute w-3/4 mb-4 bottom-0 border left-1/2 -translate-x-1/2">
          <div className="w-full flex h-64 bg-slate-100">
            <div className="w-3/4 flex flex-col justify-between border p-2">
              <p className="frame-text-1">{line}</p>
              <span className="text-right">icon</span>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center border p-2">
              <div className="w-5/6 h-5/6 relative overflow-hidden">
                <img
                  className="w-full h-full object-cover absolute"
                  src={characterImage}
                  style={{
                    transform: `scale(${characterResize.zoom})`,
                    top: `${characterResize.updown}px`,
                    left: `${characterResize.leftright}px`,
                  }}
                />
              </div>

              <p className="frame-text-2 h-1/6 flex justify-center items-center">
                {character}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 w-full h-full -z-10">
          <img className="w-full h-full" src={backgroundImage} />
        </div>
      </main>
      <div className="detail w-full h-full border">
        <div className="character-image-upload">
          <label className="input-file-button" htmlFor="characterfile">
            <span className="border"> 인물사진 등록 </span>
          </label>
          <input
            type="file"
            id="characterfile"
            accept="image/*, .gif"
            onChange={uploadCharacter}
            style={{ display: "none" }}
          />
          <p>인물 크기 조정</p>

          <ul>
            <li>
              <p>확대,축소 (0~3)</p>
              <input
                type="number"
                step={0.1}
                className="border"
                value={characterResize.zoom}
                onChange={resizeZoomCharacter}
              />
            </li>
            <li>
              <p>상,하 (+,-)</p>
              <input
                type="number"
                step={5}
                className="border"
                value={characterResize.updown}
                onChange={resizeUpdownCharacter}
              />
            </li>
            <li>
              <p>좌,우 (+,-)</p>
              <input
                type="number"
                step={5}
                className="border"
                value={characterResize.leftright}
                onChange={resizeLeftrightCharacter}
              />
            </li>
          </ul>
        </div>
        <div className="background-image-upload">
          <label className="input-file-button" htmlFor="backgroundfile">
            <span className="border"> 배경 등록 </span>
          </label>
          <input
            type="file"
            id="backgroundfile"
            accept="image/*, .gif"
            onChange={uploadBackground}
            style={{ display: "none" }}
          />
        </div>
        <div>
          <p>대사 : </p>
          <input
            type="text"
            className="border"
            value={line}
            onChange={changeLine}
          />
          <p>캐릭터이름 : </p>
          <input
            type="text"
            className="border"
            value={character}
            onChange={changeCharacter}
          />
        </div>
        <button onClick={eraserButton}>지우기</button>
      </div>
    </section>
  );
}
