import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // First check for locale from [locale] segment
  let locale = await requestLocale

  // If no locale from segment, check the custom header (set by middleware for rewrites)
  if (!locale || !routing.locales.includes(locale as 'es' | 'en')) {
    const headersList = await headers()
    const headerLocale = headersList.get('x-next-intl-locale')
    if (headerLocale && routing.locales.includes(headerLocale as 'es' | 'en')) {
      locale = headerLocale
    }
  }

  // Fallback to default locale
  if (!locale || !routing.locales.includes(locale as 'es' | 'en')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  }
})
