import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Main from "./pages/Main";
import Search from "./pages/Search";

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={Main} />
    <Route exact path="/search" component={Search} />
  </div>
);

export default BooksApp;
