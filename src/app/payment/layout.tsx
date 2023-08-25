import { ReduxProvider } from '@/redux/provider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jobee Payment',
  description: 'It is a job portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  )
}
