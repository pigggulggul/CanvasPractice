import { BaseSyntheticEvent } from "react";

export const resizeImage = (
  event: BaseSyntheticEvent,
  state: React.Dispatch<React.SetStateAction<ImageResize>>,
  paramValue: string
) => {
  if (paramValue == "zoom") {
    const num: number = parseFloat(event.target.value);
    state((prev) => ({
      ...prev,
      zoom: num,
    }));
  } else if (paramValue == "updown") {
    const num: number = parseInt(event.target.value);
    state((prev) => ({
      ...prev,
      updown: num,
    }));
  } else if (paramValue == "leftright") {
    const num: number = parseInt(event.target.value);
    state((prev) => ({
      ...prev,
      leftright: num,
    }));
  }
};
