import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border-2 border-[#E0D8CC] bg-white px-4 py-2',
        'text-sm text-[#3B4B3F] placeholder:text-[#B0A898] font-medium',
        'shadow-[0_1px_3px_rgba(59,75,63,0.06)]',
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[#5A6F5E] focus-visible:shadow-[0_0_0_3px_rgba(90,111,94,0.15)]',
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
