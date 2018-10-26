import React, { Component, Fragment } from "react";
import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";
import BookItem from "../../components/BookItem";

export default class Search extends Component {
  state = {
    searchTerm: "",
    searchResults: [],
    loading: false
  };

  handleTermChange = e => {
    this.setState({ searchTerm: e.target.value, loading: true }, () => {
      if (this.searchTimeout) {
        window.clearTimeout(this.searchTimeout);
      }

      if (this.state.searchTerm.length > 0) {
        this.searchTimeout = setTimeout(() => {
          BooksAPI.search(this.state.searchTerm).then(searchResults => {
            this.setState({ searchResults, loading: false });
            console.log(searchResults);
          });
        }, 700);
      }
    });
  };

  render() {
    const { searchTerm, searchResults, loading } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={searchTerm}
              onChange={e => this.handleTermChange(e)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchTerm.length > 0 &&
              !loading && (
                <Fragment>
                  {searchResults.length > 0 ? (
                    searchResults.map(book => (
                      <BookItem key={book.id} book={book} />
                    ))
                  ) : (
                    <li>
                      No results found for "{searchTerm}
                      ".
                    </li>
                  )}
                </Fragment>
              )}
          </ol>
        </div>
      </div>
    );
  }
}
