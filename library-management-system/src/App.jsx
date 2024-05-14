import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import OrderList from "./components/OrderList";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddBook, setShowAddBook] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:4545/books");
      setBooks(response.data);
    };

    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:7777/orders");
      setOrders(response.data);
    };

    fetchBooks();
    fetchOrders();
  }, []);

  const addBook = async (newBook) => {
    try {
      await axios.post("http://localhost:4545/book", newBook);
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4545/book/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="app">
      <h1>Library Management System</h1>
      <div className="book-container">
        <h2>Books</h2>
        <button onClick={() => setShowAddBook(true)}>Add Book</button>
        <BookList books={books} onDelete={deleteBook} />
      </div>
      <div className="order-container">
        <h2>Orders</h2>
        <OrderList orders={orders} />
      </div>
      {showAddBook && (
        <AddBook onAdd={addBook} onClose={() => setShowAddBook(false)} />
      )}
    </div>
  );
}

export default App;
