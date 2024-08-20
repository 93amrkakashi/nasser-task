"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addBook } from '../libs/slices/booksSlice';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(book))
      .then(() => {
        router.push('/'); 
      })
      .catch((error) => {
        console.error('Failed to add book: ', error);
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
          إضافة الكتاب
        </button>
        </div>
      </form>
  );
};

export default AddBookForm;
