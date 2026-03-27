'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import BeforeAfterSlider from '@/app/components/ui/before-after-slider/BeforeAfterSlider'

const cases = [
    {
        id: 1,
        procedure: 'Rinoplastia',
        detail: 'Paciente femenina, 28 años',
        quote: 'El resultado superó todas mis expectativas',
        beforeImage: '/images/before-after/rinoplastia-before.jpg',
        afterImage: '/images/before-after/rinoplastia-after.png',
    },
    {
        id: 2,
        procedure: 'Lipoescultura',
        detail: 'Paciente femenina, 35 años',
        quote: 'Me devolvió la confianza que necesitaba',
        beforeImage: '/images/before-after/lipoescultura-before.jpg',
        afterImage: '/images/before-after/lipoescultura-after.jpg',
    },
    {
        id: 3,
        procedure: 'Blefaroplastia',
        detail: 'Paciente femenina, 45 años',
        quote: 'Luzco exactamente como me sentía por dentro',
        beforeImage: '/images/before-after/blefaroplastia-before.jpg',
        afterImage: '/images/before-after/blefaroplastia-after.jpg',
    },
]

export default function BeforeAfter() {
    const t = useTranslations('beforeAfterSection')

    return (
        <section className="section bg-primary">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge-accent mb-4">{t('badge')}</span>
                    <h2 className="section-title text-white">{t('title')}</h2>
                    <p className="section-subtitle text-gray-300">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Grid de 3 casos con la misma altura */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((caseItem, index) => (
                        <motion.div
                            key={caseItem.id}
                            className="group flex flex-col gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                        >
                            {/* Slider */}
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <BeforeAfterSlider
                                    beforeImage={caseItem.beforeImage}
                                    afterImage={caseItem.afterImage}
                                    aspectClass="aspect-[3/4]"
                                    className="relative shadow-elevation-2 group-hover:shadow-elevation-4 transition-shadow duration-500"
                                />
                            </div>

                            {/* Info del caso */}
                            <div className="text-center px-1">
                                <h3 className="font-semibold text-white group-hover:text-accent transition-colors text-lg">
                                    {caseItem.procedure}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {caseItem.detail}
                                </p>
                                <p className="text-sm text-accent/80 italic mt-2">
                                    &ldquo;{caseItem.quote}&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Link Ver más */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="/casos-reales"
                        className="group inline-flex items-center gap-2 bg-accent text-dark font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-all hover:gap-3"
                    >
                        {t('viewAll')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
