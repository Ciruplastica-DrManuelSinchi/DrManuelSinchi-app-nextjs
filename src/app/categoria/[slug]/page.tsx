'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronRight, ArrowRight, Sparkles, Loader2, NotebookPen } from 'lucide-react'

interface Procedure {
    name: string
    slug: string
}

interface Category {
    id: string
    name: string
    slug: string
    urlPath: string | null
    description: string | null
    procedures: Procedure[]
}

export default function DynamicCategoryPage() {
    const params = useParams()
    const slug = params.slug as string
    const tCommon = useTranslations('categoryPages.common')

    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                const found = (data.categories as Category[])?.find(
                    c => c.urlPath === slug || c.slug === slug
                )
                if (found) {
                    setCategory(found)
                } else {
                    setNotFound(true)
                }
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </main>
        )
    }

    if (notFound || !category) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-lg">Categoría no encontrada.</p>
                <Link href="/" className="btn-primary">
                    Volver al inicio <ArrowRight className="w-4 h-4" />
                </Link>
            </main>
        )
    }

    // Usar la URL limpia del admin (urlPath o slug) para que el middleware
    // intercepte /cat/proc y lo reescriba internamente a /categoria/cat/proc
    const categoryPath = `/${category.urlPath || category.slug}`

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
                        <span className="text-accent">{category.name}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-accent mb-6"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Procedimientos Especializados
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white mb-6"
                        >
                            {category.name}
                        </motion.h1>

                        {category.description && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-white/80 leading-relaxed"
                            >
                                {category.description}
                            </motion.p>
                        )}
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
                            { value: `${category.procedures.length}`, label: 'Procedimientos' },
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

            {/* Procedures Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    {category.procedures.length === 0 ? (
                        <div className="text-center py-16">
                            <NotebookPen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">
                                Próximamente añadiremos los procedimientos de esta categoría.
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-4"
                        >
                            {category.procedures.map((proc, index) => (
                                <motion.div
                                    key={proc.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`${categoryPath}/${proc.slug}`}>
                                        <div className="group relative bg-white rounded-2xl shadow-card hover:shadow-elevation-4 transition-all duration-300 overflow-hidden">
                                            {/* Accent bar */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:bg-accent transition-colors duration-300" />

                                            <div className="p-6 pl-8 flex items-center justify-between gap-4">
                                                <div>
                                                    <span className="text-xs text-primary/40 font-medium tabular-nums">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <h3 className="text-lg font-semibold text-dark group-hover:text-primary transition-colors duration-300 mt-0.5">
                                                        {proc.name}
                                                    </h3>
                                                </div>
                                                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                                                    <ArrowRight className="w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
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
                                <Link href="/contacto" className="btn-primary">
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
