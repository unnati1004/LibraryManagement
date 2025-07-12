import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoutes';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mybooks' element={<PrivateRoute><MyBooks /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
