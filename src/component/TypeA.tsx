import { BaseSyntheticEvent, useState } from "react";
import CanvasItem from "../CanvasItem";
import ImageFrame from "./ImageFrame";

export default function TypeA(props: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  template: string;
}) {
  const { canvasRef, template } = props;
  const [canvasWidth, setCanvasWidth] = useState<number>(1280);
  const [canvasHeight, setCanvasHeight] = useState<number>(1024);
  const [characterSubImage, setCharacterSubImage] = useState<string>("");
  const [characterMainImage, setCharacterMainImage] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [currentTemplate, setcurrentTemplate] = useState<string>(template);
  const [line, setLine] = useState<string>("대사를 입력해주세요");
  const [character, setCharacter] = useState<string>("이름");
  const [eraserFlag, setEraserFlag] = useState<boolean>(false);
  const [optionFlag, setOptionFlag] = useState<OptionFlagType>({
    detail: true,
    template: false,
    other: false,
  });
  const [mainCharacterResize, setMainCharacterResize] = useState<ImageResize>({
    zoom: 1.0,
    updown: 0,
    leftright: 0,
  });
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
  const [theme, setTheme] = useState<string>("basic");
  const [textChoice, setTextChoice] = useState<string[]>([
    "선택지1",
    "선택지2",
  ]);

  const uploadMainCharacter = (event: any) => {
    setCharacterMainImage("");
    if (event.target.files.length > 1) {
      alert("사진은 최대 1개 까지 첨부가능합니다.");
    } else {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setCharacterMainImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadSubCharacter = (event: any) => {
    setCharacterSubImage("");
    if (event.target.files.length > 1) {
      alert("사진은 최대 1개 까지 첨부가능합니다.");
    } else {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setCharacterSubImage(e.target.result);
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
  const resizeZoom = (
    event: BaseSyntheticEvent,
    paramType: string,
    paramValue: string
  ) => {
    if (paramType == "mainCharacter") {
      if (paramValue == "zoom") {
        const num: number = parseFloat(event.target.value);
        setMainCharacterResize((prev) => ({
          ...prev,
          zoom: num,
        }));
      } else if (paramValue == "updown") {
        const num: number = parseInt(event.target.value);
        setMainCharacterResize((prev) => ({
          ...prev,
          updown: num,
        }));
      } else if (paramValue == "leftright") {
        const num: number = parseInt(event.target.value);
        setMainCharacterResize((prev) => ({
          ...prev,
          leftright: num,
        }));
      }
    } else if (paramType == "subCharacter") {
      if (paramValue == "zoom") {
        const num: number = parseFloat(event.target.value);
        setCharacterResize((prev) => ({
          ...prev,
          zoom: num,
        }));
      } else if (paramValue == "updown") {
        const num: number = parseInt(event.target.value);
        setCharacterResize((prev) => ({
          ...prev,
          updown: num,
        }));
      } else if (paramValue == "leftright") {
        const num: number = parseInt(event.target.value);
        setCharacterResize((prev) => ({
          ...prev,
          leftright: num,
        }));
      }
    } else if (paramType == "background") {
      if (paramValue == "zoom") {
        const num: number = parseFloat(event.target.value);
        setBgResize((prev) => ({
          ...prev,
          zoom: num,
        }));
      } else if (paramValue == "updown") {
        const num: number = parseInt(event.target.value);
        setBgResize((prev) => ({
          ...prev,
          updown: num,
        }));
      } else if (paramValue == "leftright") {
        const num: number = parseInt(event.target.value);
        setBgResize((prev) => ({
          ...prev,
          leftright: num,
        }));
      }
    }
  };

  const changeLine = (event: BaseSyntheticEvent) => {
    setLine(event.target.value);
  };
  const eraserButton = () => {
    setEraserFlag(!eraserFlag);
  };
  //선택지 추가 삭제
  const changeChoice = (event: BaseSyntheticEvent, index: number) => {
    textChoice[index] = event.target.value;
    setTextChoice([...textChoice]);
  };
  const deleteChoice = (removeIndex: number) => {
    const updateTextChoice = textChoice.filter(
      (_, index) => index !== removeIndex
    );
    setTextChoice(updateTextChoice);
  };
  const addChoice = () => {
    const updateTextChoice = [
      ...textChoice,
      "선택지" + (textChoice.length + 1),
    ];
    setTextChoice(updateTextChoice);
  };

  const changeOption = (param: string) => {
    if (param == "detail") {
      setOptionFlag({ detail: true, template: false, other: false });
    } else if (param == "template") {
      setOptionFlag({ detail: false, template: true, other: false });
    } else if (param == "other") {
      setOptionFlag({ detail: false, template: false, other: true });
    }
  };
  const changeResolution = (width: number, height: number) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  };
  //테마 변경
  const changeTheme = (param: string) => {
    setTheme(param);
  };

  // 옵션 설정
  const selectOption = () => {
    if (optionFlag.detail) {
      return (
        <div className="detail-conetent">
          {/* 해상도 */}
          <div>
            <p className="title-text">해상도 설정</p>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1200, 800);
              }}
            >
              1200 x 800
            </button>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1280, 720);
              }}
            >
              1280 x 720
            </button>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1280, 960);
              }}
            >
              1280 x 960
            </button>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1280, 1024);
              }}
            >
              1280 x 1024
            </button>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1920, 1080);
              }}
            >
              1920 x 1080
            </button>
            <button
              className="button-stone"
              onClick={() => {
                changeResolution(1920, 1440);
              }}
            >
              1920 x 1440
            </button>
          </div>
          <div className="maincharacter-image-upload">
            <p className="title-text"> 캐릭터 업로드 </p>
            <label className="input-file-button" htmlFor="maincharacterfile">
              <p className="button-upload">캐릭터 업로드</p>
            </label>
            <input
              type="file"
              id="maincharacterfile"
              accept="image/*, .gif"
              onChange={uploadMainCharacter}
              style={{ display: "none" }}
            />
            <p className="title-text">인물 크기 조정</p>
            <ul className="resize-ul">
              <li>
                <p>확대,축소</p>
                <input
                  type="number"
                  step={0.1}
                  className="border"
                  value={mainCharacterResize.zoom}
                  onChange={(e) => {
                    resizeZoom(e, "mainCharacter", "zoom");
                  }}
                />
              </li>
              <li>
                <p>상,하 (0~100%)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={mainCharacterResize.updown}
                  onChange={(e) => {
                    resizeZoom(e, "mainCharacter", "updown");
                  }}
                />
              </li>
              <li>
                <p>좌,우 (+,-)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={mainCharacterResize.leftright}
                  onChange={(e) => {
                    resizeZoom(e, "mainCharacter", "leftright");
                  }}
                />
              </li>
            </ul>
          </div>
          <div className="subcharacter-image-upload">
            <p className="title-text"> 액자 업로드 </p>
            <label className="input-file-button" htmlFor="characterfile">
              <p className="button-upload">액자 업로드</p>
            </label>
            <input
              type="file"
              id="characterfile"
              accept="image/*, .gif"
              onChange={uploadSubCharacter}
              style={{ display: "none" }}
            />
            <p className="title-text">인물 크기 조정</p>
            <ul className="resize-ul">
              <li>
                <p>확대,축소</p>
                <input
                  type="number"
                  step={0.1}
                  className="border"
                  value={characterResize.zoom}
                  onChange={(e) => {
                    resizeZoom(e, "subCharacter", "zoom");
                  }}
                />
              </li>
              <li>
                <p>상,하 (0~100%)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={characterResize.updown}
                  onChange={(e) => {
                    resizeZoom(e, "subCharacter", "updown");
                  }}
                />
              </li>
              <li>
                <p>좌,우 (+,-)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={characterResize.leftright}
                  onChange={(e) => {
                    resizeZoom(e, "subCharacter", "leftright");
                  }}
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
            <ul className="resize-ul">
              <li>
                <p>확대,축소</p>
                <input
                  type="number"
                  step={0.1}
                  className="border"
                  value={bgResize.zoom}
                  onChange={(e) => {
                    resizeZoom(e, "background", "zoom");
                  }}
                />
              </li>
              <li>
                <p>상,하 (0~100%)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={bgResize.updown}
                  onChange={(e) => {
                    resizeZoom(e, "background", "updown");
                  }}
                />
              </li>
              <li>
                <p>좌,우 (+,-)</p>
                <input
                  type="number"
                  step={5}
                  className="border"
                  value={bgResize.leftright}
                  onChange={(e) => {
                    resizeZoom(e, "background", "leftright");
                  }}
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
          <div>
            <p className="title-text">선택지</p>
            {textChoice.map((item, index) => {
              return (
                <div className="flex">
                  <input
                    className="border"
                    value={textChoice[index]}
                    onChange={(e) => changeChoice(e, index)}
                    key={"choice " + index}
                  />
                  <button
                    onClick={() => {
                      deleteChoice(index);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              );
            })}
            <button className="button-stone" onClick={addChoice}>
              추가하기
            </button>
          </div>
          <button onClick={eraserButton}>지우기</button>
        </div>
      );
    } else if (optionFlag.template) {
      return (
        <div>
          <button
            className="button-stone"
            onClick={() => {
              changeTheme("basic");
            }}
          >
            스타듀
          </button>
          <button
            className="button-stone"
            onClick={() => {
              changeTheme("visual-novel");
            }}
          >
            미연시
          </button>
        </div>
      );
    }
  };
  return (
    <section className="main flex justify-center items-center">
      {themeDesign()}

      {/* 설정 */}
      <div className="type-detail w-72 h-full p-3 border">
        <ul className="detail-title mb-3 flex justify-around">
          <li
            className="border p-4"
            onClick={() => {
              changeOption("detail");
            }}
          >
            설정
          </li>
          <li
            className="border p-4"
            onClick={() => {
              changeOption("template");
            }}
          >
            테마
          </li>
          <li
            className="border p-4"
            onClick={() => {
              changeOption("other");
            }}
          >
            기타
          </li>
        </ul>
        {selectOption()}
      </div>
    </section>
  );

  function themeDesign() {
    if (theme == "basic") {
      return (
        <main
          id="capture"
          className="relative bg-slate-100 z-0"
          ref={canvasRef}
          style={{ height: `${canvasHeight}`, width: `${canvasWidth}` }}
        >
          <CanvasItem
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            onChangeType={currentTemplate}
            eraser={eraserFlag}
          ></CanvasItem>

          <div className="absolute w-3/4 mb-4 bottom-0 left-1/2 -translate-x-1/2 -z-10 flex flex-col items-end">
            <div
              className="w-60 border-2 border-amber-800 rounded my-2 text-amber-800 "
              style={{
                background:
                  "linear-gradient(0deg, rgba(239,170,98,1) 0%, rgba(250,196,114,1) 50%, rgba(239,170,98,1) 100%)",
              }}
            >
              {textChoice.map((item, index) => {
                return (
                  <p
                    className="frame-text h-12 text-lg flex flex-col items-start justify-center pl-2 my-1"
                    key={"choice " + index}
                  >
                    {textChoice[index]}
                  </p>
                );
              })}
            </div>

            <div className="w-full flex h-64 relative border-amber-600 border-8 ">
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
                {/* 액자 이미지 */}
                <div
                  className="w-5/6 h-5/6 relative overflow-hidden border-4 border-amber-600"
                  style={{ background: "white" }}
                >
                  <ImageFrame
                    Image={characterSubImage}
                    Resize={characterResize}
                  ></ImageFrame>
                </div>
                {/* 캐릭터 이름 */}
                <p className="frame-text text-2xl pt-2 text-orange-900 h-1/6 flex justify-center items-center">
                  {character}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 w-full h-full -z-30 ">
            {/* 배경 이미지 */}
            <div className="w-full h-full relative overflow-hidden">
              <ImageFrame
                Image={backgroundImage}
                Resize={bgResize}
              ></ImageFrame>
            </div>
          </div>
          <div className="absolute top-0 w-full h-full -z-20 ">
            {/* 캐릭터 이미지 */}
            <div className="w-full h-full relative overflow-hidden">
              <ImageFrame
                Image={characterMainImage}
                Resize={mainCharacterResize}
              ></ImageFrame>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col justify-center items-end">
            <p
              className="frame-text w-36 text-xl text-center text-orange-900 border-4 border-amber-700 rounded"
              style={{
                background:
                  "linear-gradient(0deg, rgba(239,170,98,1) 0%, rgba(250,196,114,1) 50%, rgba(239,170,98,1) 100%)",
              }}
            >
              Sep. 25. 목
            </p>
            <p
              className="frame-text w-36 text-xl text-center text-orange-900 border-4 border-amber-700 rounded"
              style={{
                background:
                  "linear-gradient(0deg, rgba(239,170,98,1) 0%, rgba(250,196,114,1) 50%, rgba(239,170,98,1) 100%)",
              }}
            >
              6:50 오전
            </p>
          </div>
        </main>
      );
    } else if (theme == "visual-novel") {
      return <div>헤헤</div>;
    }
  }
}
