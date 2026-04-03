import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Water Management Dashboard',
  description: 'Manage water levels and pump stations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
