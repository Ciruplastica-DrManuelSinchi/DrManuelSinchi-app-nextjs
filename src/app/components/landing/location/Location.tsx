'use client'

import { MapPin, Phone, Mail, Clock, Navigation, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

// Importar el mapa de forma dinámica para evitar errores de SSR
const InteractiveMap = dynamic(
    () => import('@/app/components/ui/interactive-map/InteractiveMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
                <div className="text-gray-400 flex flex-col items-center gap-2">
                    <MapPin className="w-8 h-8" />
                    <span>Cargando mapa...</span>
                </div>
            </div>
        ),
    }
)

interface ContactItem {
    icon: LucideIcon
    labelKey: string
    textKey: string
    subtextKey?: string
    href?: string
}

const contactItems: ContactItem[] = [
    {
        icon: MapPin,
        labelKey: 'address',
        textKey: 'addressLine1',
        subtextKey: 'addressLine2',
    },
    {
        icon: Phone,
        labelKey: 'phone',
        textKey: 'phoneNumber',
        href: 'tel:+51961360074',
    },
    {
        icon: Mail,
        labelKey: 'email',
        textKey: 'emailAddress',
        href: 'mailto:consultas@ciruplastica.pe',
    },
    {
        icon: Clock,
        labelKey: 'schedule',
        textKey: 'scheduleText',
        subtextKey: 'scheduleHours',
    },
]

export default function Location() {
    const t = useTranslations('location')
    const googleMapsUrl = 'https://www.google.com/maps/place/Dr.+Manuel+Sinchi+-+Cirupl%C3%A1stica/@-12.107718742990034,-77.03253448893925,17z'

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        {t('badge')}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
                        {t('title')}{' '}
                        <span className="text-primary">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        {contactItems.map((item, index) => (
                            <motion.div
                                key={item.labelKey}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow"
                            >
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{t(`contact.${item.labelKey}`)}</p>
                                            <p className="font-semibold text-dark group-hover:text-primary transition-colors">
                                                {t(`contact.${item.textKey}`)}
                                            </p>
                                            {item.subtextKey && (
                                                <p className="text-gray-600 text-sm">{t(`contact.${item.subtextKey}`)}</p>
                                            )}
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{t(`contact.${item.labelKey}`)}</p>
                                            <p className="font-semibold text-dark">{t(`contact.${item.textKey}`)}</p>
                                            {item.subtextKey && (
                                                <p className="text-gray-600 text-sm">{t(`contact.${item.subtextKey}`)}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* CTA Button */}
                        <motion.a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:bg-primary-600 transition-colors mt-2"
                        >
                            <Navigation className="w-5 h-5" />
                            {t('directions')}
                        </motion.a>
                    </motion.div>

                    {/* Mapa Interactivo */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl overflow-hidden shadow-medium h-full min-h-[400px]"
                    >
                        <InteractiveMap className="rounded-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
