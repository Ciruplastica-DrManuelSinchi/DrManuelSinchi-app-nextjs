'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
    { id: 'facial', name: 'Cirugía Facial' },
    { id: 'corporal', name: 'Cirugía Corporal' },
    { id: 'estetica', name: 'Medicina Estética' },
    { id: 'reconstructiva', name: 'Reconstructiva' },
]

const procedures = {
    facial: [
        { name: 'Rinoplastia', desc: 'Cirugía de nariz para mejorar forma y función', slug: 'rinoplastia', image: '/images/procedures/rinoplastia.jpg' },
        { name: 'Blefaroplastia', desc: 'Rejuvenecimiento del contorno de ojos', slug: 'blefaroplastia', image: '/images/procedures/blefaroplastia.jpg' },
        { name: 'Lifting Facial', desc: 'Estiramiento facial para rejuvenecer', slug: 'lifting-facial', image: '/images/procedures/lifting-facial.jpg' },
        { name: 'Bichectomía', desc: 'Afinamiento del rostro', slug: 'bichectomia', image: '/images/procedures/bichectomia.jpg' },
    ],
    corporal: [
        { name: 'Lipoescultura', desc: 'Moldea tu figura eliminando grasa localizada', slug: 'lipo-escultura', image: '/images/procedures/lipoescultura.jpg' },
        { name: 'Abdominoplastia', desc: 'Abdomen plano y tonificado', slug: 'abdominoplastia', image: '/images/procedures/abdominoplastia.jpg' },
        { name: 'Mamoplastia', desc: 'Aumento o reducción mamaria', slug: 'mamoplastia-aumento', image: '/images/procedures/mamoplastia-aumento.jpg' },
        { name: 'Gluteoplastia', desc: 'Aumento y levantamiento de glúteos', slug: 'gluteoplastia', image: '/images/procedures/gluteoplastia.jpg' },
    ],
    estetica: [
        { name: 'Botox', desc: 'Elimina arrugas de expresión', slug: 'botox', image: '/images/procedures/botox.jpg' },
        { name: 'Ácido Hialurónico', desc: 'Relleno facial para mayor volumen', slug: 'acido-hialuronico', image: '/images/procedures/acido-hialuronico.jpg' },
        { name: 'Relleno de Labios', desc: 'Labios más voluminosos y definidos', slug: 'rellenos-labios', image: '/images/procedures/relleno-labios.jpg' },
        { name: 'PRP', desc: 'Plasma rico en plaquetas rejuvenecedor', slug: 'plasma-rico-plaquetas', image: '/images/procedures/prp.jpg' },
    ],
    reconstructiva: [
        { name: 'Cicatrices', desc: 'Tratamiento y corrección de cicatrices', slug: 'cicatrices', image: '/images/procedures/cicatrices.jpg' },
        { name: 'Quemaduras', desc: 'Reconstrucción por quemaduras', slug: 'quemaduras', image: '/images/procedures/quemaduras.jpg' },
        { name: 'Heridas y úlceras complejas', desc: 'Tratamiento de úlceras y heridas', slug: 'heridas-ulceras', image: '/images/procedures/heridas-y-ulceras-complejas.jpg' },
    ],
}

const categoryPaths: Record<string, string> = {
    facial: 'cirugia-plastica-facial',
    corporal: 'cirugia-plastica-corporal',
    estetica: 'medicina-estetica',
    reconstructiva: 'cirugia-reconstructiva',
}

export default function Procedures() {
    const [activeCategory, setActiveCategory] = useState('facial')

    return (
        <section className="section bg-light-gradient">
            <div className="container-custom">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">Nuestros Procedimientos</h2>
                    <p className="section-subtitle">
                        Tratamientos personalizados para cada necesidad
                    </p>
                </div>

                {/* Tabs de categorías */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Grid de procedimientos */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {/*Mostrar contenido seleccionado */}
                        {procedures[activeCategory as keyof typeof procedures].map((proc, index) => (
                            <motion.div
                                key={proc.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/${categoryPaths[activeCategory]}/${proc.slug}`}
                                    className="card-hover block overflow-hidden group"
                                >
                                    {/* Imagen */}
                                    <div className="relative aspect-procedure overflow-hidden bg-primary-100">
                                        <Image
                                            src={proc.image}
                                            alt={proc.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-dark mb-2">
                                            {proc.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {proc.desc}
                                        </p>
                                        <span className="link text-sm">
                                            Conocer más
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Link ver todos */}
                <div className="text-center mt-12">
                    <Link
                        href={`/${categoryPaths[activeCategory]}`}
                        className="link text-primary"
                    >
                        Ver todos los procedimientos
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
