"use client";

import { useState, useEffect } from 'react';
import { getCareerPaths } from '@/lib/careerPaths';

export default function CareerPaths() {
  const [careerPaths, setCareerPaths] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const userId = 'test-user-id'; // Replace with actual user ID from auth session
        const paths = await getCareerPaths(userId);
        setCareerPaths(paths);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchCareerPaths();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Suggested Career Paths</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      {careerPaths.length > 0 ? (
        <ul className="w-full max-w-md list-disc list-inside">
          {careerPaths.map((path, index) => (
            <li key={index} className="mb-2">
              <strong>{path.title}</strong>: {path.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No career paths available at the moment.</p>
      )}
    </div>
  );
}