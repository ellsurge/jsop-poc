import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'md' }) => {
  const baseStyle = "rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
