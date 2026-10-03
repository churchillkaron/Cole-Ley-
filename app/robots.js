export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/media/', '/invoice/', '/expenses/', '/content/'],
    },
    sitemap: 'https://www.coleley.com/sitemap.xml',
    host: 'https://www.coleley.com',
  }
}
