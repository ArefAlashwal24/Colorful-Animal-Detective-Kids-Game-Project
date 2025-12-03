import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  icon,
  ...props 
}) => {
  const baseStyles = "transform active:scale-95 transition-all duration-200 rounded-3xl font-bold shadow-lg flex items-center justify-center gap-4 select-none";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white border-b-8 border-blue-700 active:border-b-0 active:translate-y-2",
    secondary: "bg-purple-500 hover:bg-purple-600 text-white border-b-8 border-purple-700 active:border-b-0 active:translate-y-2",
    success: "bg-green-500 hover:bg-green-600 text-white border-b-8 border-green-700 active:border-b-0 active:translate-y-2",
    danger: "bg-red-500 hover:bg-red-600 text-white border-b-8 border-red-700 active:border-b-0 active:translate-y-2",
    outline: "bg-white text-slate-700 border-4 border-slate-300 hover:bg-slate-50"
  };

  const sizeStyles = "px-10 py-6 text-3xl md:text-5xl";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${className}`}
      {...props}
    >
      {icon && <span className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};