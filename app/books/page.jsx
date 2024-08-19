"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../slices/booksSlice';

export default function BooksPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {/* هنا يمكنك إضافة الفلاتر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow">
            <h2 className="text-xl">{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
