import React, { useEffect, useRef } from "react";

export default function Image(props) {
  const handleImageClick = () => {
    props.onImageClick(props.imageSrc);
  };

  const handlePickColor = e => {
    const { target, clientX, clientY } = e;
    pickColor({ target, clientX, clientY });
  };

  const imgEl = useRef(null);
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    if (imgEl.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvasRef.current = canvas;
      contextRef.current = context;

      canvas.height = imgEl.current.naturalHeight;
      canvas.width = imgEl.current.naturalWidth;
      context.clearRect(
        0,
        0,
        imgEl.current.naturalWidth,
        imgEl.current.naturalHeight
      );
      context.drawImage(imgEl.current, 0, 0);
    }
    // eslint-disable-next-line
  }, [imgEl.current]);

  const pickColor = ({ target, clientX, clientY }) => {
    let color = null;
    const rect = target.getBoundingClientRect();
    // FIXME: 정의 찾아보기
    const devicePixelRatio = window.devicePixelRatio;

    color = contextRef.current.getImageData(
      // (clientX - rect.x) * (canvasRef.current.width / rect.width) * devicePixelRatio,
      // (clientY - rect.y) * (canvasRef.current.width / rect.width) * devicePixelRatio,
      (clientX - rect.x) * (canvasRef.current.width / rect.width),
      (clientY - rect.y) * (canvasRef.current.width / rect.width),
      1,
      1
    );
    props.handleMouseX(clientX + 5);
    props.handleMouseY(clientY + 5);
    props.handleColor(color.data);
  };

  return (
    <>
      <img
        className="gallery-img"
        onLoad={props.onLoad}
        ref={imgEl}
        src={`./images/cropped_${props.imageSrc}.jpg`}
        onMouseMove={handlePickColor}
        onClick={handleImageClick}
        alt={props.imageSrc}
      />
    </>
  );
}
