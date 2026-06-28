import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-[#E8DFD0] bg-[#F3EFE9] px-4 py-2',
        'text-sm text-[#3B4B3F] placeholder:text-[#B0A898]',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6F5E] focus-visible:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
