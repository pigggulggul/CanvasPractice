import { BaseSyntheticEvent, useState } from "react";
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
  const [bgResize, setBgResize] = useState<ImageResize>({
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
    const num: number = parseFloat(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      zoom: num,
    }));
  };
  const resizeUpdownCharacter = (event: BaseSyntheticEvent) => {
    const num: number = parseInt(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      updown: num,
    }));
  };
  const resizeLeftrightCharacter = (event: BaseSyntheticEvent) => {
    const num: number = parseInt(event.target.value);
    setCharacterResize((prev) => ({
      ...prev,
      leftright: num,
    }));
  };
  const resizeZoomBg = (event: BaseSyntheticEvent) => {
    const num: number = parseFloat(event.target.value);
    setBgResize((prev) => ({
      ...prev,
      zoom: num,
    }));
  };
  const resizeUpdownBg = (event: BaseSyntheticEvent) => {
    const num: number = parseInt(event.target.value);
    setBgResize((prev) => ({
      ...prev,
      updown: num,
    }));
  };
  const resizeLeftrightBg = (event: BaseSyntheticEvent) => {
    const num: number = parseInt(event.target.value);
    setBgResize((prev) => ({
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
    <section className="main flex justify-center items-center">
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

        <div className="absolute w-3/4 mb-4 bottom-0 border left-1/2 -translate-x-1/2 border-amber-600 border-8">
          <div className="w-full flex h-64">
            <div
              className="w-3/4 flex flex-col justify-between border border-amber-800 p-2 bg-orange-300"
              style={{
                background:
                  "linear-gradient(0deg, rgba(239,170,98,1) 0%, rgba(250,196,114,1) 50%, rgba(239,170,98,1) 100%)",
              }}
            >
              {/* 대사 */}
              <p className="frame-text text-2xl text-orange-900">{line}</p>
              <span className="text-right material-symbols-outlined text-3xl text-orange-900">
                arrow_drop_down
              </span>
            </div>
            <div
              className="w-1/4 flex flex-col justify-center items-center border  border-amber-800 p-2"
              style={{ background: "#d78238" }}
            >
              {/* 캐릭터 이미지 */}
              <div
                className="w-5/6 h-5/6 relative overflow-hidden border-4 border-amber-600"
                style={{ background: "white" }}
              >
                <div
                  className="frame-image w-full h-full absolute"
                  style={{
                    backgroundImage: `url(${characterImage})`,
                    backgroundPositionX: `${characterResize.leftright}px`,
                    backgroundPositionY: `${characterResize.updown}px`,
                    transform: `scale(${characterResize.zoom})`,
                  }}
                ></div>
              </div>
              {/* 캐릭터 이름 */}
              <p className="frame-text text-2xl pt-2 text-orange-900 h-1/6 flex justify-center items-center">
                {character}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 w-full h-full -z-10 ">
          {/* 배경 이미지 */}
          <div className="w-full h-full relative overflow-hidden">
            <div
              className="frame-image w-full h-full absolute"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPositionX: `${bgResize.leftright}px`,
                backgroundPositionY: `${bgResize.updown}px`,
                transform: `scale(${bgResize.zoom})`,
              }}
            ></div>
          </div>
        </div>
      </main>
      <div className="type-detail w-72 h-full p-3 border">
        <div className="character-image-upload">
          <p className="title-text"> 캐릭터 업로드 </p>
          <label className="input-file-button" htmlFor="characterfile">
            <p className="button-upload">캐릭터 업로드</p>
          </label>
          <input
            type="file"
            id="characterfile"
            accept="image/*, .gif"
            onChange={uploadCharacter}
            style={{ display: "none" }}
          />
          <p className="title-text">인물 크기 조정</p>
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
          <p className="title-text"> 배경 등록 </p>
          <label className="input-file-button" htmlFor="backgroundfile">
            <p className="button-upload">배경 업로드</p>
          </label>
          <input
            type="file"
            id="backgroundfile"
            accept="image/*, .gif"
            onChange={uploadBackground}
            style={{ display: "none" }}
          />
          <p className="title-text">배경 크기 조정</p>
          <ul>
            <li>
              <p>확대,축소 (0~3)</p>
              <input
                type="number"
                step={0.1}
                className="border"
                value={bgResize.zoom}
                onChange={resizeZoomBg}
              />
            </li>
            <li>
              <p>상,하 (+,-)</p>
              <input
                type="number"
                step={5}
                className="border"
                value={bgResize.updown}
                onChange={resizeUpdownBg}
              />
            </li>
            <li>
              <p>좌,우 (+,-)</p>
              <input
                type="number"
                step={5}
                className="border"
                value={bgResize.leftright}
                onChange={resizeLeftrightBg}
              />
            </li>
          </ul>
        </div>
        <div>
          <p className="title-text">대사 : </p>
          <input
            type="text"
            className="border"
            value={line}
            onChange={changeLine}
          />
          <p className="title-text">캐릭터이름 : </p>
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
