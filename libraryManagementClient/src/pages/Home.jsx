import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from '../components/BookCard';
import { fetchBooks } from '../store/slices/bookSlice';
import { addMyBook } from '../store/slices/myBookSlice';

function Home() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
console.log(error);
  useEffect(() => {
    
    dispatch(fetchBooks());
  }, []);

  const handleAddToMyBooks = (bookId) => {
    console.log("home add my book bookId",bookId);
    
    if (!user) {
      alert('Please login to add books.');
    } else {
      dispatch(addMyBook(bookId));
    }
  };

  if (loading) return <p className='p-4'>Loading books...</p>;
  if (error) return <p className='p-4 text-red-500'>Error loading books.</p>;
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(books || []).map((book) => (
          <BookCard key={book._id} book={book} onAdd={() => handleAddToMyBooks(book._id)} />
        ))}
      </div>
    </div>
  );
}

export default Home;