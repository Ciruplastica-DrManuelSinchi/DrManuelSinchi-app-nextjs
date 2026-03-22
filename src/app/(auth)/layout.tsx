import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import { AuthGradientBackground } from '@/app/components/shared/AnimatedShapes'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center px-4 py-12 pt-32">
        {/* Background gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-pink-50/50 to-purple-100/30" />

        {/* Animated blurred gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AuthGradientBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
