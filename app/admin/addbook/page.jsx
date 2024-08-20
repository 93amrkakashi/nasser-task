
import React from 'react';
import BookForm from '../Form';
export const metadata = {
  title: "اضافة كتاب جديد",
  description: "صفحة اضافة كتاب جديد للموقع",
}
const AddBook = () => {

  return (
    <div className='w-full bg-white h-screen flex justify-center items-center'>
    <div className="w-[70%] p-6 bg-white shadow-lg border rounded-md">
      <h2 className="text-2xl font-semibold mb-2">إضافة كتاب جديد</h2>
      <BookForm />
    </div>
    </div>
  );
};

export default AddBook;
