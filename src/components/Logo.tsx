import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-12',  // Small size
    md: 'h-16',  // Medium size
    lg: 'h-24',  // Large size
    xl: 'h-32'   // Extra large size
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/682b7a4d9fb9b7f7b2acf71e_1747692419309_f66c2e19.png" 
        alt="SafarMood Logo" 
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Logo;