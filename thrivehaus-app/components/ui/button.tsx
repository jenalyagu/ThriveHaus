import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'rounded-full bg-[#3B4B3F] text-white shadow-[0_2px_8px_rgba(59,75,63,0.35)] hover:bg-[#2D3A31] hover:shadow-[0_4px_16px_rgba(59,75,63,0.45)] hover:-translate-y-0.5 focus-visible:ring-[#3B4B3F]',
        primary: 'rounded-full bg-[#3B4B3F] text-white shadow-[0_2px_8px_rgba(59,75,63,0.35)] hover:bg-[#2D3A31] hover:shadow-[0_4px_16px_rgba(59,75,63,0.45)] hover:-translate-y-0.5',
        gold: 'rounded-full bg-[#D09E5A] text-[#2C1A00] shadow-[0_2px_8px_rgba(208,158,90,0.4)] hover:bg-[#BC8E4A] hover:shadow-[0_4px_16px_rgba(208,158,90,0.5)] hover:-translate-y-0.5',
        outline: 'rounded-full border-2 border-[#3B4B3F] text-[#3B4B3F] bg-transparent hover:bg-[#3B4B3F] hover:text-white hover:shadow-[0_2px_8px_rgba(59,75,63,0.2)]',
        ghost: 'rounded-full text-[#5A6F5E] hover:bg-[#F0EDE8] hover:text-[#3B4B3F]',
        destructive: 'rounded-full bg-[#B05042] text-white shadow-[0_2px_8px_rgba(176,80,66,0.35)] hover:bg-[#943A34] hover:-translate-y-0.5',
        link: 'text-[#5A6F5E] underline-offset-4 hover:underline p-0 h-auto rounded-none',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
