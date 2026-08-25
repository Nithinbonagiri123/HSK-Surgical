import Link from 'next/link';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-precision select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper hover:bg-ink-700',
        ghost: 'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper',
        onInk: 'bg-paper text-ink hover:bg-white',
        onInkGhost: 'bg-transparent text-paper border border-paper/25 hover:bg-paper hover:text-ink hover:border-paper',
      },
      size: {
        sm: 'text-xs px-4 py-2',
        md: 'text-sm px-6 py-3',
        lg: 'text-sm px-7 py-3.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
};

type LinkButtonProps = ButtonBaseProps & { href: string; external?: boolean };
type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function LinkButton({
  href,
  external,
  variant,
  size,
  className,
  arrow = false,
  children,
}: LinkButtonProps) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-precision group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant, size }), className)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(buttonStyles({ variant, size }), className)}>
      {inner}
    </Link>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, arrow, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-precision group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      )}
    </button>
  );
});
