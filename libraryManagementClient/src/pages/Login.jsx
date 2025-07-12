import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(form));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Login</h2>
      <input className='border w-full p-2 mb-2' type='email' placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className='border w-full p-2 mb-2' type='password' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className='bg-blue-500 text-white px-4 py-2'>Login</button>
    </form>
  );
}

export default Login;
