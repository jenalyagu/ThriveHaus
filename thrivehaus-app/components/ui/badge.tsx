import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#E8DFD0] text-[#5A6F5E]',
        sage: 'bg-[#E8F0E8] text-[#3B4B3F]',
        gold: 'bg-[#FBF0D8] text-[#8A5A00]',
        clay: 'bg-[#F5E8E0] text-[#804030]',
        easy: 'bg-[#E8F0E8] text-[#3B5A3F]',
        medium: 'bg-[#FBF4E0] text-[#7A5500]',
        hard: 'bg-[#F5E0E0] text-[#7A2020]',
        outline: 'border border-[#E8DFD0] text-[#5A6F5E] bg-transparent',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
