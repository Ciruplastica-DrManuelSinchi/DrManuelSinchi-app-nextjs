'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    HelpCircle,
    Search,
    Plus,
    Minus,
    MessageCircle,
    Phone,
    ArrowRight,
    Sparkles,
    Shield,
    Clock,
    CreditCard,
    Stethoscope,
    Heart
} from 'lucide-react'

// Tipos
interface FAQItem {
    id: string
    question: string
    answer: string
    category: string
}

interface FAQCategory {
    id: string
    label: string
    icon: React.ReactNode
    color: string
}

export default function PreguntasFrecuentes() {
    const t = useTranslations('faqPage')
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [openId, setOpenId] = useState<string | null>(null)

    // Categorías de FAQ
    const categories: FAQCategory[] = [
        { id: 'all', label: t('categories.all'), icon: <Sparkles className="w-4 h-4" />, color: 'primary' },
        { id: 'general', label: t('categories.general'), icon: <HelpCircle className="w-4 h-4" />, color: 'blue' },
        { id: 'procedures', label: t('categories.procedures'), icon: <Stethoscope className="w-4 h-4" />, color: 'purple' },
        { id: 'recovery', label: t('categories.recovery'), icon: <Heart className="w-4 h-4" />, color: 'red' },
        { id: 'safety', label: t('categories.safety'), icon: <Shield className="w-4 h-4" />, color: 'green' },
        { id: 'costs', label: t('categories.costs'), icon: <CreditCard className="w-4 h-4" />, color: 'amber' },
        { id: 'scheduling', label: t('categories.scheduling'), icon: <Clock className="w-4 h-4" />, color: 'cyan' },
    ]

    // FAQs con traducciones
    const faqItems: FAQItem[] = useMemo(() => [
        // General
        { id: 'g1', category: 'general', question: t('items.g1.question'), answer: t('items.g1.answer') },
        { id: 'g2', category: 'general', question: t('items.g2.question'), answer: t('items.g2.answer') },
        { id: 'g3', category: 'general', question: t('items.g3.question'), answer: t('items.g3.answer') },
        { id: 'g4', category: 'general', question: t('items.g4.question'), answer: t('items.g4.answer') },

        // Procedimientos
        { id: 'p1', category: 'procedures', question: t('items.p1.question'), answer: t('items.p1.answer') },
        { id: 'p2', category: 'procedures', question: t('items.p2.question'), answer: t('items.p2.answer') },
        { id: 'p3', category: 'procedures', question: t('items.p3.question'), answer: t('items.p3.answer') },
        { id: 'p4', category: 'procedures', question: t('items.p4.question'), answer: t('items.p4.answer') },
        { id: 'p5', category: 'procedures', question: t('items.p5.question'), answer: t('items.p5.answer') },

        // Recuperación
        { id: 'r1', category: 'recovery', question: t('items.r1.question'), answer: t('items.r1.answer') },
        { id: 'r2', category: 'recovery', question: t('items.r2.question'), answer: t('items.r2.answer') },
        { id: 'r3', category: 'recovery', question: t('items.r3.question'), answer: t('items.r3.answer') },
        { id: 'r4', category: 'recovery', question: t('items.r4.question'), answer: t('items.r4.answer') },

        // Seguridad
        { id: 's1', category: 'safety', question: t('items.s1.question'), answer: t('items.s1.answer') },
        { id: 's2', category: 'safety', question: t('items.s2.question'), answer: t('items.s2.answer') },
        { id: 's3', category: 'safety', question: t('items.s3.question'), answer: t('items.s3.answer') },
        { id: 's4', category: 'safety', question: t('items.s4.question'), answer: t('items.s4.answer') },

        // Costos
        { id: 'c1', category: 'costs', question: t('items.c1.question'), answer: t('items.c1.answer') },
        { id: 'c2', category: 'costs', question: t('items.c2.question'), answer: t('items.c2.answer') },
        { id: 'c3', category: 'costs', question: t('items.c3.question'), answer: t('items.c3.answer') },
        { id: 'c4', category: 'costs', question: t('items.c4.question'), answer: t('items.c4.answer') },

        // Agendamiento
        { id: 'a1', category: 'scheduling', question: t('items.a1.question'), answer: t('items.a1.answer') },
        { id: 'a2', category: 'scheduling', question: t('items.a2.question'), answer: t('items.a2.answer') },
        { id: 'a3', category: 'scheduling', question: t('items.a3.question'), answer: t('items.a3.answer') },
    ], [t])

    // Filtrar FAQs
    const filteredFAQs = useMemo(() => {
        let filtered = faqItems

        // Filtrar por categoría
        if (activeFilter !== 'all') {
            filtered = filtered.filter(item => item.category === activeFilter)
        }

        // Filtrar por búsqueda
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                item =>
                    item.question.toLowerCase().includes(query) ||
                    item.answer.toLowerCase().includes(query)
            )
        }

        return filtered
    }, [faqItems, activeFilter, searchQuery])

    // Toggle FAQ
    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    // Conteo por categoría
    const getCategoryCount = (categoryId: string) => {
        if (categoryId === 'all') return faqItems.length
        return faqItems.filter(item => item.category === categoryId).length
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
                            <HelpCircle className="w-4 h-4 mr-2" />
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

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 max-w-2xl"
                    >
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl"
                    >
                        {[
                            { value: `${faqItems.length}+`, labelKey: 'totalQuestions' },
                            { value: `${categories.length - 1}`, labelKey: 'categories' },
                            { value: '24/7', labelKey: 'support' },
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

            {/* FAQ Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveFilter(category.id)
                                    setOpenId(null)
                                }}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                                    ${activeFilter === category.id
                                        ? 'bg-primary text-white shadow-medium'
                                        : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary shadow-soft'
                                    }
                                `}
                            >
                                {category.icon}
                                {category.label}
                                <span className={`
                                    text-xs px-2 py-0.5 rounded-full
                                    ${activeFilter === category.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-500'
                                    }
                                `}>
                                    {getCategoryCount(category.id)}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* FAQ List */}
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFilter + searchQuery}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {filteredFAQs.map((faq, index) => {
                                    const isOpen = openId === faq.id
                                    const category = categories.find(c => c.id === faq.category)

                                    return (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className={`
                                                rounded-2xl overflow-hidden border-2 transition-all duration-300
                                                ${isOpen
                                                    ? 'bg-white border-primary/20 shadow-elevation-3'
                                                    : 'bg-white border-transparent shadow-card hover:shadow-elevation-2 hover:border-gray-100'
                                                }
                                            `}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full px-6 py-5 flex items-start gap-4 text-left"
                                            >
                                                {/* Category indicator */}
                                                <span className={`
                                                    flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all
                                                    ${isOpen
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-100 text-gray-500'
                                                    }
                                                `}>
                                                    {category?.icon}
                                                </span>

                                                <div className="flex-1 min-w-0">
                                                    {/* Category label */}
                                                    <span className={`
                                                        text-xs font-semibold uppercase tracking-wider mb-1 block
                                                        ${isOpen ? 'text-primary' : 'text-gray-400'}
                                                    `}>
                                                        {category?.label}
                                                    </span>

                                                    {/* Question */}
                                                    <span className={`
                                                        font-semibold text-base md:text-lg transition-colors block
                                                        ${isOpen ? 'text-primary' : 'text-dark'}
                                                    `}>
                                                        {faq.question}
                                                    </span>
                                                </div>

                                                {/* Toggle icon */}
                                                <span className={`
                                                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all
                                                    ${isOpen
                                                        ? 'bg-primary text-white rotate-0'
                                                        : 'bg-gray-100 text-gray-500'
                                                    }
                                                `}>
                                                    {isOpen ? (
                                                        <Minus className="w-5 h-5" />
                                                    ) : (
                                                        <Plus className="w-5 h-5" />
                                                    )}
                                                </span>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pl-20">
                                                            <div className="prose prose-gray max-w-none">
                                                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                                    {faq.answer}
                                                                </p>
                                                            </div>

                                                            {/* Quick contact */}
                                                            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                                                                <span className="text-sm text-gray-500">
                                                                    {t('needMoreHelp')}
                                                                </span>
                                                                <a
                                                                    href="https://wa.me/51961360074"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
                                                                >
                                                                    <MessageCircle className="w-4 h-4" />
                                                                    WhatsApp
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* Empty State */}
                        {filteredFAQs.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-16 bg-white rounded-2xl shadow-card"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-dark mb-2">
                                    {t('emptyState.title')}
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {t('emptyState.description')}
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setActiveFilter('all')
                                    }}
                                    className="text-primary font-medium hover:text-primary-dark transition-colors"
                                >
                                    {t('emptyState.reset')}
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 md:p-12"
                    >
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Left content */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display text-dark mb-4">
                                    {t('contact.title')}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {t('contact.description')}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <MessageCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-dark">{t('contact.whatsapp')}</p>
                                            <p className="text-sm text-gray-500">{t('contact.whatsappDesc')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-dark">{t('contact.phone')}</p>
                                            <p className="text-sm text-gray-500">961 360 074</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - CTA */}
                            <div className="lg:text-right">
                                <div className="inline-flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/51961360074?text=Hola%2C%20tengo%20una%20consulta"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary bg-green-500 hover:bg-green-600 border-green-500"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        {t('contact.whatsappBtn')}
                                    </a>
                                    <Link href="/reservar" className="btn-primary">
                                        {t('contact.scheduleBtn')}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-white text-2xl md:text-3xl lg:text-4xl mb-4"
                            >
                                {t('cta.title')}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/80 mb-8"
                            >
                                {t('cta.description')}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link href="/reservar" className="btn-primary">
                                    {t('cta.scheduleBtn')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/casos-reales" className="btn-secondary">
                                    {t('cta.casesBtn')}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
