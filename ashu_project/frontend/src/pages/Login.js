import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4598/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      window.location.href = '/';
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white text-lg mb-2">Email:</label>
            <input 
              type="email" 
              className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-white text-lg mb-2">Password:</label>
            <input 
              type="password" 
              className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
