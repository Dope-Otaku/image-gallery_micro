import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./css/BookList.css";

const BookList = ({ books, onDelete }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book._id} className="book-item">
          <div className="book-details">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.numberOfPages}</p>
            <p>Publisher: {book.publisher}</p>
          </div>
          <button className="delete-button" onClick={() => onDelete(book._id)}>
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
