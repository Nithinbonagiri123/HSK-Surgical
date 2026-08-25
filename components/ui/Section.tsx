import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'bone' | 'ink' | 'white';
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const toneMap = {
  bone: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-paper',
} as const;

export function Section({
  id,
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'bone',
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-24 md:py-32',
        toneMap[tone],
        className,
      )}
    >
      <Container className={cn('relative', containerClassName)}>
        {(eyebrow || title || intro) && (
          <header
            className={cn(
              'mb-14 md:mb-20 max-w-3xl',
              align === 'center' && 'mx-auto text-center',
            )}
          >
            {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
            {title && (
              <h2 className="text-display-lg text-balance">{title}</h2>
            )}
            {intro && (
              <p className={cn(
                'mt-6 text-lg md:text-xl text-pretty',
                tone === 'ink' ? 'text-paper/70' : 'text-ink/70',
              )}>
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
