import type { MetadataRoute } from 'next';
import { products, specialties } from '@/lib/products';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const staticRoutes = ['', '/products', '/specialties', '/clearview', '/about', '/contact'];
  const productRoutes = products.map((p) => `/products/${p.slug}`);
  const specialtyRoutes = specialties
    .filter((s) => s.id !== 'clearview')
    .map((s) => s.href);
  return [...staticRoutes, ...specialtyRoutes, ...productRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
