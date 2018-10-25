import React, { Component, Fragment } from "react";
import * as BooksAPI from "../../BooksAPI";
import sortBy from "sort-by";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Loading, LoadingMove } from "./styles";
import BookItem from "../BookItem";
import Reading from "../../assets/reading.gif";

export default class BookList extends Component {
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

  shelfs = [
    { name: "Currently Reading", slug: "currentlyReading" },
    { name: "Want to Read", slug: "wantToRead" },
    { name: "Read", slug: "read" }
  ];

  render() {
    const { books, loadingBooks, loadingMove } = this.state;

    return (
      <div>
        {loadingMove && (
          <LoadingMove>
            <figure>
              <img src={Reading} alt="Loading book move" />
            </figure>
          </LoadingMove>
        )}
        <div className="list-books-content">
          {loadingBooks ? (
            <Loading>
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            </Loading>
          ) : (
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
                            .sort(sortBy("title"))
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
          )}
        </div>
      </div>
    );
  }
}
