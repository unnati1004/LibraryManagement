import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';
    axios.defaults.withCredentials = true;
// Thunk to fetch all books
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, thunkAPI) => {
    try {
      // debugger
      const res = await axios.get('/api/books');
      return res.data;
    } catch (err) {
      console.error('Error in fetchBooks:', err);

      return thunkAPI.rejectWithValue({
        message: err.message,
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url,
      });
    }
  }
);  
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
        console.log(state);
        state.loading = false;
        state.error = 'Failed to fetch books';
      });
  },
});

export default bookSlice.reducer;
