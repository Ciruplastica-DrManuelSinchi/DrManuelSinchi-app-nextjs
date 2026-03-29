'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    Clock,
    Shield,
    Sparkles,
    ArrowRight
} from 'lucide-react'

type Category = 'all' | 'nose' | 'eyes' | 'face' | 'contour'

interface Procedure {
    id: string
    slug: string
    category: Category[]
    image: string
    popular?: boolean
}

const procedures: Procedure[] = [
    { id: 'blepharoplasty', slug: 'blefaroplastia', category: ['eyes'], image: '/images/procedures/blefaroplastia.jpg', popular: true },
    { id: 'lifting', slug: 'lifting-facial', category: ['eyes', 'face'], image: '/images/procedures/lifting-facial.jpg', popular: true },
    { id: 'rhinoplasty', slug: 'rinoplastia', category: ['nose'], image: '/images/procedures/rinoplastia.jpg', popular: true },
    { id: 'facialFillers', slug: 'rellenos-faciales', category: ['face'], image: '/images/procedures/rellenos-faciales.jpg' },
    { id: 'otoplasty', slug: 'otoplastia', category: ['face'], image: '/images/procedures/otoplastia.jpg' },
    { id: 'moleRemoval', slug: 'extraccion-lunares', category: ['face'], image: '/images/procedures/extraccion-de-lunares.jpg' },
    { id: 'mentoplasty', slug: 'mentoplastia', category: ['contour'], image: '/images/procedures/mentoplastia.jpg' },
    { id: 'chinLipo', slug: 'lipo-papada', category: ['contour'], image: '/images/procedures/lipo-papada.jpg' },
    { id: 'bichectomy', slug: 'bichectomia', category: ['contour'], image: '/images/procedures/bichectomia.jpg', popular: true },
    { id: 'cheekAugmentation', slug: 'aumento-pomulos', category: ['contour'], image: '/images/procedures/aumento-de-pomulos.jpg' },
    { id: 'jawContouring', slug: 'marcacion-mandibular', category: ['contour'], image: '/images/procedures/marcacion-mandibular.jpg' },
    { id: 'facialSlimming', slug: 'afinamiento-facial', category: ['contour'], image: '/images/procedures/afinamiento-facial.jpg' },
    { id: 'profiloplasty', slug: 'perfiloplastia', category: ['nose', 'contour'], image: '/images/procedures/perfiloplastia.jpg' },
]

export default function CirugiaPlasticaFacial() {
    const t = useTranslations('categoryPages.facial')
    const tCommon = useTranslations('categoryPages.common')

    const [activeCategory, setActiveCategory] = useState<Category>('all')

    const categories: { id: Category; labelKey: string }[] = [
        { id: 'all', labelKey: 'all' },
        { id: 'nose', labelKey: 'nose' },
        { id: 'eyes', labelKey: 'eyes' },
        { id: 'face', labelKey: 'face' },
        { id: 'contour', labelKey: 'contour' },
    ]

    const filteredProcedures = activeCategory === 'all'
        ? procedures
        : procedures.filter(p => p.category.includes(activeCategory))

    const getCategoryLabel = (cat: { id: Category; labelKey: string }) => {
        if (cat.id === 'all') return tCommon('filters.all')
        return t(`filters.${cat.labelKey}`)
    }

    const getCategoryCount = (catId: Category) => {
        if (catId === 'all') return procedures.length
        return procedures.filter(p => p.category.includes(catId)).length
    }

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
                            <Sparkles className="w-4 h-4 mr-2" />
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
                            { value: '2000+', label: t('stats.surgeries') },
                            { value: '98%', label: tCommon('stats.satisfaction') },
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

            {/* Filters & Procedures Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                                    ${activeCategory === cat.id
                                        ? 'bg-primary text-white shadow-medium'
                                        : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary shadow-soft'
                                    }
                                `}
                            >
                                {getCategoryLabel(cat)}
                                <span className={`
                                    ml-2 text-xs px-2 py-0.5 rounded-full
                                    ${activeCategory === cat.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-500'
                                    }
                                `}>
                                    {getCategoryCount(cat.id)}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Procedures Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredProcedures.map((procedure, index) => (
                                <motion.div
                                    key={procedure.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/cirugia-plastica-facial/${procedure.slug}`}>
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

                                                {/* Popular Badge */}
                                                {procedure.popular && (
                                                    <span className="absolute top-4 left-4 bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                                                        {tCommon('popular')}
                                                    </span>
                                                )}

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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-white">
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
