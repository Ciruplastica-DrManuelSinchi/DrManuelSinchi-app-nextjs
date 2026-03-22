'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const videos = [
    {
        id: 1,
        title: 'Lipoescultura vs. Lipoabdominoplastia 🧐',
        youtubeId: 'ZBiNoZkeF2E',
    },
    {
        id: 2,
        title: 'Rinoplastia ultrasónica vs convencional',
        youtubeId: 'EfC0TdjHIv8',
    },
    {
        id: 3,
        title: '🎥 ¿Cómo elegir el IMPLANTE MAMARIO ideal?',
        youtubeId: '7PJPZJw9AL8',
    },
]

export default function Videos() {
    const t = useTranslations('videos')

    return (
        <section className="section bg-light">
            <div className="container-custom">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">{t('informativeVideos')}</h2>
                    <p className="section-subtitle">
                        {t('learnAboutProcedures')}
                    </p>
                </div>

                {/* Grid de videos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            className="card overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Video Iframe */}
                            <div className="relative aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-dark">
                                    {video.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Link ver más */}
                <div className="text-center mt-12">
                    <Link href="/videos" className="link text-primary">
                        {t('viewAll')}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
