'use client'

import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Admin tiene su propio layout completo
  if (isAdminRoute) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }

  // Páginas protegidas de cliente (dashboard, profile, etc.)
  return (
    <SessionProvider>
      <Header />
      <main className="pt-24 pb-12 min-h-screen">
        {children}
      </main>
      <Footer />
    </SessionProvider>
  )
}
