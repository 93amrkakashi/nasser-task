"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { addBook, updateBook, fetchBooks } from '../assits/libs/slices/booksSlice';

const BookForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');

  const books = useSelector((state) => state.books);
  const bookFromState = books.find((book) => book.id === bookId);

  const [book, setBook] = useState({
    id:Date.now(),
    title: '',
    author: '',
    category: '',
    description: '',
    image: "https://st-takla.org/Gallery/var/albums/Books/General-and-Writing/www-St-Takla-org--Books-01.gif?m=1419425451",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookId && !bookFromState) {
      dispatch(fetchBooks());
    } else if (bookFromState) {
      setBook(bookFromState);
    }
  }, [bookId, bookFromState, dispatch]);

  const validate = () => {
    const errors = {};
    if (!book.title.trim()) errors.title = 'عنوان الكتاب مطلوب';
    if (!book.author.trim()) errors.author = 'المؤلف مطلوب';
    if (!book.category.trim()) errors.category = 'الفئة مطلوبة';
    if (!book.description.trim()) errors.description = 'الوصف مطلوب';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const action = bookId ? updateBook : addBook;
    dispatch(action({ id: bookId, ...book }))
      .then(() => {
        router.push('/admin');
      })
      .catch((error) => {
        console.error('Failed to submit book: ', error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="title">عنوان الكتاب</label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${errors.title ? 'border-red-500' : ''}`}
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="author">المؤلف</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${errors.author ? 'border-red-500' : ''}`}
          required
        />
        {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="category">الفئة</label>
        <input
          type="text"
          id="category"
          name="category"
          value={book.category}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${errors.category ? 'border-red-500' : ''}`}
          required
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="description">الوصف</label>
        <textarea
          id="description"
          name="description"
          value={book.description}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${errors.description ? 'border-red-500' : ''}`}
          required
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      <div className='w-full flex justify-center items-center'>
        <button
          type="submit"
          className={`w-[40%] mx-auto p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
        >
          {bookId ? 'تعديل الكتاب' : 'إضافة الكتاب'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
