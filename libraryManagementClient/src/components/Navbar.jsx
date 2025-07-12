import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className='bg-blue-600 text-white px-4 py-3 flex justify-between'>
      <Link to='/' className='font-bold text-xl'>My Library</Link>
      <div className='flex gap-4'>
        {user && <Link to='/mybooks'>My Books</Link>}
        {!user && <Link to='/login'>Login</Link>}
        {!user && <Link to='/register'>Register</Link>}
        {user && (
          <>
            <span>{user.email}</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
