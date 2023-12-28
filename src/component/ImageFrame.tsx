import { useEffect, useRef } from "react";

export default function ImageFrame(props: {
  Image: string;
  Resize: ImageResize;
}) {
  const { Image, Resize } = props;

  return (
    <div className="frame-image w-full h-full absolute">
      <img
        src={Image}
        alt=""
        style={{
          position: "absolute",
          left: `${Resize.leftright}%`,
          top: `${Resize.updown}%`,
          transform: `scale(${Resize.zoom}) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
