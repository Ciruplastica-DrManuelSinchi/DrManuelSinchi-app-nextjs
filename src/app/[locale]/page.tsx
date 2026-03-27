import { setRequestLocale } from 'next-intl/server'
import Hero from '@/app/components/landing/hero/Hero'
import TrustBar from '@/app/components/landing/trust-bar/TrustBar'
import BeforeAfter from '@/app/components/landing/before-after/BeforeAfter'
import Procedures from '@/app/components/landing/procedures/Procedures'
import DoctorSection from '@/app/components/landing/doctor-section/DoctorSection'
import Testimonials from '@/app/components/landing/testimonials/Testimonials'
import Videos from '@/app/components/landing/videos/Videos'
import BlogSection from '@/app/components/landing/BlogSection'
import FAQ from '@/app/components/landing/faq/FAQ'
import Location from '@/app/components/landing/location/Location'
import ContactCTA from '@/app/components/landing/contact-cta/ContactCTA'
import AdminRedirect from '@/app/components/auth/AdminRedirect'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <AdminRedirect />
      {/* 1. Atención: Propuesta de valor + CTA prominente */}
      <Hero />
      {/* 2. Credenciales rápidas */}
      <TrustBar />
      {/* 3. Construir confianza PRIMERO - quién es el doctor */}
      <DoctorSection />
      {/* 4. Prueba visual inmediata - resultados reales */}
      <BeforeAfter />
      {/* 5. Validación social - testimonios */}
      <Testimonials />
      {/* 6. Qué ofreces - procedimientos */}
      <Procedures />
      {/* 7. Resolver objeciones */}
      <FAQ />
      {/* 8. CTA Final */}
      <ContactCTA />
      {/* 9. Para los que están listos - ubicación */}
      <Location />
      {/* 10. Contenido secundario */}
      <Videos />
      <BlogSection />
    </main>
  )
}
