'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Admin tiene su propio layout completo
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Layout normal para el resto del sitio
  return (
    <div className="overflow-x-hidden w-full">
      <Header />
      <main className="min-h-screen w-full overflow-x-hidden">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
