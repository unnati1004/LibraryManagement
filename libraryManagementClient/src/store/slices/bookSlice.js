import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await axios.get('http://localhost:5000/api/books/');
  console.log(res);
  return res.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch books';
      });
  },
});

export default bookSlice.reducer;
