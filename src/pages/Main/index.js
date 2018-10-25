import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BookList from "../../components/BookList";

const Main = () => (
  <div className="list-books">
    <Header />
    <BookList />
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default Main;
