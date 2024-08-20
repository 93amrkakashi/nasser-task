
import React from 'react';
import EditBookForm from './Form';
export const metadata = {
  title: "تعديل الكتاب",
  description: "صفحة تعديل بيانات الكتاب",
}
const EditBook = () => {

  return (
    <div className='w-full bg-white h-screen flex justify-center items-center'>
    <div className="w-[70%] p-6 bg-white shadow-lg border rounded-md">
      <h2 className="text-2xl font-semibold mb-2">إضافة كتاب جديد</h2>
      <EditBookForm />
    </div>
    </div>
  );
};

export default EditBook;
