import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4598/api/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);
      history.push('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white text-lg mb-2">Name:</label>
            <input
              type="text"
              className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-5">
            <label className="block text-white text-lg mb-2">Role:</label>
            <select
              className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-200">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
