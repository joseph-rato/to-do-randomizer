"use client";
import { useState } from "react";

interface RandomTaskButtonProps {
  onConfettiTrigger: () => void;
}

export default function RandomTaskButton({ onConfettiTrigger }: RandomTaskButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onConfettiTrigger();
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          relative overflow-hidden px-8 py-4 rounded-full font-bold text-white text-lg
          bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500
          hover:from-red-400 hover:via-yellow-400 hover:via-green-400 hover:via-blue-400 hover:via-purple-400 hover:to-pink-400
          transform hover:scale-105 transition-all duration-300
          shadow-lg hover:shadow-xl
          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
          animate-pulse
        `}
        style={{
          backgroundSize: '200% 200%',
          animation: isLoading ? 'none' : 'shimmer 2s ease-in-out infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        
        {/* Glitter effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </>
          ) : (
            '✨ Random Task ✨'
          )}
        </span>
      </button>
    </div>
  );
} 