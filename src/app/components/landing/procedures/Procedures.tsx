'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

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
        { nameKey: 'rhinoplasty', descKey: 'rhinoplastyDesc', slug: 'rinoplastia', image: '/images/procedures/rinoplastia.jpg' },
        { nameKey: 'blepharoplasty', descKey: 'blepharoplastyDesc', slug: 'blefaroplastia', image: '/images/procedures/blefaroplastia.jpg' },
        { nameKey: 'facelift', descKey: 'faceliftDesc', slug: 'lifting-facial', image: '/images/procedures/lifting-facial.jpg' },
        { nameKey: 'bichectomy', descKey: 'bichectomyDesc', slug: 'bichectomia', image: '/images/procedures/bichectomia.jpg' },
    ],
    corporal: [
        { nameKey: 'liposculpture', descKey: 'liposculptureDesc', slug: 'lipo-escultura', image: '/images/procedures/lipoescultura.jpg' },
        { nameKey: 'abdominoplasty', descKey: 'abdominoplastyDesc', slug: 'abdominoplastia', image: '/images/procedures/abdominoplastia.jpg' },
        { nameKey: 'mammoplasty', descKey: 'mammoplastyDesc', slug: 'mamoplastia-aumento', image: '/images/procedures/mamoplastia-aumento.jpg' },
        { nameKey: 'gluteoplasty', descKey: 'gluteoplastyDesc', slug: 'gluteoplastia', image: '/images/procedures/gluteoplastia.jpg' },
    ],
    estetica: [
        { nameKey: 'botox', descKey: 'botoxDesc', slug: 'botox', image: '/images/procedures/botox.jpg' },
        { nameKey: 'hyaluronicAcid', descKey: 'hyaluronicAcidDesc', slug: 'acido-hialuronico', image: '/images/procedures/acido-hialuronico.jpg' },
        { nameKey: 'lipFillers', descKey: 'lipFillersDesc', slug: 'rellenos-labios', image: '/images/procedures/relleno-labios.jpg' },
        { nameKey: 'prp', descKey: 'prpDesc', slug: 'plasma-rico-plaquetas', image: '/images/procedures/prp.jpg' },
    ],
    reconstructiva: [
        { nameKey: 'tumors', descKey: 'tumorsDesc', slug: 'tumores-carcinomas', image: '/images/procedures/tumores-y-carcinomas.jpg' },
        { nameKey: 'scars', descKey: 'scarsDesc', slug: 'cicatrices', image: '/images/procedures/cicatrices.jpg' },
        { nameKey: 'burns', descKey: 'burnsDesc', slug: 'quemaduras', image: '/images/procedures/quemaduras.jpg' },
        { nameKey: 'biopolymers', descKey: 'biopolymersDesc', slug: 'retiro-biopolimeros', image: '/images/procedures/retiro-de-biopolimeros.jpg' },
    ],
}


// Componente de Card 3D
function ProcedureCard3D({
    proc,
    categoryPath,
    index,
    t,
    tCommon,
}: {
    proc: { nameKey: string; descKey: string; slug: string; image: string }
    categoryPath: string
    index: number
    t: (key: string) => string
    tCommon: (key: string) => string
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
                        alt={t(`items.${proc.nameKey}`)}
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
                        {t(`items.${proc.nameKey}`)}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {t(`items.${proc.descKey}`)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
                        {tCommon('buttons.learnMore')}
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
    const t = useTranslations('proceduresSection')
    const tCommon = useTranslations('common')

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
        return category?.urlPath || activeCategory
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
                    <span className="badge-primary mb-4">{t('badge')}</span>
                    <h2 className="section-title">{t('title')}</h2>
                    <p className="section-subtitle">
                        {t('subtitle')}
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

                {/* Grid de procedimientos - Carrusel deslizable en móvil */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="
                            flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4
                            sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 sm:pb-0
                            lg:grid-cols-4 sm:gap-6
                        "
                    >
                        {procedures[activeCategory as keyof typeof procedures]?.map((proc, index) => (
                            <div
                                key={proc.slug}
                                className="snap-start shrink-0 w-[280px] sm:w-auto sm:shrink"
                            >
                                <ProcedureCard3D
                                    proc={proc}
                                    categoryPath={getActiveCategoryPath()}
                                    index={index}
                                    t={t}
                                    tCommon={tCommon}
                                />
                            </div>
                        ))}
                        {/* Spacer para mostrar parte del siguiente elemento */}
                        <div className="shrink-0 w-4 sm:hidden" aria-hidden="true" />
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
                        {t('viewAll')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
