'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import BeforeAfterSlider from '@/app/components/ui/before-after-slider/BeforeAfterSlider'

const cases = [
    {
        id: 1,
        procedure: 'Rinoplastia',
        detail: 'Paciente femenina, 28 años',
        beforeImage: '/images/before-after/rinoplastia-before.jpg',
        afterImage: '/images/before-after/rinoplastia-after.png',
    },
    {
        id: 2,
        procedure: 'Lipoescultura',
        detail: 'Paciente femenina, 35 años',
        beforeImage: '/images/before-after/lipoescultura-before.jpg',
        afterImage: '/images/before-after/lipoescultura-after.jpg',
    },
    {
        id: 3,
        procedure: 'Blefaroplastia',
        detail: 'Paciente femenina, 45 años',
        beforeImage: '/images/before-after/blefaroplastia-before.jpg',
        afterImage: '/images/before-after/blefaroplastia-after.jpg',
    },
]

export default function BeforeAfter() {
    return (
        <section className="section bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge-accent mb-4">Resultados Reales</span>
                    <h2 className="section-title">Casos Antes y Después</h2>
                    <p className="section-subtitle">
                        Desliza para comparar los resultados de nuestros pacientes
                    </p>
                </motion.div>

                {/* Grid de casos con slider interactivo */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cases.map((caseItem, index) => (
                        <motion.div
                            key={caseItem.id}
                            className="group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                        >
                            {/* Slider interactivo */}
                            <div className="relative">
                                {/* Glow effect on hover */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <BeforeAfterSlider
                                    beforeImage={caseItem.beforeImage}
                                    afterImage={caseItem.afterImage}
                                    className="relative shadow-elevation-2 group-hover:shadow-elevation-4 transition-shadow duration-500"
                                />
                            </div>

                            {/* Info del caso */}
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-dark text-lg group-hover:text-primary transition-colors">
                                    {caseItem.procedure}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {caseItem.detail}
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
                        className="group inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-all hover:gap-3"
                    >
                        Ver todos los casos
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
