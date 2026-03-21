'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    Clock,
    Shield,
    Sparkles,
    ArrowRight
} from 'lucide-react'

type Category = 'todos' | 'nariz' | 'ojos' | 'rostro' | 'contorno'

interface Procedure {
    id: number
    slug: string
    name: string
    shortDescription: string
    duration: string
    recovery: string
    category: Category[]
    image: string
    popular?: boolean
}

const procedures: Procedure[] = [
    {
        id: 1,
        slug: 'blefaroplastia',
        name: 'Blefaroplastia',
        shortDescription: 'Rejuvenecimiento de párpados eliminando exceso de piel y bolsas.',
        duration: '1-2 horas',
        recovery: '5-7 días',
        category: ['ojos'],
        image: '/images/procedures/blefaroplastia.jpg',
        popular: true,
    },
    {
        id: 2,
        slug: 'lifting-facial',
        name: 'Lifting / Fox-eyes',
        shortDescription: 'Lifting de cejas, Fox-eyes, lifting frontal, facial y cervical.',
        duration: '1-4 horas',
        recovery: '7-21 días',
        category: ['ojos', 'rostro'],
        image: '/images/procedures/lifting-facial.jpg',
        popular: true,
    },
    {
        id: 3,
        slug: 'rinoplastia',
        name: 'Rinoplastia',
        shortDescription: 'Corrección estética y funcional de la nariz para lograr armonía facial.',
        duration: '2-3 horas',
        recovery: '7-10 días',
        category: ['nariz'],
        image: '/images/procedures/rinoplastia.jpg',
        popular: true,
    },
    {
        id: 4,
        slug: 'rellenos-faciales',
        name: 'Rellenos Faciales',
        shortDescription: 'Restaura volumen con grasa autóloga, ácido hialurónico o implantes.',
        duration: '30-90 min',
        recovery: '3-14 días',
        category: ['rostro'],
        image: '/images/procedures/rellenos-faciales.jpg',
    },
    {
        id: 5,
        slug: 'otoplastia',
        name: 'Otoplastia',
        shortDescription: 'Corrección de orejas prominentes, reducción o reconstrucción.',
        duration: '1-2 horas',
        recovery: '7 días',
        category: ['rostro'],
        image: '/images/procedures/otoplastia.jpg',
    },
    {
        id: 6,
        slug: 'extraccion-lunares',
        name: 'Extracción de Lunares',
        shortDescription: 'Remoción segura de lunares y lesiones cutáneas con análisis patológico.',
        duration: '15-30 min',
        recovery: '5-7 días',
        category: ['rostro'],
        image: '/images/procedures/extraccion-de-lunares.jpg',
    },
    {
        id: 7,
        slug: 'mentoplastia',
        name: 'Mentoplastia',
        shortDescription: 'Aumento o reducción del mentón para equilibrar el perfil facial.',
        duration: '1-2 horas',
        recovery: '7-10 días',
        category: ['contorno'],
        image: '/images/procedures/mentoplastia.jpg',
    },
    {
        id: 8,
        slug: 'lipo-papada',
        name: 'Liposucción de Papada',
        shortDescription: 'Eliminación de grasa submentoniana para definir el contorno del cuello.',
        duration: '1 hora',
        recovery: '5-7 días',
        category: ['contorno'],
        image: '/images/procedures/lipo-papada.jpg',
    },
    {
        id: 9,
        slug: 'bichectomia',
        name: 'Bichectomía',
        shortDescription: 'Extracción de bolsas de Bichat para afinar las mejillas.',
        duration: '45 min',
        recovery: '3-5 días',
        category: ['contorno'],
        image: '/images/procedures/bichectomia.jpg',
        popular: true,
    },
    {
        id: 10,
        slug: 'aumento-pomulos',
        name: 'Aumento de Pómulos',
        shortDescription: 'Realza tus pómulos con grasa autóloga o implantes de silicona.',
        duration: '45-90 min',
        recovery: '7-14 días',
        category: ['contorno'],
        image: '/images/procedures/aumento-de-pomulos.jpg',
    },
    {
        id: 11,
        slug: 'marcacion-mandibular',
        name: 'Marcación Mandibular',
        shortDescription: 'Define tu línea mandibular con grasa o implantes.',
        duration: '1-2 horas',
        recovery: '10-14 días',
        category: ['contorno'],
        image: '/images/procedures/marcacion-mandibular.jpg',
    },
    {
        id: 12,
        slug: 'afinamiento-facial',
        name: 'Afinamiento Facial',
        shortDescription: 'Combinación de bichectomía, lipo de papada, marcación y mentoplastia.',
        duration: '2-3 horas',
        recovery: '14-21 días',
        category: ['contorno'],
        image: '/images/procedures/afinamiento-facial.jpg',
    },
    {
        id: 13,
        slug: 'perfiloplastia',
        name: 'Perfiloplastia',
        shortDescription: 'Armoniza tu perfil combinando rinoplastia con mentoplastia.',
        duration: '2-4 horas',
        recovery: '14-21 días',
        category: ['nariz', 'contorno'],
        image: '/images/procedures/perfiloplastia.jpg',
    },
]

const categories = [
    { id: 'todos' as Category, label: 'Todos', count: procedures.length },
    { id: 'nariz' as Category, label: 'Nariz', count: procedures.filter(p => p.category.includes('nariz')).length },
    { id: 'ojos' as Category, label: 'Ojos', count: procedures.filter(p => p.category.includes('ojos')).length },
    { id: 'rostro' as Category, label: 'Rostro', count: procedures.filter(p => p.category.includes('rostro')).length },
    { id: 'contorno' as Category, label: 'Contorno', count: procedures.filter(p => p.category.includes('contorno')).length },
]

export default function CirugiaPlasticaFacial() {
    const [activeCategory, setActiveCategory] = useState<Category>('todos')

    const filteredProcedures = activeCategory === 'todos'
        ? procedures
        : procedures.filter(p => p.category.includes(activeCategory))

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-accent">Cirugía Plástica Facial</span>
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
                            Cirugía Plástica Facial
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 leading-relaxed"
                        >
                            Procedimientos diseñados para realzar tu belleza natural y corregir
                            imperfecciones con técnicas avanzadas y resultados armónicos.
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
                            { value: '15+', label: 'Años de experiencia' },
                            { value: '2000+', label: 'Cirugías faciales' },
                            { value: '98%', label: 'Satisfacción' },
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

            {/* Filters & Procedures Section */}
            <section className="section bg-light">
                <div className="container-custom">
                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                                    ${activeCategory === cat.id
                                        ? 'bg-primary text-white shadow-medium'
                                        : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary shadow-soft'
                                    }
                                `}
                            >
                                {cat.label}
                                <span className={`
                                    ml-2 text-xs px-2 py-0.5 rounded-full
                                    ${activeCategory === cat.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-500'
                                    }
                                `}>
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Procedures Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredProcedures.map((procedure, index) => (
                                <motion.div
                                    key={procedure.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/cirugia-plastica-facial/${procedure.slug}`}>
                                        <div className="card-hover group h-full">
                                            {/* Image */}
                                            <div className="relative aspect-procedure overflow-hidden rounded-t-2xl">
                                                <Image
                                                    src={procedure.image}
                                                    alt={procedure.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Popular Badge */}
                                                {procedure.popular && (
                                                    <span className="absolute top-4 left-4 bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                                                        Popular
                                                    </span>
                                                )}

                                                {/* Title on Image */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-white text-xl font-display font-semibold">
                                                        {procedure.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                    {procedure.shortDescription}
                                                </p>

                                                {/* Info Pills */}
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Clock className="w-4 h-4 text-primary" />
                                                        {procedure.duration}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Shield className="w-4 h-4 text-primary" />
                                                        {procedure.recovery}
                                                    </div>
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                                                    Ver más información
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl mb-4">
                                Agenda tu consulta de valoración
                            </h2>
                            <p className="text-white/80 mb-8">
                                Recibe una evaluación personalizada y conoce cuál es el mejor
                                procedimiento para lograr tus objetivos estéticos.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contacto" className="btn-primary">
                                    Agendar Cita
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="https://wa.me/51961360074"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    Consulta por WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
