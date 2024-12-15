import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  className,
  message = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'fixed inset-0 z-50 bg-white/70 dark:bg-neutral-900/80',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 
          className={cn(
            'animate-spin text-neutral-500 dark:text-neutral-400',
            sizeClasses[size]
          )}
        />
        {message && (
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;