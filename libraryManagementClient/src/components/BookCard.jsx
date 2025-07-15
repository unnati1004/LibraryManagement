import { useSelector, useDispatch } from 'react-redux';
import { addMyBook } from '../store/slices/myBookSlice';

function BookCard({ book }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const handleAdd = async () => {
    if (!user) return alert('Please login to add books.');
    dispatch(addMyBook(book._id));
    addMyBook(book._id)
    alert('Book added!');
  };
  
  return (
    <div className="border p-4 shadow-md rounded flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-32 h-32 object-cover mb-2 sm:mb-0 flex-shrink-0"
      />
      <div className="flex flex-col items-center sm:items-start w-full">
        <h2 className="font-bold text-lg text-center sm:text-left">{book.title}</h2>
        <p className="text-gray-700 text-center sm:text-left">{book.author}</p>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Want to Read
        </button>
      </div>
    </div>
  );
}

export default BookCard;
