'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MessageCircle, Star, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

//Importamos la imagen
import doctorImg from "@/public/images/dr-manuel-sinchi.jpg"


const stats = [
    { number: '+2,500', label: 'Cirugías exitosas' },
    { number: '15+', label: 'Años de experiencia' },
    { number: '98%', label: 'Satisfacción' },
]

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] bg-hero-gradient overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh] py-20 lg:py-0">

                    {/* Contenido izquierdo */}
                    <motion.div
                        className="text-white z-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge de certificación */}
                        <div className="badge-accent mb-6 inline-flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Clínica Certificada</span>
                        </div>

                        {/* Título principal */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Resultados naturales que{' '}
                            <span className="text-accent">transforman vidas</span>
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                            Más de 15 años de experiencia en cirugía plástica y reconstructiva
                            con los más altos estándares de seguridad.
                        </p>

                        {/* Estadísticas */}
                        <div className="flex flex-wrap gap-8 mb-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                >
                                    <div className="font-display text-3xl md:text-4xl text-accent font-bold">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-white/70 mt-1">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Botones CTA */}
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contacto" className="btn-primary text-base px-8 py-4">
                                <Calendar className="w-5 h-5" />
                                Agendar Consulta
                            </Link>
                            <Link href="/casos-reales" className="btn-secondary text-base px-8 py-4">
                                Ver Casos Reales
                            </Link>
                        </div>
                    </motion.div>

                    {/* Imagen derecha */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Imagen del doctor */}
                        <div className="relative w-full max-w-md mx-auto">
                            <div className="aspect-[3/4] relative rounded-3xl overflow-hidden bg-primary-light/30 border-2 border-white/10">
                                <Image
                                    src={doctorImg}
                                    alt="Dr. Manuel Sinchi - Cirujano Plástico en Lima"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Card flotante - Reviews */}
                            <motion.div
                                className="absolute -left-8 bottom-20 bg-white rounded-xl p-4 shadow-strong"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="flex text-yellow-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <div className="font-bold text-dark">5/5</div>
                                        <div className="text-xs text-gray-500">3 reseñas en Google</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card flotante - WhatsApp */}
                            <motion.div
                                className="absolute -right-4 top-20 bg-[#25d366] text-white rounded-xl px-4 py-3 shadow-strong"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-semibold text-sm">Chat en línea</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-dark/50 to-transparent pointer-events-none" />
        </section>
    )
}

