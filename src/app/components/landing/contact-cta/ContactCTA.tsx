'use client'

import { Calendar, MessageCircle, Clock, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function ContactCTA() {
    const t = useTranslations('contactCta')
    const tCommon = useTranslations('common')
    const locale = useLocale()

    const whatsappMessage = locale === 'en'
        ? 'I would like more information about the procedures'
        : 'Deseo más información sobre los procedimientos'
    const whatsappLink = `https://api.whatsapp.com/send?phone=51961360074&text=${encodeURIComponent(whatsappMessage)}`

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 animated-gradient-accent" />

            {/* Mesh overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />

            {/* Animated orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    left: '-10%',
                    top: '-20%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-80 h-80 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(57,17,66,0.2) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    right: '-5%',
                    bottom: '-10%',
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <div className="container-custom relative z-10">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        {t('badge')}
                    </motion.span>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
                        {t('title')}{' '}
                        <span className="relative">
                            {t('titleHighlight')}
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 12"
                                fill="none"
                            >
                                <motion.path
                                    d="M2 8C50 2 150 2 198 8"
                                    stroke="#391142"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </svg>
                        </span>
                        ?
                    </h2>

                    <p className="text-dark/80 text-lg mb-10 max-w-2xl mx-auto">
                        {t('description')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/reservar"
                                className="btn-dark btn-shine text-base px-8 py-4 shadow-elevation-3"
                            >
                                <Calendar className="w-5 h-5" />
                                {tCommon('buttons.schedule')}
                            </Link>
                        </motion.div>

                        <motion.a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-white text-base px-8 py-4 shadow-elevation-2 relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Pulse effect */}
                            <span className="absolute inset-0 bg-green-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                            <MessageCircle className="w-5 h-5 relative z-10 text-green-600" />
                            <span className="relative z-10">{t('whatsappDirect')}</span>
                        </motion.a>
                    </div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 text-sm text-dark/60"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>{t('trust.personalizedConsultation')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{t('trust.responseTime')}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
