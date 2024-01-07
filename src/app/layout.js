import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProviders } from './Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-Auth Postgres',
  description: 'Postgres Next.js Next-Auth Template',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>

          {children}
        </AuthProviders>
      </body>
    </html>
  )
}
