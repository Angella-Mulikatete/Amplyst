import React from 'react';
import { Zap } from 'lucide-react'; // Using Zap as a placeholder for "Amply" + "AI"

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Zap className="text-primary" size={size} strokeWidth={2.5} />
      {showText && (
         <span className="text-xl font-bold text-foreground">
           Amply<span className="text-primary">AI</span>
         </span>
      )}
    </div>
  );
};

export default Logo;
