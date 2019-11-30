import React, { useState } from "react";

import Modal from "./Modal";
import "./Gallery.css";

export default function Gallery() {
  const images = (() => {
    let num = 1;
    const fileNames = [];
    while (num < 56) {
      const fileName =
        num < 10 ? `./images/00${num}.jpeg` : `./images/0${num}.jpeg`;
      fileNames.push(fileName);
      num += 1;
    }
    return fileNames;
  })();
  return (
    <>
    <div className="header">
    <header>darkest color as night</header>
    </div>
      <div className="gallery-container">
        {images.map(imageSrc => (
          <img src={imageSrc} alt={imageSrc} />
        ))}
      </div>
    </>
  );
}
