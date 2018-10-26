import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";
import BookItem from "../../components/BookItem";

export default class Search extends Component {
  state = {
    searchTerm: "",
    searchResults: []
  };

  handleTermChange = e => {
    this.setState({ searchTerm: e.target.value }, () => {
      if (this.searchTimeout) {
        window.clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        BooksAPI.search(this.state.searchTerm).then(searchResults => {
          this.setState({ searchResults });
          console.log(searchResults);
        });
      }, 700);
    });
  };

  render() {
    const { searchTerm, searchResults } = this.state;

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
            {searchResults.length > 0 &&
              searchResults.map(book => <BookItem key={book.id} book={book} />)}
          </ol>
        </div>
      </div>
    );
  }
}
