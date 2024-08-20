"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent from './FilterComponent';
import BookCard from './BookCard';
import { fetchBooks } from '../libs/slices/booksSlice';

export default function BooksPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleFilter = (filter) => {
    let filtered = books;

    if (filter.author) {
      filtered = filtered.filter((book) => book.author === filter.author);
    }

    if (filter.category) {
      filtered = filtered.filter((book) => book.category === filter.category);
    }

    setFilteredBooks(filtered);
  };

  return (
    <div className="p-4">
      <FilterComponent books={books} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
