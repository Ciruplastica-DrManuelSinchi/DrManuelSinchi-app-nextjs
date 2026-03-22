'use client'

import { useState } from 'react'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const faqKeys = ['recovery', 'permanent', 'anesthesia', 'financing', 'finalResults'] as const

export default function FAQ() {
    const t = useTranslations('faq')
    const [openId, setOpenId] = useState<number>(0)

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? -1 : id)
    }

    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Intro */}
                    <div className="lg:col-span-2">
                        <h2 className="font-display text-3xl md:text-4xl text-dark mb-6">
                            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {t('description')}
                        </p>
                        <Link href="/preguntas-frecuentes" className="btn-primary inline-flex">
                            {t('viewAll')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Lista de FAQs */}
                    <div className="lg:col-span-3 space-y-4">
                        {faqKeys.map((key, index) => (
                            <div
                                key={key}
                                className={`rounded-xl overflow-hidden transition-colors duration-300 ${openId === index ? 'bg-primary-50' : 'bg-light'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-50 transition-colors"
                                >
                                    <span className="font-semibold text-dark pr-4">
                                        {t(`items.${key}.question`)}
                                    </span>
                                    <span className="text-primary flex-shrink-0">
                                        {openId === index ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {openId === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-gray-600">
                                                {t(`items.${key}.answer`)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
