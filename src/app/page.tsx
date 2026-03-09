import Hero from '@/app/components/landing/hero/Hero'
import TrustBar from '@/app/components/landing/trust-bar/TrustBar'
import BeforeAfter from '@/app/components/landing/before-after/BeforeAfter'
import Procedures from '@/app/components/landing/procedures/Procedures'
import DoctorSection from '@/app/components/landing/doctor-section/DoctorSection'
import Testimonials from '@/app/components/landing/testimonials/Testimonials'
import Videos from '@/app/components/landing/videos/Videos'
import FAQ from '@/app/components/landing/faq/FAQ'
import ContactCTA from '@/app/components/landing/contact-cta/ContactCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <Procedures />
      <DoctorSection />
      <Testimonials />
      <Videos />
      <FAQ />
      <ContactCTA />
    </main>
  )
}