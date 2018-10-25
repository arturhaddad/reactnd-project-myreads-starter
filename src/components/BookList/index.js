import React, { Component, Fragment } from "react";
import * as BooksAPI from "../../BooksAPI";
import BookItem from "../BookItem";

export default class BookList extends Component {
  state = {
    books: []
  };

  loadBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }));
    });
  };

  componentDidMount() {
    this.loadBooks();
  }

  shelfs = [
    { name: "Currently Reading", slug: "currentlyReading" },
    { name: "Want to Read", slug: "wantToRead" },
    { name: "Read", slug: "read" }
  ];

  render() {
    const { books } = this.state;

    return (
      <div className="list-books-content">
        <div>
          {this.shelfs.map(shelf => (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf.name}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === shelf.slug).length >
                  0 ? (
                    <Fragment>
                      {books
                        .filter(book => book.shelf === shelf.slug)
                        .map(book => (
                          <BookItem
                            key={book.id}
                            book={book}
                            onShelfChange={this.handleShelfChange}
                          />
                        ))}
                    </Fragment>
                  ) : (
                    <li>This shelf is empty.</li>
                  )}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
