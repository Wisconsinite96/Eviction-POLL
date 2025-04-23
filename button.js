import React from 'react';

export function Button({ children, onClick, variant }) {
  const variantClasses = {
    outline: 'border border-gray-300 text-gray-700',
    destructive: 'bg-red-500 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${variantClasses[variant] || ''}`}
    >
      {children}
    </button>
  );
}
