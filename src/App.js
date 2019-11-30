import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Intro from "./components/Intro";
import Gallery from "./components/Gallery";

import "./App.css";

function App() {
  return (
    <Router>
    <div className="container">
      <Switch>
        <Route path="/intro" component={Intro} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/gallery/:id" component={Gallery} />
        <Route path="/" component={Intro} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
