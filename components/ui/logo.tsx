import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="1.5" 
        />
        <path 
          d="M8 12L11 15L16 9" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
      <h1 className="text-2xl font-bold">PrepWise</h1>
    </div>
  );
}
