import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import { Link } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Search from "./pages/Search";

export default class BooksApp extends Component {
  state = {
    books: [],
    loadingBooks: true,
    loadingMove: false
  };

  loadBooks = () => {
    BooksAPI.getAll().then(books =>
      this.setState({ books, loadingBooks: false })
    );
  };

  handleShelfChange = (book, shelf) => {
    this.setState({ loadingMove: true });
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book),
        loadingMove: false
      }));
    });
  };

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    const { books, loadingBooks, loadingMove } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <Header />
              <BookList
                books={books}
                loadingBooks={loadingBooks}
                loadingMove={loadingMove}
                onShelfChange={this.handleShelfChange}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={books}
              loadingMove={loadingMove}
              onShelfChange={this.handleShelfChange}
            />
          )}
        />
      </div>
    );
  }
}
