import './globals.scss'
import type { Metadata } from 'next'
// import { Inter, Staatliches, Anton } from 'next/font/google'
import localFont from 'next/font/local'
const myFont = localFont({src: '../../public/fonts/Staatliches-Regular.ttf'})

export const metadata: Metadata = {
  title: 'Scanner | Mind The Rabbit',
  description: 'Online nmap scanner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
