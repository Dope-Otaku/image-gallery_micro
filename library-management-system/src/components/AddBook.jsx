import React, { useState } from "react";
import "./css/AddBook.css";

const AddBook = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [publisher, setPublisher] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      numberOfPages: parseInt(numberOfPages),
      publisher,
    };
    onAdd(newBook);
    setTitle("");
    setAuthor("");
    setNumberOfPages("");
    setPublisher("");
    onClose();
  };

  return (
    <div className="add-book-modal">
      <div className="add-book-content">
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPages">Number of Pages</label>
            <input
              type="number"
              id="numberOfPages"
              value={numberOfPages}
              onChange={(e) => setNumberOfPages(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Add Book</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
