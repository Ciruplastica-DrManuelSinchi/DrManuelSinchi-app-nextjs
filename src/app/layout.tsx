import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'

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

// Metadata base
export const metadata: Metadata = {
  metadataBase: new URL('https://ciruplastica.pe'),
  verification: {
    google: 'tu-codigo-de-verificacion-google',
  },
}

// Viewport
export const viewport = {
  themeColor: '#391142',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get locale and messages for i18n support across all pages
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable} overflow-x-hidden`}>
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
      <body className="font-body antialiased overflow-x-hidden w-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>

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
