import React from 'react';

const Confirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-extrabold text-red-500 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-300">
          Thank you for booking your class. A confirmation email has been sent.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
