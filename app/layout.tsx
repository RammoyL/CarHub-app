import type { Metadata } from 'next';
import './globals.css';
import { Footer, Navbar } from '@/components';

export const metadata: Metadata = {
  title: 'CarPool',
  description: 'Browse our deep selection of different car brands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
