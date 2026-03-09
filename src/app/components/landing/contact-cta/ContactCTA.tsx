'use client'

import Link from 'next/link'
import { Calendar, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactCTA() {
    const whatsappLink = 'https://api.whatsapp.com/send?phone=51961360074&text=Deseo%20más%20información%20sobre%20los%20procedimientos'

    return (
        <section className="py-24 bg-cta-gradient">
            <div className="container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
                        ¿Listo para dar el primer paso?
                    </h2>

                    <p className="text-dark/80 text-lg mb-10 max-w-2xl mx-auto">
                        Agenda tu consulta gratuita y conoce las opciones ideales para ti
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contacto"
                            className="btn-dark text-base px-8 py-4"
                        >
                            <Calendar className="w-5 h-5" />
                            Agendar Consulta
                        </Link>

                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-white text-base px-8 py-4"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Directo
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
