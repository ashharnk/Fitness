import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function importAll(r) {
  return r.keys().map(r);
}
const bannerImages = importAll(require.context('../../image', false, /\.(png|jpe?g|svg)$/));

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    // Fetch classes
    axios.get('http://localhost:4598/api/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));

    
    const interval = setInterval(() => {
      setBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="mb-8 relative rounded-lg overflow-hidden">
          {bannerImages.length > 0 && (
            <img 
              src={bannerImages[bannerIndex]} 
              alt="Banner" 
              className="w-full h-64 object-cover transition duration-1000 ease-in-out"
            />
          )}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">Available Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map(cls => (
            <div
              key={cls._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h2 className="text-2xl font-bold mb-2">{cls.title}</h2>
              <p className="mb-4 text-gray-300">{cls.description}</p>
              <p className="mb-2">
                <span className="font-semibold">Date:</span> {new Date(cls.date).toLocaleString()}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Trainer:</span> {cls.trainer ? cls.trainer.name : 'N/A'}
              </p>
              <Link
                to={`/book/${cls._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
