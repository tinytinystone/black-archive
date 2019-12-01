import React, { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Image(props) {
  const [debouncedPickColor] = useDebouncedCallback(({ target, clientX, clientY }) => {    
    pickColor({ target, clientX, clientY });
  }, 200);

  const handlePickColor = (e) => {
    const { target, clientX, clientY } = e;
    debouncedPickColor({ target, clientX, clientY });
  };

  const imgEl = useRef(null);
  const pickColor = ({ target, clientX, clientY }) => {
    const canvas = document.createElement("canvas");
    let color = null;
    const context = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio;
    const image = imgEl.current;
    const rect = target.getBoundingClientRect();

    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;

    context.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
    context.drawImage(image, 0, 0);

    color = context.getImageData(
      (clientX - rect.x) * (canvas.width / rect.width) * devicePixelRatio,
      (clientY - rect.y) * (canvas.width / rect.width) * devicePixelRatio,
      1,
      1
    );
    props.handleMouseX(clientX+5);
    props.handleMouseY(clientY+33);
    props.handleColor(color.data);
  };
  // useEffect(() => {
  //   debouncedPickColor()
  // }, [debouncedPickColor]);

  return (
    <>
      <img
        ref={imgEl}
        src={props.imageSrc}
        onMouseMove={handlePickColor}
      />
    </>
  );
}
