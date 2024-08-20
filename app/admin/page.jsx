"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../libs/slices/booksSlice';
import FilterComponent from '../FilterComponent';
import Link from 'next/link';
import Image from 'next/image';

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
                    <div key={book.id} className="border rounded-lg shadow bg-white text-text">
                        <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center">
                            <Image
                            src={book.image}
                            width={150}
                            height={150}
                            />
                        </div>
                        <div className='p-4'>
                            <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">{book.title}</h2>
                            <div className="w-full px-2 flex justify-between items-center">
                                <p className="text-sm text-gray-700 mb-1">{book.author}</p>
                                <p className="text-sm text-gray-700">{book.category}</p>
                            </div>
                            <div className="w-full flex justify-around items-center mt-4">
                                <Link 
                                    href={`/admin/editbook?id=${book.id}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    تعديل
                                </Link>
                                <button 
                                    onClick={() => handleDelete(book.id)} 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
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
