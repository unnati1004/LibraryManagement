import React from 'react';
import axios from 'axios';

function MyBookCard({ book, refresh }) {

  const handleStatusChange = async (e) => {
    await axios.patch(`http://localhost:5000/api/mybooks/${book.bookId._id}/status`, { status: e.target.value });
    refresh();
  };

  const handleRatingChange = async (e) => {
    await axios.patch(`http://localhost:5000/api/mybooks/${book.bookId._id}/rating`, { rating: Number(e.target.value) });
    refresh();
  };

  return (
    <div className='border p-4 rounded shadow-md'>
      <h2 className='font-bold'>{book.bookId.title}</h2>
      <p>{book.bookId.author}</p>
      <select value={book.status || ''} onChange={handleStatusChange} className='mt-2'>
        <option value="Want to Read">Want to Read</option>
        <option value="Currently Reading">Currently Reading</option>
        <option value="Read">Read</option>
      </select>
      <input
        type='number'
        min='1'
        max='5'
        value={book.rating !== undefined && book.rating !== null ? book.rating : ''}
        onChange={handleRatingChange}
        className='border mt-2 w-16'
        placeholder='Rating'
      />
    </div>
  );
}

export default MyBookCard;
