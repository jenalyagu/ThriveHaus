import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-[#3B4B3F] text-[#FFFDF9] hover:bg-[#2D3A31] focus-visible:ring-[#3B4B3F]',
        primary: 'bg-[#3B4B3F] text-[#FFFDF9] hover:bg-[#2D3A31]',
        gold: 'bg-[#D09E5A] text-[#3B2E00] hover:bg-[#BC8E4A]',
        outline: 'border-2 border-[#3B4B3F] text-[#3B4B3F] bg-transparent hover:bg-[#F3EFE9]',
        ghost: 'text-[#5A6F5E] hover:bg-[#F3EFE9] hover:text-[#3B4B3F]',
        destructive: 'bg-[#B05042] text-white hover:bg-[#943A34]',
        link: 'text-[#5A6F5E] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-9 w-9',
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
