import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchMyBooks = createAsyncThunk(
  'myBooks/fetchMyBooks',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('mybooks');
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
// Add a book to user's list
export const addMyBook = createAsyncThunk('myBooks/addMyBook', async (bookId, { rejectWithValue }) => {
  try {
    const res = await axios.post(`mybooks/${bookId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add book');
  }
});

// Update reading status
export const updateStatus = createAsyncThunk('myBooks/updateStatus', async ({ bookId, status }, { rejectWithValue }) => {
  try {
    await axios.put(`mybooks/${bookId}/status`, { status });
    
    return { bookId, status };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update status');
  }
});

// Update rating
export const updateRating = createAsyncThunk('myBooks/updateRating', async ({ bookId, rating }, { rejectWithValue }) => {
  try {
    await axios.put(`mybooks/${bookId}/rating`, { rating });
    return { bookId, rating };
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response?.data?.message || 'Failed to update rating');
  }
});

const initialState = {
  myBooks: [],
  loading: false,
  error: null,
};

const myBookSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = action.payload;
      })
      .addCase(fetchMyBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch My Books';
      })
      .addCase(addMyBook.fulfilled, (state, action) => {
        state.myBooks.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => { 
        const book = state.myBooks.find((b) => b.bookId._id === action.payload.bookId);
        if (book) book.status = action.payload.status;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update status';
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const book = state.myBooks.find((b) => b.bookId._id === action.payload.bookId);
        if (book) book.rating = action.payload.rating;
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update rating';
      });
  },
});

export default myBookSlice.reducer;
