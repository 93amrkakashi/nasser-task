"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchBooks, updateBook } from '../../libs/slices/booksSlice';

const EditBookForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');
  
  // جلب الكتب من الحالة (state)
  const books = useSelector((state) => state.books);
  
  // فلترة الكتاب المطلوب بناءً على الـ ID
  const bookFromState = books.find((book) => book.id === bookId);

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
  });

  // جلب الكتب عند تحميل الصفحة أو عندما يتغير ID الكتاب
  useEffect(() => {
    if (bookId && !bookFromState) {
      dispatch(fetchBooks());
    } else if (bookFromState) {
      setBook(bookFromState);
    }
  }, [bookId, bookFromState, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBook({ id: bookId, ...book }))
      .then(() => {
        router.push('/admin'); 
      })
      .catch((error) => {
        console.error('Failed to update book: ', error);
      });
  };

  const isFormValid = Object.values(book).every(field => field.trim() !== '');

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
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="author">المؤلف</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="category">الفئة</label>
        <input
          type="text"
          id="category"
          name="category"
          value={book.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="description">الوصف</label>
        <textarea
          id="description"
          name="description"
          value={book.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <div className='w-full flex justify-center items-center'>
        <button
          disabled={!isFormValid}
          type="submit"
          className={`w-[40%] mx-auto p-2 rounded-md text-white ${
            isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          تعديل الكتاب
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
