import React from 'react';

export function Input({ value, onChange, placeholder, className, readOnly }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-4 py-2 rounded-md ${className}`}
      readOnly={readOnly}
    />
  );
}
