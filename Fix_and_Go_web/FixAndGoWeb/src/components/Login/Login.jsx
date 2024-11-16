import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if credentials are correct
    if (username === 'admin' && password === '1234') {
      // Redirect to AdminDashboard if credentials are correct
      navigate('/admindash');
    } else {
      setError('Incorrect Username or Password');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-orange-300'>
      <div className='bg-orange-100 shadow-lg rounded-lg p-8 w-full max-w-sm'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>ADMIN LOGIN</h2>
        
        {/* Error Message */}
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
