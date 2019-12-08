import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import { imageList, imageTagByLocation, imageTagByTime } from "../data/imageList";

import Image from "./Image";
import Modal from "./Modal";
import "./Gallery.css";

const picker = "./images/picker.png";
const images = (() => {
  let num = 1;
  const fileNames = [];
  while (num < 56) {
    const fileName = num < 10 ? `00${num}` : `0${num}`;
    fileNames.push(fileName);
    num += 1;
  }
  return fileNames;
})();

const promiseAndResolveList = images.map(() => {
  let resolve
  const promise = new Promise(r => {
    resolve = r
  })
  return { promise, resolve }
})

export default function Gallery(props) {
  const [showsModal, setShowsModal] = useState(false);
  const [isScrolling, setScroll] = useState(false);
  const [currentColor, setCurrentColor] = useState([0, 0, 0, 0]);
  const [imageSrc, setImageSrc] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [withBox, setWithBox] = useState(false);
  const [loading, setLoading] = useState(true)
  const [debouncedScroll] = useDebouncedCallback(() => {
    setScroll(false);
  }, 300);



  const handleImageChange = () => {
    setWithBox(true);
  };
  const handleImageOut = () => {
    setWithBox(false);
  };

  const onImageClick = src => {
    setShowsModal(true);
    setImageSrc(src);
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

  useEffect(() => {
    Promise.all(promiseAndResolveList.map(item => item.promise))
      .then(() => {
        setLoading(false)
      })
  }, [])
  const [r, g, b] = currentColor;
  return (
    <>
      <div style={{ display: loading ? 'block' : 'none' }}>로딩중</div>
      <div style={{ display: loading ? 'none' : 'block' }}>
        {!isScrolling && !showsModal && (
          <span
            style={{
              background: "#fff",
              position: "fixed",
              top: `${mouseY}px`,
              left: `${mouseX}px`,
              fontSize: "1rem"
            }}
          >
            <div>R: {r}</div>
            <div>G: {g}</div>
            <div>B: {b}</div>
          </span>
        )}
        <div className="header">
          <header>darkest color as night</header>
          <span>Tag</span>
        </div>
        <div className={classNames("scroll", { scrolling: isScrolling })} />
        <div
          className="gallery-container"
          style={{ cursor: `url(${picker}),auto` }}
        >
          {images.map((imageSrc, imageIndex) => (
            <Image
              imageSrc={imageSrc}
              key={imageSrc}
              onImageClick={onImageClick}
              onLoad={promiseAndResolveList[imageIndex].resolve}
              handleColor={handleColor}
              handleMouseX={handleMouseX}
              handleMouseY={handleMouseY}
            />
          ))}
        </div>
        <Modal showsModal={showsModal} onCloseModal={onCloseModal}>
          <span onMouseOver={handleImageChange} onMouseOut={handleImageOut}>
            <img
              src={
                withBox
                  ? `./images/box_added/${imageSrc}_2.jpg`
                  : `./images/overall/${imageSrc}.jpg`
              }
            />
          </span>
          <p>{imageSrc && imageList[imageSrc].when}</p>
          <p>{imageSrc && imageList[imageSrc].where}</p>
        </Modal>
      </div>
    </>
  );
}
