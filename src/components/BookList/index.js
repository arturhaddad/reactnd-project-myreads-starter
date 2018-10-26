import React, { Fragment } from "react";
import sortBy from "sort-by";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./styles";
import BookItem from "../BookItem";

const shelfs = [
  { name: "Currently Reading", slug: "currentlyReading" },
  { name: "Want to Read", slug: "wantToRead" },
  { name: "Read", slug: "read" }
];

const BookList = ({ books, loadingBooks, onShelfChange }) => (
  <div>
    <div className="list-books-content">
      {loadingBooks ? (
        <Loading>
          <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
        </Loading>
      ) : (
        <div>
          {shelfs.map(shelf => (
            <div key={shelf.slug} className="bookshelf">
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
                            onShelfChange={onShelfChange}
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

export default BookList;
