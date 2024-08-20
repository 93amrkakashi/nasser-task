"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../assits/libs/slices/booksSlice';
import FilterComponent from '../assits/comps/FilterComponent';
import Link from 'next/link';
import Image from 'next/image';
import BookCard from '../assits/comps/BookCard';

function AdminPage() {
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



    const handleDelete = (id) => {
        if (confirm('هل تريد حقًا حذف هذا الكتاب؟')) {
            dispatch(deleteBook(id));
        }
    };

    return (
        <div className="w-full p-4">
            <FilterComponent books={books} onFilter={handleFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book) => (
                    <BookCard book={book} />
                ))}
            </div>
            <Link
                href={"/admin/addbook"}
                className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-lg p-2 px-4 ">
                اضافة كتاب
            </Link>
        </div>
    );
}

export default AdminPage;
