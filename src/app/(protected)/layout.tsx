'use client'

import { SessionProvider } from 'next-auth/react'
import Header from '@/app/components/layout/Header'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
