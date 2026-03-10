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

type Category = 'todos' | 'arrugas' | 'volumen' | 'rejuvenecimiento' | 'piel'

interface Treatment {
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

const treatments: Treatment[] = [
    {
        id: 1,
        slug: 'botox',
        name: 'Botox',
        shortDescription: 'Suaviza arrugas de expresión y previene nuevas líneas para un rostro más joven y descansado.',
        duration: '15-30 min',
        recovery: 'Inmediata',
        category: ['arrugas'],
        image: '/images/procedures/botox.jpg',
        popular: true,
    },
    {
        id: 2,
        slug: 'acido-hialuronico',
        name: 'Ácido Hialurónico',
        shortDescription: 'Rellena arrugas, restaura volumen y mejora la hidratación profunda de la piel.',
        duration: '30-45 min',
        recovery: 'Inmediata',
        category: ['volumen', 'arrugas'],
        image: '/images/procedures/acido-hialuronico.jpg',
        popular: true,
    },
    {
        id: 3,
        slug: 'rellenos-labios',
        name: 'Rellenos de Labios',
        shortDescription: 'Aumenta el volumen, define el contorno y mejora la simetría de tus labios.',
        duration: '20-30 min',
        recovery: 'Inmediata',
        category: ['volumen'],
        image: '/images/procedures/rellenos-labios.jpg',
        popular: true,
    },
    {
        id: 4,
        slug: 'plasma-rico-plaquetas',
        name: 'Plasma Rico en Plaquetas',
        shortDescription: 'Terapia regenerativa que rejuvenece la piel usando los factores de crecimiento de tu sangre.',
        duration: '45-60 min',
        recovery: '24-48 horas',
        category: ['rejuvenecimiento'],
        image: '/images/procedures/prp.jpg',
    },
    {
        id: 5,
        slug: 'extraccion-lunares',
        name: 'Extracción de Lunares',
        shortDescription: 'Remoción segura de lunares, verrugas y lesiones cutáneas con mínima cicatriz.',
        duration: '15-30 min',
        recovery: '5-7 días',
        category: ['piel'],
        image: '/images/procedures/extraccion-lunares.jpg',
    },
]

const categories = [
    { id: 'todos' as Category, label: 'Todos', count: treatments.length },
    { id: 'arrugas' as Category, label: 'Arrugas', count: treatments.filter(t => t.category.includes('arrugas')).length },
    { id: 'volumen' as Category, label: 'Volumen', count: treatments.filter(t => t.category.includes('volumen')).length },
    { id: 'rejuvenecimiento' as Category, label: 'Rejuvenecimiento', count: treatments.filter(t => t.category.includes('rejuvenecimiento')).length },
    { id: 'piel' as Category, label: 'Piel', count: treatments.filter(t => t.category.includes('piel')).length },
]

export default function MedicinaEstetica() {
    const [activeCategory, setActiveCategory] = useState<Category>('todos')

    const filteredTreatments = activeCategory === 'todos'
        ? treatments
        : treatments.filter(t => t.category.includes(activeCategory))

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
                        <span className="text-accent">Medicina Estética</span>
                    </nav>

                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-accent mb-6"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Tratamientos No Invasivos
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white mb-6"
                        >
                            Medicina Estética
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 leading-relaxed"
                        >
                            Rejuvenece y embellece tu rostro con tratamientos no quirúrgicos.
                            Resultados naturales sin tiempo de recuperación.
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
                            { value: '5000+', label: 'Tratamientos realizados' },
                            { value: '99%', label: 'Satisfacción' },
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

            {/* Filters & Treatments Section */}
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

                    {/* Treatments Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredTreatments.map((treatment, index) => (
                                <motion.div
                                    key={treatment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/medicina-estetica/${treatment.slug}`}>
                                        <div className="card-hover group h-full">
                                            {/* Image */}
                                            <div className="relative aspect-procedure overflow-hidden rounded-t-2xl">
                                                <Image
                                                    src={treatment.image}
                                                    alt={treatment.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Popular Badge */}
                                                {treatment.popular && (
                                                    <span className="absolute top-4 left-4 bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                                                        Popular
                                                    </span>
                                                )}

                                                {/* Title on Image */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-white text-xl font-display font-semibold">
                                                        {treatment.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                    {treatment.shortDescription}
                                                </p>

                                                {/* Info Pills */}
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Clock className="w-4 h-4 text-primary" />
                                                        {treatment.duration}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Shield className="w-4 h-4 text-primary" />
                                                        {treatment.recovery}
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
                                tratamiento para lograr tus objetivos estéticos.
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
