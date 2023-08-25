import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Job listing page',
  description: 'It is a job portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbxErd5n16klULgMesFrf1KMp_jloiF4E&libraries=places"></script>
      </body>
    </html>
  )
}
