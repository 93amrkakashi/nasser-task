"use client"

import Image from "next/image"
import { deleteBook } from "../libs/slices/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BookCard ({ book })  {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const pathNAme = usePathname()
    const handleDelete = (id) => {
        if (confirm('هل تريد حقًا حذف هذا الكتاب؟')) {
            dispatch(deleteBook(id));
        }
    };
    const isAdminPage = pathNAme?.startsWith('/admin');
    useEffect(() => {
        console.log(pathNAme)
    }, []);

    return (
        <div key={book?.id} className="border rounded-lg shadow bg-white text-text">
            <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center">
                <Image
                    src={book?.image}
                    width={150}
                    height={150}
                />
            </div>
            <div className='p-4'>
                <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">{book?.title}</h2>
                <div className="w-full px-2 flex justify-between items-center">
                    <p className="text-sm text-gray-700 mb-1">{book?.author}</p>
                    <p className="text-sm text-gray-700">{book?.category}</p>
                </div>
            </div>
            {user && user.role == "admin" && isAdminPage && (
                <div className="w-full flex justify-around items-center p-2">
                    <Link
                        href={`/admin/editbook?id=${book?.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        تعديل
                    </Link>
                    <button
                        onClick={() => handleDelete(book?.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        حذف
                    </button>
                </div>
            )

            }

        </div>
    )
}