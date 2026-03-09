'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
    {
        id: 1,
        name: 'María G.',
        procedure: 'Rinoplastia',
        text: 'El Dr. Sinchi me explicó todo el proceso con mucha paciencia. El resultado superó mis expectativas y la recuperación fue mejor de lo que esperaba.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Carolina T.',
        procedure: 'Lipoescultura',
        text: 'Profesionalismo desde la primera consulta. Me sentí muy segura durante todo el proceso. 100% recomendado.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Patricia L.',
        procedure: 'Mamoplastia',
        text: 'Después de años pensándolo, finalmente me decidí. El equipo es increíble y el resultado es muy natural.',
        rating: 5,
    },
]

export default function Testimonials() {
    return (
        <section className="section bg-primary">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                        Lo que dicen nuestros pacientes
                    </h2>
                    <p className="text-white/80">
                        Historias reales de transformación
                    </p>
                </div>

                {/* Grid de testimonios */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Estrellas */}
                            <div className="flex gap-1 text-accent mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>

                            {/* Texto */}
                            <p className="text-white/90 leading-relaxed mb-6">
                                &quot;{testimonial.text}&quot;
                            </p>

                            {/* Autor */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/20" />
                                <div>
                                    <div className="font-semibold text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-white/70">
                                        {testimonial.procedure}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
