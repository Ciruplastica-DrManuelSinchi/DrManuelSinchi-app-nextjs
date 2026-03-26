'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles, ArrowRight, Camera, Loader2 } from 'lucide-react'
import BeforeAfterSlider from '@/app/components/ui/before-after-slider/BeforeAfterSlider'
import CaseModal from '@/app/components/ui/case-modal/CaseModal'

interface Case {
    id: string
    procedure: string
    category: string
    categoryLabel: string
    categoryPath: string
    patientInfo: string
    description: string
    beforeImage: string
    afterImage: string
    procedureSlug: string
    orientation?: 'portrait' | 'landscape'
}

export default function CasosReales() {
    const t = useTranslations('realCasesPage')

    const [cases, setCases] = useState<Case[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<string>('todos')
    const [selectedCase, setSelectedCase] = useState<Case | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Cargar casos desde la API
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch('/api/cases')
                const data = await res.json()
                if (res.ok) {
                    setCases(data.cases)
                }
            } catch (error) {
                console.error('Error loading cases:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCases()
    }, [])

    // Categorías únicas derivadas de los casos cargados — se actualiza automáticamente
    const derivedCategories = useMemo(() => {
        const seen = new Set<string>()
        const cats: { slug: string; label: string }[] = []
        for (const c of cases) {
            if (!seen.has(c.category)) {
                seen.add(c.category)
                cats.push({ slug: c.category, label: c.categoryLabel })
            }
        }
        return cats
    }, [cases])

    const filteredCases = useMemo(() => {
        if (activeFilter === 'todos') return cases
        return cases.filter(c => c.category === activeFilter)
    }, [activeFilter, cases])

    const currentIndex = useMemo(() => {
        if (!selectedCase) return 0
        return filteredCases.findIndex(c => c.id === selectedCase.id)
    }, [selectedCase, filteredCases])

    const handleCaseClick = (caseItem: Case) => {
        setSelectedCase(caseItem)
        setIsModalOpen(true)
    }

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (!selectedCase) return

        const newIndex = direction === 'prev'
            ? Math.max(0, currentIndex - 1)
            : Math.min(filteredCases.length - 1, currentIndex + 1)

        setSelectedCase(filteredCases[newIndex])
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedCase(null), 300)
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
                            {t('breadcrumbs.home')}
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
                            <Camera className="w-4 h-4 mr-2" />
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
                            { value: '5000+', labelKey: 'procedures' },
                            { value: '98%', labelKey: 'satisfaction' },
                            { value: '15+', labelKey: 'experience' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center md:text-left">
                                <div className="text-2xl md:text-4xl font-display font-bold text-accent">
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-white/60 mt-1">
                                    {t(`stats.${stat.labelKey}`)}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Cases Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : (
                        <>
                    {/* Filter Tabs — dinámicos según categorías en BD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {/* Tab "Todos" siempre primero */}
                        <button
                            onClick={() => setActiveFilter('todos')}
                            className={`
                                px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                                ${activeFilter === 'todos'
                                    ? 'bg-primary text-white shadow-medium'
                                    : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary shadow-soft'
                                }
                            `}
                        >
                            {t('filters.all')}
                            <span className={`
                                ml-2 text-xs px-2 py-0.5 rounded-full
                                ${activeFilter === 'todos'
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-100 text-gray-500'
                                }
                            `}>
                                {cases.length}
                            </span>
                        </button>

                        {/* Tabs de categoría derivados automáticamente */}
                        {derivedCategories.map((cat) => {
                            const count = cases.filter(c => c.category === cat.slug).length
                            return (
                                <button
                                    key={cat.slug}
                                    onClick={() => setActiveFilter(cat.slug)}
                                    className={`
                                        px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                                        ${activeFilter === cat.slug
                                            ? 'bg-primary text-white shadow-medium'
                                            : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary shadow-soft'
                                        }
                                    `}
                                >
                                    {cat.label}
                                    <span className={`
                                        ml-2 text-xs px-2 py-0.5 rounded-full
                                        ${activeFilter === cat.slug
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                        }
                                    `}>
                                        {count}
                                    </span>
                                </button>
                            )
                        })}
                    </motion.div>

                    {/* Cases Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredCases.map((caseItem, index) => (
                                <motion.div
                                    key={caseItem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleCaseClick(caseItem)}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-elevation-4 transition-all duration-300">
                                        {/* Before/After Slider */}
                                        <div className="pointer-events-none">
                                            <BeforeAfterSlider
                                                beforeImage={caseItem.beforeImage}
                                                afterImage={caseItem.afterImage}
                                                className="!rounded-t-2xl !rounded-b-none"
                                            />
                                        </div>

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none rounded-t-2xl" />

                                        {/* Click indicator */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            {t('viewDetail')}
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                                                {caseItem.categoryLabel}
                                            </span>
                                            <h3 className="text-lg font-semibold text-dark mt-1 group-hover:text-primary transition-colors">
                                                {caseItem.procedure}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {caseItem.patientInfo}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredCases.length === 0 && (
                        <div className="text-center py-16">
                            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">{t('emptyState')}</p>
                        </div>
                    )}
                        </>
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
                                {t('cta.title')}
                            </h2>
                            <p className="text-white/80 mb-8">
                                {t('cta.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contacto" className="btn-primary">
                                    {t('cta.scheduleButton')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href={`https://wa.me/51961360074?text=${encodeURIComponent(t('cta.whatsappMessage'))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    {t('cta.whatsappButton')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Modal */}
            <CaseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                currentCase={selectedCase}
                cases={filteredCases}
                onNavigate={handleNavigate}
                currentIndex={currentIndex}
            />
        </main>
    )
}
