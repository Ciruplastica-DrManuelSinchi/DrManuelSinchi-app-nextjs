import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import WhatsAppButton from '@/app/components/layout/WhatsAppButton'

// Fuentes optimizadas con next/font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Metadata SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://ciruplastica.pe'),
  title: {
    default: 'Ciruplástica | Cirugía Plástica en Lima - Dr. Manuel Sinchi',
    template: '%s | Ciruplástica - Dr. Manuel Sinchi',
  },
  description:
    'Especialistas en Cirugía Plástica, Medicina Estética y Cirugía Reconstructiva en Lima, Perú. Más de 15 años de experiencia. Consulta gratuita.',
  keywords: [
    'cirugía plástica Lima',
    'cirujano plástico Perú',
    'rinoplastia Lima',
    'lipoescultura Lima',
    'medicina estética',
    'Dr. Manuel Sinchi',
    'cirugía reconstructiva',
    'botox Lima',
    'aumento de mamas',
    'blefaroplastia',
  ],
  authors: [{ name: 'Dr. Manuel Sinchi' }],
  creator: 'Ciruplástica',
  publisher: 'Ciruplástica',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://ciruplastica.pe',
    siteName: 'Ciruplástica',
    title: 'Ciruplástica | Cirugía Plástica en Lima - Dr. Manuel Sinchi',
    description:
      'Especialistas en Cirugía Plástica, Medicina Estética y Cirugía Reconstructiva en Lima, Perú.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ciruplástica - Cirugía Plástica en Lima',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Ciruplástica | Cirugía Plástica en Lima',
    description:
      'Especialistas en Cirugía Plástica y Medicina Estética en Lima, Perú.',
    images: ['/images/og-image.jpg'],
  },

  // Robots
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

  // Verificación
  verification: {
    google: 'tu-codigo-de-verificacion-google',
  },

  // Otros
  category: 'health',
}

// Viewport
export const viewport = {
  themeColor: '#391142',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect para optimizar carga */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {/* Header */}
        <Header />

        {/* Contenido principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Botón flotante de WhatsApp */}
        <WhatsAppButton />

        {/* Schema.org JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Ciruplástica',
              description: 'Clínica especializada en Cirugía Plástica, Medicina Estética y Cirugía Reconstructiva en Lima, Perú.',
              url: 'https://ciruplastica.pe',
              telephone: '+51961360074',
              email: 'consultas@ciruplastica.pe',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calle Scipión Llona 180, Consultorio 503',
                addressLocality: 'Miraflores',
                addressRegion: 'Lima',
                postalCode: '15074',
                addressCountry: 'PE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -12.1191,
                longitude: -77.0311,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '19:00',
                },
              ],
              medicalSpecialty: [
                'PlasticSurgery',
                'CosmeticSurgery',
                'ReconstructiveSurgery',
              ],
              priceRange: '$$$',
              image: 'https://ciruplastica.pe/images/clinica.jpg',
              sameAs: [
                'https://www.facebook.com/ciruplastica',
                'https://www.instagram.com/ciruplastica',
                'https://www.youtube.com/ciruplastica',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
