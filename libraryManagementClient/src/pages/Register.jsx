import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Register</h2>
      <input className='border w-full p-2 mb-2' type='email' placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className='border w-full p-2 mb-2' type='password' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className='bg-green-500 text-white px-4 py-2'>Register</button>
    </form>
  );
}

export default Register;
