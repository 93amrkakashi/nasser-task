"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addBook,
  updateBook,
  fetchBooks,
} from "../assits/libs/slices/booksSlice";
import { validateBookInputs } from "../assits/validation";

const BookForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  const books = useSelector((state) => state.books);
  const bookFromState = useMemo(
    () => books.find((book) => book.id === bookId),
    [books, bookId]
  );

  const [book, setBook] = useState({
    id: `${Date.now()}`,
    title: "",
    author: "",
    category: "",
    description: "",
    image:
      "https://st-takla.org/Gallery/var/albums/Books/General-and-Writing/www-St-Takla-org--Books-01.gif?m=1419425451",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookId && !bookFromState) {
      dispatch(fetchBooks());
    } else if (bookFromState) {
      setBook(bookFromState);
    }
  }, [bookId, bookFromState, dispatch]);

  const validate = useCallback(() => {
    const validationRules = {
      title: { required: true, minLength: 3, message: "عنوان الكتاب مطلوب" },
      author: { required: true, minLength: 3, message: "اسم المؤلف مطلوب" },
      category: { required: true, minLength: 3, message: "فئة الكتاب مطلوبة" },
      description: {
        required: true,
        minLength: 3,
        message: "وصف الكتاب مطلوب",
      },
    };

    const errors = validateBookInputs(book, validationRules);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [book]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) {
        return;
      }

      const action = bookId ? updateBook : addBook;
      dispatch(action({ id: bookId, ...book }))
        .then(() => {
          router.push("/admin");
        })
        .catch((error) => {
          console.error("Failed to submit book: ", error);
        });
    },
    [bookId, book, dispatch, router, validate]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          عنوان الكتاب
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${
            errors.title ? "border-red-500" : ""
          }`}
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="author">
          المؤلف
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${
            errors.author ? "border-red-500" : ""
          }`}
          required
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author}</p>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="category">
          الفئة
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={book.category}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${
            errors.category ? "border-red-500" : ""
          }`}
          required
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          الوصف
        </label>
        <textarea
          id="description"
          name="description"
          value={book.description}
          onChange={handleChange}
          className={`w-full p-2 border border-gray-300 rounded-md ${
            errors.description ? "border-red-500" : ""
          }`}
          required
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          className={`w-[40%] mx-auto p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
        >
          {bookId ? "تعديل الكتاب" : "إضافة الكتاب"}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
