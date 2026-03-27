'use client'

import { MapPin, Phone, Clock, Navigation, MessageCircle, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import dynamic from 'next/dynamic'

// Importar el mapa de forma dinámica para evitar errores de SSR
const InteractiveMap = dynamic(
    () => import('@/app/components/ui/interactive-map/InteractiveMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full min-h-[350px] bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
            </div>
        ),
    }
)

export default function Location() {
    const t = useTranslations('location')
    const locale = useLocale()
    const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Calle+Scipi%C3%B3n+Llona+180%2C+Miraflores%2C+Lima%2C+Peru'

    const whatsappMessage = locale === 'en'
        ? 'Hello, I would like to schedule an appointment'
        : 'Hola, quisiera agendar una cita'
    const whatsappLink = `https://api.whatsapp.com/send?phone=51961360074&text=${encodeURIComponent(whatsappMessage)}`

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container-custom">
                {/* Header simple */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="font-display text-3xl md:text-4xl text-dark mb-2">
                        {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-gray-500">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Info compacta */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col"
                    >
                        {/* Card principal */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                            {/* Dirección */}
                            <div className="flex gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-dark">{t('contact.addressLine1')}</p>
                                    <p className="text-gray-500 text-sm">{t('contact.addressLine2')}</p>
                                </div>
                            </div>

                            {/* Horario */}
                            <div className="flex gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-dark">{t('contact.scheduleText')}</p>
                                    <p className="text-gray-500 text-sm">{t('contact.scheduleHours')}</p>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <a href="tel:+51961360074" className="font-semibold text-dark hover:text-primary transition-colors">
                                        {t('contact.phoneNumber')}
                                    </a>
                                    <p className="text-gray-500 text-sm">{t('callOrWrite')}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-green-600 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                {t('contactWhatsApp')}
                            </a>

                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 rounded-xl py-3 px-6 font-medium hover:border-primary hover:text-primary transition-colors"
                            >
                                <Navigation className="w-4 h-4" />
                                {t('directions')}
                                <ExternalLink className="w-3.5 h-3.5 ml-1" />
                            </a>
                        </div>

                        {/* Referencia */}
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            {t('reference')}
                        </p>
                    </motion.div>

                    {/* Mapa */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 rounded-2xl overflow-hidden shadow-soft min-h-[350px]"
                    >
                        <InteractiveMap className="rounded-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
