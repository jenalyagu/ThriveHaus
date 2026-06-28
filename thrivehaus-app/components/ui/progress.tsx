'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-3 w-full overflow-hidden rounded-full', className)}
    style={{ backgroundColor: '#E8E2D8' }}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full rounded-full transition-all duration-700 ease-out"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        background: 'linear-gradient(90deg, #3B4B3F, #5A8F5E)',
        boxShadow: '0 1px 3px rgba(59,75,63,0.4)',
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
