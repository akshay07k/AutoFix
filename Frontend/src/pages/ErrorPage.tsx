import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! We can’t find the page you’re looking for.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5 mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
