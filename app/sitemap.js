export const revalidate = 3600

async function latestVerifiedPressChange() {
  const fallback = new Date('2026-10-04T00:00:00.000Z')
  try {
    const response = await fetch('https://avantiqo.ai/api/public/cole-ley/press', { next: { revalidate: 3600 } })
    if (!response.ok) return fallback
    const data = await response.json()
    const timestamps = (Array.isArray(data?.items) ? data.items : [])
      .map((item) => Date.parse(item?.verified_at || item?.published_at || ''))
      .filter(Number.isFinite)
    return timestamps.length ? new Date(Math.max(...timestamps)) : fallback
  } catch { return fallback }
}

export default async function sitemap() {
  const pressLastModified = await latestVerifiedPressChange()
  const liveDatesLastModified = new Date('2026-11-03T00:00:00.000Z')
  const baseUrl = 'https://www.coleley.com'
  const lastModified = new Date('2026-10-04T00:00:00.000Z')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/music`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live-dates`,
      lastModified: liveDatesLastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/performance-formats`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/live-music-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-singer-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-entertainment-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/entertainment-agency-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hotels-beach-clubs-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/corporate-event-live-music-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/private-party-live-music-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-cole-ley`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: pressLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jazz-singer-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/acoustic-singer-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/live-band-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/corporate-entertainment-phuket`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
  ]
}
