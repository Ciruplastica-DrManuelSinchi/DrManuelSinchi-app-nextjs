'use client'

import { motion } from 'framer-motion'
import TestimonialsCarousel from '@/app/components/ui/carousel/TestimonialsCarousel'

const testimonials = [
    {
        id: 1,
        name: 'Pilar del Castillo',
        procedure: '',
        text: 'Excelente atención y resultados!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Eduardo Carhuas',
        procedure: '',
        text: 'Muy buen servicio y profesionalismo por parte del doctor',
        rating: 5,
    },
    {
        id: 3,
        name: 'Daniel Castañeda',
        procedure: 'Septorrinoplastía',
        text: 'Quiero expresar mi agradecimiento al Dr. Sinchi por el excelente trabajo realizado en mi cirugía, tanto estética como funcional. Desde la primera consulta me brindó total confianza y explicó cada detalle con claridad. El trato fue 10/10, siempre amable y profesional, al igual que su equipo. Lo recomiendo muchísimo.',
        rating: 5,
    },
]

export default function Testimonials() {
    return (
        <section className="section bg-primary relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(212, 168, 83, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-4">
                        Testimonios Verificados
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                        Lo que dicen nuestros pacientes
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto">
                        Historias reales de transformación y confianza
                    </p>
                </motion.div>

                {/* Carousel */}
                <TestimonialsCarousel testimonials={testimonials} autoplayDelay={5000} />
            </div>
        </section>
    )
}
