"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './libs/slices/booksSlice';
import FilterComponent from './FilterComponent';

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
    <div className="container mx-auto p-4">
      <FilterComponent books={books} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="border rounded-lg shadow bg-white text-text">
            <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center">
              <span className="text-lg text-gray-900 ">صورة الكتاب</span>
            </div>
            <div className='p-4'>
              <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">{book.title}</h2>
              <div className="w-full px-2 flex justify-between items-center">
                <p className="text-sm text-gray-700 mb-1">{book.author}</p>
                <p className="text-sm text-gray-700">{book.category}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
