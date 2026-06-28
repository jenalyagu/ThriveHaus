import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#EDE7DC] text-[#4A5E4E]',
        sage: 'bg-[#D6E8D6] text-[#2A4A2E]',
        gold: 'bg-[#F5E8C0] text-[#7A4E00]',
        clay: 'bg-[#F5DDD5] text-[#7A3020]',
        easy: 'bg-[#D0ECCC] text-[#2A5A30] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
        medium: 'bg-[#FAE8B0] text-[#6A4400] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
        hard: 'bg-[#F5CCCC] text-[#7A1818] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
        outline: 'border-2 border-[#D4CAB8] text-[#6A6050] bg-transparent',
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
