export default function sitemap() {
  const baseUrl = 'https://www.coleley.com'
  const lastModified = new Date('2026-10-03T00:00:00.000Z')

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
      lastModified,
      changeFrequency: 'weekly',
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
      lastModified,
      changeFrequency: 'monthly',
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
  ]
}
