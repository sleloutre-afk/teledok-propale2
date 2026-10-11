import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({ url: SITE_URL + (path === '/' ? '' : path) }))
}
