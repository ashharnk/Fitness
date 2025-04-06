import React from 'react';
import { Link } from 'react-router-dom';

const doUserLogOut = async function () {
  try {
    localStorage.removeItem('token');
    alert('User Logout Successfully');
    window.location.reload();
    return true;
  } catch (error) {
    return false;
  }
};

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Class Scheduler
        </Link>
        <div>
          {!localStorage.getItem('token') ? (
            <div>
              <Link to="/login" className="mr-4 text-white hover:text-red-500">
                Login
              </Link>
              <Link to="/signup" className="mr-4 text-white hover:text-red-500">
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="mr-4 text-white">
                Welcome, {localStorage.getItem('name')}
              </span>
              <Link
                onClick={() => doUserLogOut()}
                className="mr-4 text-white hover:text-red-500 cursor-pointer"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
