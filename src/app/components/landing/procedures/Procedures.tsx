'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Category {
    id: string
    name: string
    slug: string
    urlPath: string | null
}

// Categorías por defecto (fallback si la API falla)
const defaultCategories: Category[] = [
    { id: 'facial', name: 'Cirugía Facial', slug: 'facial', urlPath: 'cirugia-plastica-facial' },
    { id: 'corporal', name: 'Cirugía Corporal', slug: 'corporal', urlPath: 'cirugia-plastica-corporal' },
    { id: 'estetica', name: 'Medicina Estética', slug: 'estetica', urlPath: 'medicina-estetica' },
    { id: 'reconstructiva', name: 'Reconstructiva', slug: 'reconstructiva', urlPath: 'cirugia-reconstructiva' },
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
        { name: 'Tumores y Carcinomas', desc: 'Resección oncológica con reconstrucción estética', slug: 'tumores-carcinomas', image: '/images/procedures/tumores-carcinomas.jpg' },
        { name: 'Cicatrices', desc: 'Tratamiento y corrección de cicatrices', slug: 'cicatrices', image: '/images/procedures/cicatrices.jpg' },
        { name: 'Quemaduras', desc: 'Reconstrucción por quemaduras', slug: 'quemaduras', image: '/images/procedures/quemaduras.jpg' },
        { name: 'Retiro de Biopolímeros', desc: 'Extracción segura de sustancias no autorizadas', slug: 'retiro-biopolimeros', image: '/images/procedures/retiro-biopolimeros.jpg' },
    ],
}

// Mapeo de slugs a rutas URL (fallback)
const categoryPathsMap: Record<string, string> = {
    facial: 'cirugia-plastica-facial',
    corporal: 'cirugia-plastica-corporal',
    estetica: 'medicina-estetica',
    reconstructiva: 'cirugia-reconstructiva',
}

// Componente de Card 3D
function ProcedureCard3D({
    proc,
    categoryPath,
    index,
}: {
    proc: { name: string; desc: string; slug: string; image: string }
    categoryPath: string
    index: number
}) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="relative group perspective-1000"
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

            <Link
                href={`/${categoryPath}/${proc.slug}`}
                className="relative block overflow-hidden rounded-2xl bg-white shadow-card group-hover:shadow-elevation-4 transition-shadow duration-500"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Imagen */}
                <div className="relative aspect-procedure overflow-hidden bg-primary-100">
                    <Image
                        src={proc.image}
                        alt={proc.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div
                    className="p-5 relative bg-white"
                    style={{ transform: 'translateZ(30px)' }}
                >
                    <h3 className="font-semibold text-dark mb-2 group-hover:text-primary transition-colors duration-300">
                        {proc.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {proc.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
                        Conocer más
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
            </Link>
        </motion.div>
    )
}

export default function Procedures() {
    const [categories, setCategories] = useState<Category[]>(defaultCategories)
    const [activeCategory, setActiveCategory] = useState('facial')

    // Cargar categorías desde la API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories')
                const data = await res.json()
                if (res.ok && data.categories?.length > 0) {
                    setCategories(data.categories)
                    // Establecer la primera categoría como activa
                    setActiveCategory(data.categories[0].slug)
                }
            } catch (error) {
                console.error('Error fetching categories:', error)
                // Mantener las categorías por defecto
            }
        }
        fetchCategories()
    }, [])

    // Obtener la ruta URL de la categoría activa
    const getActiveCategoryPath = () => {
        const category = categories.find(c => c.slug === activeCategory)
        return category?.urlPath || categoryPathsMap[activeCategory] || activeCategory
    }

    return (
        <section className="section bg-light-gradient">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge-primary mb-4">Especialidades</span>
                    <h2 className="section-title">Nuestros Procedimientos</h2>
                    <p className="section-subtitle">
                        Tratamientos personalizados con técnicas de vanguardia
                    </p>
                </motion.div>

                {/* Tabs de categorías */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.slug)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeCategory === category.slug
                                ? 'bg-primary text-white shadow-glow-primary-sm'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {activeCategory === category.slug && (
                                <motion.span
                                    className="absolute inset-0 bg-primary"
                                    layoutId="activeTab"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{category.name}</span>
                        </motion.button>
                    ))}
                </motion.div>

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
                        {procedures[activeCategory as keyof typeof procedures]?.map((proc, index) => (
                            <ProcedureCard3D
                                key={proc.slug}
                                proc={proc}
                                categoryPath={getActiveCategoryPath()}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Link ver todos */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        href={`/${getActiveCategoryPath()}`}
                        className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                        Ver todos los procedimientos
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
