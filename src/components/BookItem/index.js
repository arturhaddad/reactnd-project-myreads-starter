import React from "react";
import Default from "../../assets/default-book.png";
import { Book } from "./styles";

const BookItem = ({ book, onShelfChange }) => (
  <Book>
    <div className="book">
      <div className="book-top">
        <div
          className={`book-cover empty-thumbnail-${!book.imageLinks}`}
          style={{
            backgroundImage: `url(${
              book.imageLinks ? book.imageLinks.thumbnail : Default
            })`
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={book.shelf ? book.shelf : "none"}
            onChange={e => onShelfChange(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">{book.authors.join(", ")}</div>
      )}
    </div>
  </Book>
);

export default BookItem;
