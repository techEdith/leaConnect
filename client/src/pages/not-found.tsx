
import React from 'react';
import { useLocation } from 'wouter';

export default function NotFoundPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <button
          onClick={() => setLocation('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
