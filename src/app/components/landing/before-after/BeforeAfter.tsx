'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const cases = [
    {
        id: 1,
        procedure: 'Rinoplastia',
        detail: 'Paciente femenina, 28 años',
        beforeImage: '/images/before-after/rinoplastia-before.jpg',
        afterImage: '/images/before-after/rinoplastia-after.jpg',
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
                <div className="section-header">
                    <h2 className="section-title">Casos Reales</h2>
                    <p className="section-subtitle">
                        Resultados verificables de nuestros pacientes
                    </p>
                </div>

                {/* Grid de casos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((caseItem, index) => (
                        <motion.div
                            key={caseItem.id}
                            className="card-hover overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Imagen antes/después */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                {/* Imagen Before (izquierda) */}
                                <div className="absolute inset-0 w-1/2 overflow-hidden">
                                    <Image
                                        src={caseItem.beforeImage}
                                        alt={`${caseItem.procedure} - Antes`}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                                        Antes
                                    </span>
                                </div>

                                {/* Imagen After (derecha) */}
                                <div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
                                    <Image
                                        src={caseItem.afterImage}
                                        alt={`${caseItem.procedure} - Después`}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-3 right-3 bg-accent text-dark text-xs px-3 py-1 rounded-full font-semibold">
                                        Después
                                    </span>
                                </div>

                                {/* Línea divisoria */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-white -translate-x-1/2 z-10" />
                            </div>

                            {/* Info del caso */}
                            <div className="p-5">
                                <h3 className="font-semibold text-dark text-lg">
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
                <div className="text-center mt-12">
                    <Link href="/casos-reales" className="link text-primary">
                        Ver todos los casos
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
