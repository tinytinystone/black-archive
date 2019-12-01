import React, { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Image(props) {
  const [debouncedPickColor] = useDebouncedCallback(({ target, clientX, clientY }) => {    
    pickColor({ target, clientX, clientY });
  }, 30);

  const handleImageClick = () => {
    props.onImageClick(props.imageSrc)
  }

  const handlePickColor = (e) => {
    const { target, clientX, clientY } = e;
    debouncedPickColor({ target, clientX, clientY });
  };

  const imgEl = useRef(null);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const devicePixelRatio = window.devicePixelRatio;

  const pickColor = ({ target, clientX, clientY }) => {
    let color = null;
    const rect = target.getBoundingClientRect();

    const image = imgEl.current;
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
        src={`./images/cropped/${props.imageSrc}_1.jpg`}
        onMouseMove={handlePickColor}
        onClick={handleImageClick}
      />
    </>
  );
}
