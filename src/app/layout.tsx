import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import Favicon from '../../public/favicon.ico';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jobee',
  description: 'It is a job portal',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
        <link rel='icon' href='/favicon.ico'/>
      </head>
      <body className={inter.className}><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  )
}
