import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Battle from "./Battle";
import Search from "./Search";
import Popular from "./Popular";
import Nav from "./Nav"

function AppRouter() {
  return (
    <Router>
      <div>
        <Nav></Nav>

        <Route path="/" exact component={Home} />
        <Route path="/popular" component={Popular} />
        <Route path="/search" component={Search} />
        <Route path="/battle" component={Battle} />
      </div>
    </Router>
  );
}

export default AppRouter;
