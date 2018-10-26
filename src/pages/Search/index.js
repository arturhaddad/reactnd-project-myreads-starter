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
    const { books } = this.props;

    this.setState({ searchTerm: e.target.value, loading: true }, () => {
      console.log(this.state.searchTerm);
      if (this.searchTimeout) {
        window.clearTimeout(this.searchTimeout);
        console.log("timeout apagado");
      }

      if (this.state.searchTerm.length > 0) {
        this.searchTimeout = setTimeout(() => {
          BooksAPI.search(this.state.searchTerm).then(searchResults => {
            if (searchResults.length > 0) {
              const formatedResults = searchResults.map(book => ({
                ...book,
                shelf: books.find(b => b.id === book.id)
                  ? books.find(b => b.id === book.id).shelf
                  : "none"
              }));
              this.setState({ searchResults: formatedResults });
            } else {
              this.setState({ searchResults });
            }
            this.setState({ loading: false });
          });
        }, 700);
      }
    });
  };

  render() {
    const { searchTerm, searchResults, loading } = this.state;
    const { onShelfChange } = this.props;

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
                      <BookItem
                        key={book.id}
                        book={book}
                        onShelfChange={onShelfChange}
                      />
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
