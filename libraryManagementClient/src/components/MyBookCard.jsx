function MyBookCard({ book, onStatusChange, onRatingChange }) {
  const handleStatus = (e) => {
    onStatusChange(book.bookId._id, e.target.value); // ✅ pass status
  };

  const handleRating = (e) => {
    const newRating = parseInt(e.target.value);
    if (newRating >= 1 && newRating <= 5) {
      onRatingChange(book.bookId._id, newRating); // ✅ pass rating
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="font-bold">{book.bookId.title}</h2>
      <p>{book.bookId.author}</p>
      <select value={book.status || ''} onChange={handleStatus} className="mt-2">
        <option value="">Select Status</option>
        <option value="Want to Read">Want to Read</option>
        <option value="Currently Reading">Currently Reading</option>
        <option value="Read">Read</option>
      </select>
      <input
        type="number"
        min="1"
        max="5"
        value={book.rating !== undefined && book.rating !== null ? book.rating : ''}
        onChange={handleRating}
        className="border mt-2 w-16"
        placeholder="Rating"
      />
    </div>
  );
}

export default MyBookCard;
