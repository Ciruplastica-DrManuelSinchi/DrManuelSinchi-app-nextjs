'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const videos = [
    {
        id: 1,
        title: '¿Qué es la Lipoescultura?',
        youtubeId: 'VIDEO_ID_1',
    },
    {
        id: 2,
        title: 'Rinoplastia: Proceso y Recuperación',
        youtubeId: 'VIDEO_ID_2',
    },
    {
        id: 3,
        title: 'Cuidados Post-Operatorios',
        youtubeId: 'VIDEO_ID_3',
    },
]

export default function Videos() {
    return (
        <section className="section bg-light">
            <div className="container-custom">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">Videos Informativos</h2>
                    <p className="section-subtitle">
                        Conoce más sobre nuestros procedimientos
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
                        Ver todos los videos
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
