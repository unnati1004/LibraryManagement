import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch user's saved books
export const fetchMyBooks = createAsyncThunk('myBooks/fetchMyBooks', async () => {
  const res = await axios.get('http://localhost:5000/api/mybooks');
  return res.data;
});

// Add a book to user's list
export const addMyBook = createAsyncThunk('myBooks/addMyBook', async (bookId) => {
  const res = await axios.post(`http://localhost:5000/api/mybooks/${bookId}`);
  return res.data;
});

// Update reading status
export const updateStatus = createAsyncThunk('myBooks/updateStatus', async ({ bookId, status }) => {
  await axios.patch(`http://localhost:5000/api/mybooks/${bookId}/status`, { status });
  return { bookId, status };
});

// Update rating
export const updateRating = createAsyncThunk('myBooks/updateRating', async ({ bookId, rating }) => {
  await axios.patch(`http://localhost:5000/api/mybooks/${bookId}/rating`, { rating });
  return { bookId, rating };
});

const myBookSlice = createSlice({
  name: 'myBooks',
  initialState: {
    myBooks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = action.payload;
      })
      .addCase(fetchMyBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch My Books';
      })
      .addCase(addMyBook.fulfilled, (state, action) => {
        state.myBooks.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const book = state.myBooks.find((b) => b.bookId._id === action.payload.bookId);
        if (book) book.status = action.payload.status;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const book = state.myBooks.find((b) => b.bookId._id === action.payload.bookId);
        if (book) book.rating = action.payload.rating;
      });
  },
});

export default myBookSlice.reducer;
