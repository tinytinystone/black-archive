import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import { imageList } from "../data/imageList";
import { Link } from "react-router-dom";

import Image from "./Image";
import Modal from "./Modal";
import "./Gallery.css";
import Octicon, { X } from "@primer/octicons-react";

const images = Object.keys(imageList);

const promiseAndResolveList = images.map(() => {
  let resolve;
  const promise = new Promise(r => {
    resolve = r;
  });
  return { promise, resolve };
});

export default function Gallery(props) {
  const [showsModal, setShowsModal] = useState(false);
  const [isScrolling, setScroll] = useState(false);
  const [currentColor, setCurrentColor] = useState([0, 0, 0, 0]);
  const [imageSrc, setImageSrc] = useState("");
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
        if (imageList[a].when > imageList[b].when) {
          return 1;
        }
        if (imageList[a].when < imageList[b].when) {
          return -1;
        }
        return 0;
      } else {
        return parseInt(a) - parseInt(b);
      }
    })
    .filter(i => {
      const byWhen = when === "all" || imageList[i].when.includes(when);
      let byWhere =
        where === "all" ||
        (where === "KoreaWithOthers"
          ? imageList[i].where.includes("Korea") &&
            !imageList[i].where.includes("Seoul")
          : imageList[i].where.includes(where));
      return byWhen && byWhere;
    });

  const handleTabWhen = when => {
    setWhen(when);
  };

  const onSearchClick = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  const handleMouseLeave = () => {
    setMouseLeave(true);
  };

  const handleMouseOver = () => {
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
      <div className="header" style={{ position: "relative" }}>
        <header>darkest color as night</header>
        <Link to="/">
          <div
            style={{
              position: "absolute",
              top: "17px",
              left: "2px",
              cursor: "pointer"
            }}
          >
            <img src="./images/home.png" alt="home icon" className="icon" />
          </div>
        </Link>
        <div
          style={{
            position: "absolute",
            top: "17px",
            right: "2px",
            cursor: "pointer"
          }}
          onClick={onSearchClick}
        >
          <img src="./images/sort.png" alt="home icon" className="icon" />
        </div>
      </div>
      <div className="loading" style={{ display: loading ? "block" : "none" }}>
        <img src="./images/loading.gif" alt="loading" className="icon" />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <Modal showsModal={search}>
          <div className="tab-toggle">
            <div onClick={() => setSearch(false)} className="close">
              <Octicon icon={X} />
            </div>
            <div className="tab-item">
              <h3>Sort by</h3>
              <ul>
                <li
                  onClick={() => setSortBy("dates")}
                  style={{ color: sortBy === "dates" ? "black" : "dimgray" }}
                >
                  Dates
                </li>
                <li
                  onClick={() => setSortBy("names")}
                  style={{ color: sortBy === "names" ? "black" : "dimgray" }}
                >
                  Default
                </li>
              </ul>
            </div>
            <div className="tab-item">
              <h3>When</h3>
              <ul>
                <li
                  onClick={() => handleTabWhen("all")}
                  style={{ color: when === "all" ? "black" : "dimgray" }}
                >
                  All
                </li>
                <li
                  onClick={() => handleTabWhen("2019")}
                  style={{ color: when === "2019" ? "black" : "dimgray" }}
                >
                  2019
                </li>
                <li
                  onClick={() => handleTabWhen("2018")}
                  style={{ color: when === "2018" ? "black" : "dimgray" }}
                >
                  2018
                </li>
                <li
                  onClick={() => handleTabWhen("2017")}
                  style={{ color: when === "2017" ? "black" : "dimgray" }}
                >
                  2017
                </li>
                <li
                  onClick={() => handleTabWhen("2015")}
                  style={{ color: when === "2015" ? "black" : "dimgray" }}
                >
                  2015
                </li>
              </ul>
            </div>
            <div className="tab-item">
              <h3>Where</h3>
              <ul>
                <li
                  onClick={() => setWhere("all")}
                  style={{ color: where === "all" ? "black" : "dimgray" }}
                >
                  All
                </li>
                <li
                  onClick={() => setWhere("Seoul")}
                  style={{ color: where === "Seoul" ? "black" : "dimgray" }}
                >
                  Korea(Seoul)
                </li>
                <li
                  onClick={() => setWhere("KoreaWithOthers")}
                  style={{
                    color: where === "KoreaWithOthers" ? "black" : "dimgray"
                  }}
                >
                  Korea(others)
                </li>
                <li
                  onClick={() => setWhere("Italy")}
                  style={{ color: where === "Italy" ? "black" : "dimgray" }}
                >
                  Italy
                </li>
                <li
                  onClick={() => setWhere("Switzerland")}
                  style={{
                    color: where === "Switzerland" ? "black" : "dimgray"
                  }}
                >
                  Switzerland
                </li>
                <li
                  onClick={() => setWhere("Japan")}
                  style={{ color: where === "Japan" ? "black" : "dimgray" }}
                >
                  Japan
                </li>
              </ul>
            </div>
          </div>
        </Modal>
        {!isScrolling && !showsModal && !!mouseX && !!mouseY && !mouseLeave && (
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
        <div className={classNames("scroll", { scrolling: isScrolling })} />
        <div
          className="gallery-container"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {filterImages.map((imageSrc, imageIndex) => (
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
                style={{ maxWidth: "650px" }}
                src={
                  withBox
                    ? `./images/box_added/${imageSrc}_2.jpg`
                    : `./images/overall/${imageSrc}.jpg`
                }
                alt={imageSrc}
              />
            </div>
            <div className="modal-desc">
              <p>
                {imageSrc &&
                  moment(imageList[imageSrc].when).format(
                    "YYYY. MM. DD. hh:mm a"
                  )}
              </p>
              <p>{imageSrc && imageList[imageSrc].where}</p>
            </div>
          </div>
        </Modal>
      </div>
      {filterImages.map((imageSrc, imageIndex) => (
        <div className="hidden" key={imageSrc + imageIndex}>
          <img src={`./images/box_added/${imageSrc}_2.jpg`} alt={imageSrc} />
          <img src={`./images/overall/${imageSrc}.jpg`} alt="imageSrc" />
        </div>
      ))}
    </>
  );
}
