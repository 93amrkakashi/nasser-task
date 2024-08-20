import React, { useState } from 'react';

export default function FilterComponent({ books, onFilter }) {
  const [filterType, setFilterType] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const authors = [...new Set(books.map((book) => book.author))];
  const categories = [...new Set(books.map((book) => book.category))];

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSelectedValue(''); 
  };

  const handleValueChange = (e) => {
    setSelectedValue(e.target.value);
    onFilter({ [filterType]: e.target.value }); 
  };

  const handleReset = () => {
    setFilterType('');
    setSelectedValue('');
    onFilter({}); 
  };

  return (
    <div className="mb-4 flex justify-start items-center gap-4">
      <div className="">
        <label className="mr-2">اختر نوع الفلتر{" "}:{" "}</label> 
        <select value={filterType} onChange={handleFilterTypeChange} className="px-4 border rounded">
          <option value="">اختر نوع الفلتر</option>
          <option value="author">المؤلف</option>
          <option value="category">الفئة</option>
        </select>
      </div>

      <div>
        <label className="mr-2">
          {filterType === 'author' ? 'اختر المؤلف : ' : 'اختر الفئة : '}
        </label>
        <select
          value={selectedValue}
          onChange={handleValueChange}
          className="px-4 border rounded"
          disabled={!filterType} 
        >
          <option value="">اختر {filterType === 'author' ? 'المؤلف' : 'الفئة'}</option>
          {filterType === 'author' &&
            authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          {filterType === 'category' &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <button 
        onClick={handleReset} 
        className="p-2 bg-secondary text-white rounded"
      >
        إلغاء الفلترة
      </button>
    </div>
  );
}
