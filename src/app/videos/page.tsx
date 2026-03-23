'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play,
    Eye,
    Youtube,
    Filter,
    X,
    ChevronRight,
    Sparkles
} from 'lucide-react'
import { useTranslations } from 'next-intl'

// Tipos
interface Video {
    id: number
    title: string
    description: string
    youtubeId: string
    category: string
    views: string
    featured?: boolean
}

// Videos reales del canal (sin duplicados)
const videos: Video[] = [
    // CIRUGÍA FACIAL
    {
        id: 1,
        title: 'Todo sobre la Rinoplastia',
        description: 'El Dr. Manuel Sinchi explica todo lo que necesitas saber sobre la rinoplastia.',
        youtubeId: 'cy5N4Z_DRmM',
        category: 'facial',
        views: '2.5K',
        featured: true,
    },
    {
        id: 2,
        title: 'Rinoplastia ultrasónica vs convencional',
        description: 'Comparativa entre técnicas de rinoplastia y sus beneficios.',
        youtubeId: 'EfC0TdjHIv8',
        category: 'facial',
        views: '1.8K',
    },
    {
        id: 3,
        title: 'Resultados naturales con Rinoseptoplastia Ultrasónica',
        description: 'Caso real mostrando resultados naturales de rinoseptoplastia.',
        youtubeId: '7oveiyGPTW8',
        category: 'facial',
        views: '1.2K',
    },
    {
        id: 4,
        title: 'Caso real: Perfilamiento facial',
        description: 'Resultado de perfilamiento facial con bichectomía.',
        youtubeId: 'r_ptdooFxDA',
        category: 'facial',
        views: '980',
    },
    {
        id: 5,
        title: 'Caso real: Afinamiento de rostro',
        description: 'Transformación con afinamiento de rostro.',
        youtubeId: '9isCtT3yYk0',
        category: 'facial',
        views: '1.1K',
    },
    {
        id: 6,
        title: 'Caso real: Rinoplastia y Afinamiento Facial',
        description: 'Combinación de procedimientos para un resultado armónico.',
        youtubeId: '9rmvDWxDHIE',
        category: 'facial',
        views: '1.5K',
    },
    {
        id: 7,
        title: 'PERFILOPLASTIA: Rinoplastia ultrasónica + Mentoplastia',
        description: 'Perfiloplastia completa con rinoplastia y mentoplastia.',
        youtubeId: 'PnuhU1EBdXQ',
        category: 'facial',
        views: '2.1K',
    },
    {
        id: 8,
        title: 'Mentoplastia: lo que debes saber',
        description: 'Información completa sobre la cirugía de mentón.',
        youtubeId: 'WDsZMaIWFYk',
        category: 'facial',
        views: '890',
    },
    {
        id: 9,
        title: 'Liposucción de papada: antes y después',
        description: 'Resultados reales de liposucción de papada.',
        youtubeId: '8ldGYrTf488',
        category: 'facial',
        views: '1.3K',
    },
    {
        id: 10,
        title: 'Caso de liposucción de papada',
        description: 'Transformación con liposucción de papada.',
        youtubeId: '24c5BD3LU1s',
        category: 'facial',
        views: '760',
    },
    {
        id: 11,
        title: 'Cambio sutil, resultado natural - Lifting',
        description: 'Caso de lifting facial con resultado natural.',
        youtubeId: 'kEQEN_kO4a0',
        category: 'facial',
        views: '1.4K',
    },
    {
        id: 12,
        title: 'PERFILOPLASTIA: Rinoplastia + Afinamiento facial',
        description: 'Combinación de procedimientos faciales.',
        youtubeId: '0zQ0cvgBYrs',
        category: 'facial',
        views: '1.7K',
    },
    {
        id: 13,
        title: 'Lipoescultura, Rinoseptoplastia y Afinamiento facial',
        description: 'Transformación completa con múltiples procedimientos.',
        youtubeId: 'wxMCK-kXHeg',
        category: 'facial',
        views: '2.3K',
    },
    {
        id: 14,
        title: 'Resultado de una Blefaroplastia Inferior',
        description: 'Caso real de blefaroplastia inferior.',
        youtubeId: 't4CJHFDtT-w',
        category: 'facial',
        views: '1.6K',
    },
    {
        id: 15,
        title: 'Rinoseptoplastia y Blefaroplastia',
        description: 'Combinación de cirugía de nariz y párpados.',
        youtubeId: '2UThbvUrJ0Y',
        category: 'facial',
        views: '1.2K',
    },
    {
        id: 16,
        title: 'Caso real de OTOPLASTIA',
        description: 'Corrección de orejas prominentes.',
        youtubeId: 'POg1Mb-UHcs',
        category: 'facial',
        views: '890',
    },
    {
        id: 17,
        title: '¿Desde qué edad se puede corregir las orejas?',
        description: 'Información sobre otoplastia en diferentes edades.',
        youtubeId: 'cTv5VZm7o6k',
        category: 'facial',
        views: '1.1K',
    },
    {
        id: 18,
        title: '¿Tienes las orejas prominentes?',
        description: 'Todo sobre la corrección de orejas prominentes.',
        youtubeId: 'UnkpLmMddCw',
        category: 'facial',
        views: '980',
    },
    // CIRUGÍA CORPORAL
    {
        id: 19,
        title: 'Lo que debes saber sobre la lipoescultura',
        description: 'Entrevista en Radio Miraflores sobre lipoescultura.',
        youtubeId: 'fUUGe4-wLnc',
        category: 'corporal',
        views: '3.1K',
        featured: true,
    },
    {
        id: 20,
        title: 'Lipoescultura vs. Lipoabdominoplastia',
        description: 'Diferencias entre estos dos procedimientos corporales.',
        youtubeId: 'ZBiNoZkeF2E',
        category: 'corporal',
        views: '2.1K',
    },
    {
        id: 21,
        title: 'Resultado real de lipoescultura',
        description: 'Caso real mostrando resultados de lipoescultura.',
        youtubeId: '8GrpYNpd9Js',
        category: 'corporal',
        views: '1.9K',
    },
    {
        id: 22,
        title: 'Caso real: Mamá de 2 hijos recupera su figura',
        description: 'Transformación con abdominoplastia post embarazo.',
        youtubeId: 'Z6Jq0DVJdzs',
        category: 'corporal',
        views: '2.8K',
    },
    {
        id: 23,
        title: 'Caso de Pilar: Lipoabdominoplastia',
        description: 'Resultado de lipoabdominoplastia.',
        youtubeId: '7GFKXZEwiis',
        category: 'corporal',
        views: '1.5K',
    },
    {
        id: 24,
        title: '¿Cómo elegir el IMPLANTE MAMARIO ideal?',
        description: 'Guía completa para elegir implantes mamarios.',
        youtubeId: '7PJPZJw9AL8',
        category: 'corporal',
        views: '3.2K',
        featured: true,
    },
    {
        id: 25,
        title: 'Implantes mamarios: Cirugía de aumento',
        description: 'Todo sobre la cirugía de aumento de mamas.',
        youtubeId: 'kgu9YpK7uzs',
        category: 'corporal',
        views: '2.4K',
    },
    {
        id: 26,
        title: 'Caso real de mamoplastia',
        description: 'Resultado de aumento mamario.',
        youtubeId: '6pN61A1gLHI',
        category: 'corporal',
        views: '1.8K',
    },
    {
        id: 27,
        title: '¿Te hiciste una lipotransferencia? ¡Cuídala así!',
        description: 'Cuidados post lipotransferencia glútea.',
        youtubeId: 'LZeJiFcQtnI',
        category: 'corporal',
        views: '1.6K',
    },
    {
        id: 28,
        title: 'Transformación con Liposucción + Transferencia de grasa',
        description: 'Caso de lipoescultura con transferencia a glúteos.',
        youtubeId: '5-75lv9Q4nI',
        category: 'corporal',
        views: '2.2K',
    },
    // MEDICINA ESTÉTICA
    {
        id: 29,
        title: 'Descubre todo sobre el Lip Lift',
        description: 'El Dr. Manuel Sinchi explica el procedimiento de Lip Lift.',
        youtubeId: 'pkUsW_-EHBI',
        category: 'estetica',
        views: '1.9K',
    },
    {
        id: 30,
        title: 'Todo lo que debes saber sobre el Lip Lift',
        description: 'Información completa sobre el levantamiento de labio.',
        youtubeId: '61QYlk7UzFk',
        category: 'estetica',
        views: '1.4K',
    },
]

// Componente de Video Card
function VideoCard({ video, index, onPlay }: { video: Video; index: number; onPlay: (video: Video) => void }) {
    const t = useTranslations('videosPage')
    const tCategories = useTranslations('videosPage.categories')

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => onPlay(video)}
        >
            {/* Thumbnail Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                {/* YouTube Thumbnail */}
                <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play className="w-7 h-7 md:w-8 md:h-8 text-primary fill-primary ml-1" />
                    </motion.div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 rounded-full text-xs font-medium text-primary capitalize">
                    {tCategories(video.category as 'all' | 'facial' | 'corporal' | 'estetica')}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <h3 className="font-display font-semibold text-dark text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                    {video.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {video.views} {t('grid.views')}
                    </span>
                </div>
            </div>
        </motion.article>
    )
}

// Componente de Video Featured
function FeaturedVideo({ video, onPlay }: { video: Video; onPlay: (video: Video) => void }) {
    const t = useTranslations('videosPage')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark cursor-pointer group"
            onClick={() => onPlay(video)}
        >
            <div className="grid lg:grid-cols-2 gap-0">
                {/* Video Preview */}
                <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                    <Image
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                    {/* Play button grande */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play className="w-10 h-10 text-primary fill-primary ml-1" />
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
                    <span className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        {t('grid.featuredBadge')}
                    </span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                        {video.title}
                    </h2>
                    <p className="text-white/80 mb-6 line-clamp-3">
                        {video.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-white/60">
                        <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {video.views} {t('grid.views')}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Modal de Video
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Video iframe */}
                <iframe
                    className="w-full h-full rounded-2xl"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </motion.div>
        </motion.div>
    )
}

export default function VideosPage() {
    const t = useTranslations('videosPage')
    const [activeCategory, setActiveCategory] = useState('todos')
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    const categories = [
        { id: 'todos', name: t('categories.all'), icon: Sparkles },
        { id: 'facial', name: t('categories.facial'), icon: null },
        { id: 'corporal', name: t('categories.corporal'), icon: null },
        { id: 'estetica', name: t('categories.estetica'), icon: null },
    ]

    // Filtrar videos
    const filteredVideos = activeCategory === 'todos'
        ? videos
        : videos.filter(v => v.category === activeCategory)

    // Video destacado
    const featuredVideo = videos.find(v => v.featured) || videos[0]

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-primary via-primary-dark to-dark overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent text-sm font-medium mb-6">
                            <Youtube className="w-4 h-4" />
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            {t('hero.titlePrefix')} <span className="text-accent">{t('hero.titleHighlight')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-8">
                            {t('hero.description')}
                        </p>
                        <a
                            href="https://www.youtube.com/@DrManuelSinchi-Ciruplastica?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-dark px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors"
                        >
                            <Youtube className="w-5 h-5" />
                            {t('hero.subscribeButton')}
                        </a>
                    </motion.div>
                </div>

                {/* Wave bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9f7fa"/>
                    </svg>
                </div>
            </section>

            {/* Featured Video Section */}
            <section className="py-12 md:py-16 bg-light">
                <div className="container-custom">
                    <FeaturedVideo video={featuredVideo} onPlay={setSelectedVideo} />
                </div>
            </section>

            {/* Videos Grid Section */}
            <section className="py-12 md:py-20 bg-light">
                <div className="container-custom">
                    {/* Section Header with Filters */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mb-2">
                                {t('grid.title')}
                            </h2>
                            <p className="text-gray-500">
                                {t('grid.videosAvailable', { count: filteredVideos.length })}
                            </p>
                        </div>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700"
                        >
                            <Filter className="w-4 h-4" />
                            {t('grid.filterButton')}
                        </button>

                        {/* Desktop Category Tabs */}
                        <div className="hidden md:flex items-center gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === cat.id
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mb-8 overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-2 p-4 bg-white rounded-2xl shadow-sm">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setActiveCategory(cat.id)
                                                setShowFilters(false)
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                activeCategory === cat.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Videos Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                        >
                            {filteredVideos.map((video, index) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    index={index}
                                    onPlay={setSelectedVideo}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty state */}
                    {filteredVideos.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">{t('grid.emptyState')}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* YouTube CTA Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-dark to-dark relative overflow-hidden">
                {/* Decoraciones de fondo */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Youtube className="w-6 h-6 text-accent" />
                                </div>
                                <span className="text-white/70 text-lg">@DrManuelSinchi-Ciruplastica</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                {t('cta.title')}
                            </h2>
                            <p className="text-white/70 text-lg max-w-xl">
                                {t('cta.description')}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://www.youtube.com/@DrManuelSinchi-Ciruplastica?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-accent text-dark px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                                {t('cta.subscribeButton')}
                            </a>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
                            >
                                {t('cta.scheduleButton')}
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </>
    )
}
