import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/bookSlice';
import myBooksReducer from './slices/myBookSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    myBooks: myBooksReducer,
  },
});