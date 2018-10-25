import React from "react";

const BookItem = ({ book, onShelfChange }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
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
      <div className="book-authors">{book.authors.join(", ")}</div>
    </div>
  </li>
);

export default BookItem;
