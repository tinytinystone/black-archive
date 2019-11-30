import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

export default function Intro(props) {
  return (
    <div className="intro-container">
      <div className="intro">
        <strong className="start">
          <Link to="/gallery">Black</Link>
        </strong>{" "}
        is the darkest color, the result of the absence or complete absorption
        of visible light. It is an achromatic color, a color without hue, like
        white and gray. It is often used symbolically or figuratively to
        represent darkness, while white represents light.
      </div>
    </div>
  );
}
