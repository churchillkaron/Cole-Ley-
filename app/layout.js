import './globals.css'

export const metadata = {
  title: 'Cole Ley',
  description: 'Artist',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}