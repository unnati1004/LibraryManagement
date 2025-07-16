function MyBookCard({ book, onStatusChange, onRatingChange }) {
  const handleStatus = (e) => {
    const newStatus = e.target.value;
    onStatusChange(book.bookId._id, newStatus);
  };

  const handleRating = (e) => {
    const newRating = parseInt(e.target.value);
    if (newRating >= 1 && newRating <= 5) {
      onRatingChange(book.bookId._id, newRating);
    }
  };

  return (
    <div className="bg-white border border-gray-300 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800">{book.bookId.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{book.bookId.author}</p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm text-gray-700 font-medium">Status:</label>
        <select
          value={book.status || ''}
          onChange={handleStatus}
          className="px-3 py-1 border rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-700 font-medium">Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={
            book.rating !== undefined && book.rating !== null
              ? book.rating
              : ''
          }
          onChange={handleRating}
          placeholder="1–5"
          className="w-16 px-2 py-1 border rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </div>
  );
}

export default MyBookCard;
