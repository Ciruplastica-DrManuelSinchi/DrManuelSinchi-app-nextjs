'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import {
    ChevronRight,
    Clock,
    Shield,
    Sparkles,
    ArrowRight,
    Heart
} from 'lucide-react'

interface Procedure {
    id: string
    slug: string
    image: string
}

const procedures: Procedure[] = [
    {
        id: 'tumors',
        slug: 'tumores-carcinomas',
        image: '/images/procedures/tumores-y-carcinomas.jpg',
    },
    {
        id: 'scars',
        slug: 'cicatrices',
        image: '/images/procedures/cicatrices.jpg',
    },
    {
        id: 'wounds',
        slug: 'heridas-ulceras',
        image: '/images/procedures/heridas-y-ulceras-complejas.jpg',
    },
    {
        id: 'burns',
        slug: 'quemaduras',
        image: '/images/procedures/quemaduras.jpg',
    },
    {
        id: 'biopolymerRemoval',
        slug: 'retiro-biopolimeros',
        image: '/images/procedures/retiro-de-biopolimeros.jpg',
    },
]

export default function CirugiaReconstructiva() {
    const t = useTranslations('categoryPages.reconstructive')
    const tCommon = useTranslations('categoryPages.common')

    const reasons = t.raw('whyChooseUs.reasons') as string[]

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">
                            {tCommon('breadcrumbs.home')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-accent">{t('title')}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-accent mb-6"
                        >
                            <Heart className="w-4 h-4 mr-2" />
                            {t('badge')}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white mb-6"
                        >
                            {t('title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 leading-relaxed"
                        >
                            {t('description')}
                        </motion.p>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl"
                    >
                        {[
                            { value: '15+', label: tCommon('stats.yearsExperience') },
                            { value: '1000+', label: t('stats.surgeries') },
                            { value: '97%', label: t('stats.success') },
                        ].map((stat, index) => (
                            <div key={index} className="text-center md:text-left">
                                <div className="text-2xl md:text-4xl font-display font-bold text-accent">
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-white/60 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            {t('intro.title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 text-lg leading-relaxed"
                        >
                            {t('intro.description')}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Procedures Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="section-header">
                        <span className="badge-primary mb-4">{t('servicesSection.badge')}</span>
                        <h2 className="section-title">{t('servicesSection.title')}</h2>
                        <p className="section-subtitle">
                            {t('servicesSection.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {procedures.map((procedure, index) => (
                            <motion.div
                                key={procedure.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/cirugia-reconstructiva/${procedure.slug}`}>
                                    <div className="card-hover group h-full">
                                        {/* Image */}
                                        <div className="relative aspect-procedure overflow-hidden rounded-t-2xl">
                                            <Image
                                                src={procedure.image}
                                                alt={t(`procedures.${procedure.id}.name`)}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Title on Image */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-white text-xl font-display font-semibold">
                                                    {t(`procedures.${procedure.id}.name`)}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {t(`procedures.${procedure.id}.description`)}
                                            </p>

                                            {/* Info Pills */}
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    {t(`procedures.${procedure.id}.duration`)}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Shield className="w-4 h-4 text-primary" />
                                                    {t(`procedures.${procedure.id}.recovery`)}
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                                                {tCommon('viewMore')}
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge-accent mb-4">{t('whyChooseUs.badge')}</span>
                            <h2 className="mb-6">{t('whyChooseUs.title')}</h2>
                            <p className="text-gray-600 mb-6">
                                {t('whyChooseUs.description')}
                            </p>

                            <ul className="space-y-4">
                                {reasons.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Sparkles className="w-3 h-3 text-accent-dark" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/dr-sinchi-reconstructiva.jpg"
                                    alt="Dr. Sinchi - Cirugía Reconstructiva"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-primary/10 rounded-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl mb-4">
                                {tCommon('cta.title')}
                            </h2>
                            <p className="text-white/80 mb-8">
                                {tCommon('cta.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/reservar" className="btn-primary">
                                    {tCommon('cta.scheduleButton')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="https://wa.me/51961360074"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    {tCommon('cta.whatsappButton')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
