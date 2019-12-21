import React from "react";
import Octicon, { X } from "@primer/octicons-react";

import Modal from "./Modal";

const Search = ({search, setSearch, sortBy, setSortBy, where, setWhere, when, setWhen}) => {
  return (
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
              onClick={() => setWhen("all")}
              style={{ color: when === "all" ? "black" : "dimgray" }}
            >
              All
            </li>
            <li
              onClick={() => setWhen("2019")}
              style={{ color: when === "2019" ? "black" : "dimgray" }}
            >
              2019
            </li>
            <li
              onClick={() => setWhen("2018")}
              style={{ color: when === "2018" ? "black" : "dimgray" }}
            >
              2018
            </li>
            <li
              onClick={() => setWhen("2017")}
              style={{ color: when === "2017" ? "black" : "dimgray" }}
            >
              2017
            </li>
            <li
              onClick={() => setWhen("2015")}
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
  );
};

export default Search;
