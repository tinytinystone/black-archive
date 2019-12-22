import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import imageList from "../data/imageList.json";
import { Link } from "react-router-dom";

import Image from "./Image";
import Modal from "./Modal";
import "./Gallery.css";
import Octicon, { X } from "@primer/octicons-react";
import SortModal from "./SortModal";

const images = imageList.comments;

const promiseAndResolveList = images.map(() => {
  let resolve;
  const promise = new Promise(r => {
    resolve = r;
  });
  return { promise, resolve };
});

const ImageModal = ({
  showsModal,
  onCloseModal,
  handleImageOut,
  handleImageChange,
  withBox,
  imageSrc
}) => {
  return (
    <Modal showsModal={showsModal} onCloseModal={onCloseModal}>
      <div onClick={onCloseModal} className="close">
        <Octicon icon={X} />
      </div>
      <div className="modal-container">
        <div
          onMouseOver={handleImageChange}
          onMouseOut={handleImageOut}
          className="modal-image"
        >
          <img
            className="modal-image-img"
            src={
              withBox
                ? `./images/box_added_${imageSrc}.jpg`
                : `./images/${imageSrc}.jpg`
            }
            alt={imageSrc}
          />
        </div>
        <div className="modal-desc">
          <p>
            {imageSrc &&
              moment(images[parseInt(imageSrc - 1)].when).format(
                "YYYY. MM. DD. hh:mm a"
              )}
          </p>
          <p>{imageSrc && images[parseInt(imageSrc - 1)].where}</p>
        </div>
      </div>
    </Modal>
  );
};

export default function Gallery(props) {
  const [showsModal, setShowsModal] = useState(false);
  const [isScrolling, setScroll] = useState(false);
  const [currentColor, setCurrentColor] = useState([0, 0, 0, 0]);
  const [imageSrc, setImageSrc] = useState("");
  const [mouseOnImageSrc, setmouseOnImageSrc] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [withBox, setWithBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(false);
  const [when, setWhen] = useState("all");
  const [where, setWhere] = useState("all");
  const [sortBy, setSortBy] = useState("names");
  const [debouncedScroll] = useDebouncedCallback(() => {
    setScroll(false);
  }, 300);

  const filterImages = images
    .sort((a, b) => {
      if (sortBy === "dates") {
        if (a.when > b.when) {
          return 1;
        }
        if (a.when < b.when) {
          return -1;
        }
        return 0;
      } else {
        return parseInt(a.key) - parseInt(b.key);
      }
    })
    .filter(i => {
      const byWhen = when === "all" || i.when.includes(when);
      let byWhere =
        where === "all" ||
        (where === "KoreaWithOthers"
          ? i.where.includes("Korea") && !i.where.includes("Seoul")
          : i.where.includes(where));
      return byWhen && byWhere;
    });

  const handleMouseLeave = () => {
    setMouseLeave(true);
  };

  const handleMouseOver = (key) => {
    setmouseOnImageSrc(key)
    setMouseLeave(false);
  };

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

  console.log(mouseLeave)

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
    Promise.all(promiseAndResolveList.map(item => item.promise)).then(() => {
      setLoading(false);
    });
  }, []);

  const [r, g, b] = currentColor;

  return (
    <>
      <div className="header">
        <header>darkest color as night</header>
        <Link to="/">
          <div className="image-container">
            <img src="./icon/home.png" alt="home icon" className="icon" />
          </div>
        </Link>
        <div className="search-icon" onClick={() => setSearch(true)}>
          <img src="./icon/sort.png" alt="home icon" className="icon" />
        </div>
      </div>
      <div className="loading" style={{ display: loading ? "block" : "none" }}>
        <img src="./icon/loading.gif" alt="loading" className="icon" />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <SortModal
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          where={where}
          setWhere={setWhere}
          when={when}
          setWhen={setWhen}
        />
        {!isScrolling && !showsModal && !!mouseX && !!mouseY && !mouseLeave && (
          <span
            className="mouse-with-color"
            style={{
              top: `${mouseY}px`,
              left: `${mouseX}px`,
              display: !mouseLeave ? "block" : "none"
            }}
          >
            <div>R: {r}</div>
            <div>G: {g}</div>
            <div>B: {b}</div>
          </span>
        )}
        <div className={classNames("scroll", { scrolling: isScrolling })} />
        <div
          className="gallery-container"
          // onMouseOver={handleMouseOver}
          // onMouseLeave={handleMouseLeave}
        >
          {filterImages.map((image, index) => (
            <Image
              imageSrc={image.key}
              key={image.key}
              onImageClick={onImageClick}
              onMouseOver={() => handleMouseOver(image.key)}
              onMouseLeave={handleMouseLeave}
              onLoad={promiseAndResolveList[index].resolve}
              handleColor={handleColor}
              handleMouseX={handleMouseX}
              handleMouseY={handleMouseY}
            />
          ))}
        </div>
        <ImageModal
          showsModal={showsModal}
          onCloseModal={onCloseModal}
          handleImageOut={handleImageOut}
          handleImageChange={handleImageChange}
          withBox={withBox}
          imageSrc={imageSrc}
        />
      </div>
        <div className="hidden">
          <img src={`./images/box_added_${mouseOnImageSrc}.jpg`} alt={mouseOnImageSrc} />
          <img src={`./images/${mouseOnImageSrc}.jpg`} alt={mouseOnImageSrc} />
        </div>
    </>
  );
}
