import { useEffect, useRef } from "react";

export default function ImageFrame(props: {
  Image: string;
  Resize: ImageResize;
}) {
  const { Image, Resize } = props;

  return (
    <div
      className="frame-image w-full h-full absolute"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundPositionX: `${Resize.leftright}px`,
        backgroundPositionY: `${Resize.updown}px`,
        transform: `scale(${Resize.zoom})`,
      }}
    ></div>
  );
}
