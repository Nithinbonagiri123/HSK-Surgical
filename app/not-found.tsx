import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex items-center bg-paper pt-32 pb-24">
      <div className="container mx-auto text-center">
        <div className="eyebrow justify-center flex mb-8">Error · 404</div>
        <h1 className="text-display-2xl text-balance max-w-3xl mx-auto leading-[0.95]">
          Not found.{' '}
          <span className="italic text-ink/60">
            The page you&rsquo;re looking for doesn&rsquo;t exist.
          </span>
        </h1>
        <div className="mt-10 flex justify-center gap-3">
          <LinkButton href="/" arrow>Back to home</LinkButton>
          <LinkButton href="/products" variant="ghost" arrow>Browse products</LinkButton>
        </div>
      </div>
    </section>
  );
}
