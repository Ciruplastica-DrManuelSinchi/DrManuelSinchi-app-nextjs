'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
    ChevronRight,
    ArrowRight,
    Loader2,
    Phone,
    CalendarCheck,
    ShieldCheck,
    Award,
    MessageCircle,
} from 'lucide-react'

interface ProcedureData {
    name: string
    slug: string
}

interface CategoryData {
    id: string
    name: string
    slug: string
    urlPath: string | null
    description: string | null
    procedures: ProcedureData[]
}

export default function DynamicProcedurePage() {
    const params = useParams()
    const categorySlug = params.slug as string
    const procedureSlug = params.procedure as string
    const tCommon = useTranslations('categoryPages.common')

    const [category, setCategory] = useState<CategoryData | null>(null)
    const [procedure, setProcedure] = useState<ProcedureData | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                const foundCat = (data.categories as CategoryData[])?.find(
                    c => c.urlPath === categorySlug || c.slug === categorySlug
                )
                if (!foundCat) { setNotFound(true); return }

                const foundProc = foundCat.procedures.find(p => p.slug === procedureSlug)
                if (!foundProc) { setNotFound(true); return }

                setCategory(foundCat)
                setProcedure(foundProc)
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false))
    }, [categorySlug, procedureSlug])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </main>
        )
    }

    if (notFound || !category || !procedure) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-lg">Procedimiento no encontrado.</p>
                <Link href="/" className="btn-primary">
                    Volver al inicio <ArrowRight className="w-4 h-4" />
                </Link>
            </main>
        )
    }

    const categoryPath = `/${category.urlPath || category.slug}`
    const whatsappText = encodeURIComponent(
        `Hola, me interesa obtener más información sobre ${procedure.name}.`
    )

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors">
                            {tCommon('breadcrumbs.home')}
                        </Link>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        <Link href={categoryPath} className="hover:text-white transition-colors">
                            {category.name}
                        </Link>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        <span className="text-accent">{procedure.name}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-accent mb-6"
                        >
                            {category.name}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white mb-6"
                        >
                            {procedure.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 leading-relaxed"
                        >
                            Conoce todos los detalles sobre este procedimiento y resuelve tus dudas
                            con el Dr. Manuel Sinchi en una consulta personalizada.
                        </motion.p>

                        {/* CTA inline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mt-10"
                        >
                            <Link href="/reservar" className="btn-primary">
                                <CalendarCheck className="w-5 h-5" />
                                Agendar consulta
                            </Link>
                            <a
                                href={`https://wa.me/51961360074?text=${whatsappText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Consultar por WhatsApp
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl"
                    >
                        {[
                            { value: '15+', label: tCommon('stats.yearsExperience') },
                            { value: '5000+', label: 'Procedimientos realizados' },
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

            {/* Trust Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Seguridad garantizada',
                                desc: 'Procedimientos realizados con los más altos estándares de seguridad y tecnología de punta.',
                            },
                            {
                                icon: Award,
                                title: 'Especialista certificado',
                                desc: 'El Dr. Manuel Sinchi cuenta con certificaciones internacionales y más de 15 años de experiencia.',
                            },
                            {
                                icon: Phone,
                                title: 'Atención personalizada',
                                desc: 'Consulta individualizada para evaluar tu caso y diseñar el plan ideal para tus objetivos.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-card p-6 text-center"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
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
                                    href={`https://wa.me/51961360074?text=${whatsappText}`}
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
