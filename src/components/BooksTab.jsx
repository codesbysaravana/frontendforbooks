import React, { useState, useEffect } from 'react';
import "./BooksTab.css";
import { getAllBooks, createBook, updateBook, deleteBook } from '../services/api';

const BooksTab = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ bookName: '', author: '', publishedYear: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editBook, setEditBook] = useState({ bookName: '', author: '', publishedYear: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newBook.bookName || !newBook.author || !newBook.publishedYear) return;

    try {
      const addedBook = await createBook(newBook);
      setBooks([addedBook, ...books]);
      setNewBook({ bookName: '', author: '', publishedYear: '' });
    } catch (err) {
      setError('Failed to add book');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const book = books[index];
    setEditBook({
      bookName: book.bookName,
      author: book.author,
      publishedYear: book.publishedYear
    });
  };

  const handleSave = async (index) => {
    try {
      const book = books[index];
      const updatedBook = await updateBook(book._id, editBook);
      const updatedBooks = [...books];
      updatedBooks[index] = updatedBook;
      setBooks(updatedBooks);
      setEditIndex(null);
    } catch (err) {
      setError('Failed to update book');
    }
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="books-container">
        <div className="loading">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="books-container">
      <div className="books-content">
        <h1>Books Collection</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="add-form">
          <input
            type="text"
            placeholder="Book Name"
            name="bookName"
            value={newBook.bookName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Published Year"
            name="publishedYear"
            value={newBook.publishedYear}
            onChange={handleInputChange}
          />
          <button onClick={handleAdd}>Add Book</button>
        </div>

        <table className="books-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Published Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        name="bookName"
                        value={editBook.bookName}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="author"
                        value={editBook.author}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="publishedYear"
                        value={editBook.publishedYear}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.publishedYear}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTab;
