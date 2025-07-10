import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-primary-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md hover:shadow-lg focus:ring-gray-500",
    success: "bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-success-500",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-red-500",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow-md hover:shadow-lg focus:ring-primary-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;