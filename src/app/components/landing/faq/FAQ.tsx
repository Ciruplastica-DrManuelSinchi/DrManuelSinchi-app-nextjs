'use client'

import { useState } from 'react'
import { Plus, Minus, MessageCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

const faqKeys = ['recovery', 'permanent', 'anesthesia', 'financing', 'finalResults'] as const

export default function FAQ() {
    const t = useTranslations('faq')
    const locale = useLocale()
    const [openId, setOpenId] = useState<number>(0)

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? -1 : id)
    }

    const whatsappMessage = locale === 'en'
        ? 'Hello, I have a question about the procedures'
        : 'Hola, tengo una consulta sobre los procedimientos'
    const whatsappLink = `https://api.whatsapp.com/send?phone=51961360074&text=${encodeURIComponent(whatsappMessage)}`

    return (
        <section className="section bg-gradient-to-b from-gray-50 to-white">
            <div className="container-custom">
                {/* Header centrado */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-display text-3xl md:text-4xl text-dark mb-3">
                        {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Lista de FAQs */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqKeys.map((key, index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                                openId === index
                                    ? 'bg-white border-primary/20 shadow-md'
                                    : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className={`font-medium pr-4 transition-colors ${
                                    openId === index ? 'text-primary' : 'text-dark'
                                }`}>
                                    {t(`items.${key}.question`)}
                                </span>
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    openId === index
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {openId === index ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
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
                                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                            {t(`items.${key}.answer`)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA inferior */}
                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-gray-500 mb-4">{t('moreQuestions')}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-green-600 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            {t('askWhatsApp')}
                        </a>
                        <Link
                            href="/preguntas-frecuentes"
                            className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
                        >
                            {t('viewAll')}
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
