import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'
  const supabase = await createClient()

  const [listings, projects] = await Promise.all([
    supabase.from('listings').select('slug, updated_at').eq('published', true),
    supabase.from('interior_projects').select('slug, updated_at').eq('published', true),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const listingPages: MetadataRoute.Sitemap = (listings.data || []).map((l) => ({
    url: `${siteUrl}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = (projects.data || []).map((p) => ({
    url: `${siteUrl}/portfolio/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...listingPages, ...projectPages]
}
