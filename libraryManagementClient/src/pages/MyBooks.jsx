import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBookCard from '../components/MyBookCard';
import { fetchMyBooks, updateStatus, updateRating } from '../store/slices/myBookSlice';

function MyBooks() {
  const dispatch = useDispatch();
  const { myBooks, loading, error } = useSelector((state) => state.myBooks);

  useEffect(() => {
    dispatch(fetchMyBooks());
  }, [dispatch]);

  const handleStatusChange = (bookId, status) => {
    dispatch(updateStatus({ bookId, status }));
  };

  const handleRatingChange = (bookId, rating) => {
    dispatch(updateRating({ bookId, rating }));
  };

  if (loading) return <p className="p-4">Loading your books...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading your books.</p>;

  if (!myBooks || myBooks.length === 0) {
    return <p className="p-4 text-gray-500">No books found in your list.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {myBooks.map((b) => (
        <MyBookCard
          key={b.bookId._id}
          book={b}
          onStatusChange={handleStatusChange}
          onRatingChange={handleRatingChange}
        />
      ))}
    </div>
  );
}

export default MyBooks;
