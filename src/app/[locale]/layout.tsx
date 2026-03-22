import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import ClientLayout from '@/app/components/layout/ClientLayout'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const isSpanish = locale === 'es'

  return {
    metadataBase: new URL('https://ciruplastica.pe'),
    title: {
      default: isSpanish
        ? 'Ciruplástica | Cirugía Plástica en Lima - Dr. Manuel Sinchi'
        : 'Ciruplástica | Plastic Surgery in Lima - Dr. Manuel Sinchi',
      template: '%s | Ciruplástica - Dr. Manuel Sinchi',
    },
    description: isSpanish
      ? 'Especialistas en Cirugía Plástica, Medicina Estética y Cirugía Reconstructiva en Lima, Perú. Más de 15 años de experiencia. Consulta gratuita.'
      : 'Specialists in Plastic Surgery, Aesthetic Medicine and Reconstructive Surgery in Lima, Peru. Over 15 years of experience. Free consultation.',
    keywords: isSpanish
      ? [
          'cirugía plástica Lima',
          'cirujano plástico Perú',
          'rinoplastia Lima',
          'lipoescultura Lima',
          'medicina estética',
          'Dr. Manuel Sinchi',
        ]
      : [
          'plastic surgery Lima',
          'plastic surgeon Peru',
          'rhinoplasty Lima',
          'liposculpture Lima',
          'aesthetic medicine',
          'Dr. Manuel Sinchi',
        ],
    authors: [{ name: 'Dr. Manuel Sinchi' }],
    creator: 'Ciruplástica',
    publisher: 'Ciruplástica',
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_PE' : 'en_US',
      url: 'https://ciruplastica.pe',
      siteName: 'Ciruplástica',
      title: isSpanish
        ? 'Ciruplástica | Cirugía Plástica en Lima - Dr. Manuel Sinchi'
        : 'Ciruplástica | Plastic Surgery in Lima - Dr. Manuel Sinchi',
      description: isSpanish
        ? 'Especialistas en Cirugía Plástica, Medicina Estética y Cirugía Reconstructiva en Lima, Perú.'
        : 'Specialists in Plastic Surgery, Aesthetic Medicine and Reconstructive Surgery in Lima, Peru.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isSpanish ? 'Ciruplástica - Cirugía Plástica en Lima' : 'Ciruplástica - Plastic Surgery in Lima',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish ? 'Ciruplástica | Cirugía Plástica en Lima' : 'Ciruplástica | Plastic Surgery in Lima',
      description: isSpanish
        ? 'Especialistas en Cirugía Plástica y Medicina Estética en Lima, Perú.'
        : 'Specialists in Plastic Surgery and Aesthetic Medicine in Lima, Peru.',
      images: ['/images/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://ciruplastica.pe/${locale}`,
      languages: {
        'es': 'https://ciruplastica.pe/es',
        'en': 'https://ciruplastica.pe/en',
        'x-default': 'https://ciruplastica.pe/es',
      },
    },
    category: 'health',
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validar que el locale es soportado
  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound()
  }

  // Habilitar renderizado estático
  setRequestLocale(locale)

  // Obtener mensajes de traducción
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientLayout>{children}</ClientLayout>
    </NextIntlClientProvider>
  )
}
