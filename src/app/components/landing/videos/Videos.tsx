'use client'

import Link from 'next/link'
import { Play, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const videos = [
    {
        id: 1,
        title: '¿Qué es la Lipoescultura?',
        duration: '5:32 min',
        thumbnail: '/images/videos/lipoescultura-thumb.jpg',
        youtubeId: 'VIDEO_ID_1',
    },
    {
        id: 2,
        title: 'Rinoplastia: Proceso y Recuperación',
        duration: '7:15 min',
        thumbnail: '/images/videos/rinoplastia-thumb.jpg',
        youtubeId: 'VIDEO_ID_2',
    },
    {
        id: 3,
        title: 'Cuidados Post-Operatorios',
        duration: '4:48 min',
        thumbnail: '/images/videos/postop-thumb.jpg',
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
                            className="card-hover overflow-hidden group cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gray-900">
                                {/* Placeholder para thumbnail */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                                {/* Botón de play */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                                        <Play className="w-6 h-6 text-dark fill-current ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-semibold text-dark mb-2">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {video.duration}
                                </p>
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
