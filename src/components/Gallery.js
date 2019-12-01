import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";

import Image from "./Image";
import Modal from "./Modal";
import "./Gallery.css";

export default function Gallery(props) {
  const [showsModal, setShowsModal] = useState(false);
  const [isScrolling, setScroll] = useState(false);
  const [currentColor, setCurrentColor] = useState([0, 0, 0, 0]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [debouncedScroll] = useDebouncedCallback(() => {
    setScroll(false);
  }, 300);

  const picker = './images/picker.png'
  const images = (() => {
    let num = 1;
    const fileNames = [];
    while (num < 56) {
      const fileName =
        num < 10
          ? `./images/cropped/00${num}_1.jpg`
          : `./images/cropped/0${num}_1.jpg`;
      fileNames.push(fileName);
      num += 1;
    }
    return fileNames;
  })();

  const onImageClick = () => {
    setShowsModal(true);
  };
  const onCloseModal = () => {
    setShowsModal(false);
  };

  const handleColor = ([r, g, b, a]) => {
    setCurrentColor([r, g, b, a]);
  };
  const handleMouseX = x => {
    setMouseX(x);
  };
  const handleMouseY = y => {
    setMouseY(y);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(true);
      debouncedScroll();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(false);
      });
    };
  }, [debouncedScroll]);
  const [r, g, b] = currentColor;
  return (
    <>
      {!isScrolling && (
        <span
          style={{
            background: "#fff",
            position: "fixed",
            top: `${mouseY}px`,
            left: `${mouseX}px`,
            fontSize: "6px"
          }}
        >
          <div>R: {r}</div>
          <div>G: {g}</div>
          <div>B: {b}</div>
        </span>
      )}
      <div className="header">
        <header>darkest color as night</header>
      </div>
      <div className={classNames("scroll", { scrolling: isScrolling })}>
        scroll
      </div>
      <div className="gallery-container" style={{cursor: `url(${picker}),auto`}}>
        {images.map(imageSrc => (
          <Image
            imageSrc={imageSrc}
            onClick={onImageClick}
            key={imageSrc}
            handleColor={handleColor}
            handleMouseX={handleMouseX}
            handleMouseY={handleMouseY}
          />
        ))}
      </div>
      <Modal showsModal={showsModal} onCloseModal={onCloseModal}>
        <p>Modal</p>
        <p>Data</p>
      </Modal>
    </>
  );
}
