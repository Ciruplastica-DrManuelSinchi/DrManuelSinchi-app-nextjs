'use client'

import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'

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
      <div className="pt-24 pb-12">
        {children}
      </div>
    </SessionProvider>
  )
}
