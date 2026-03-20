'use client'

import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

const contactInfo = [
    {
        icon: MapPin,
        label: 'Dirección',
        text: 'Calle Scipión Llona 180, Consultorio 503',
        subtext: 'Miraflores, Lima - Perú',
    },
    {
        icon: Phone,
        label: 'Teléfono',
        text: '961 360 074',
        href: 'tel:+51961360074',
    },
    {
        icon: Mail,
        label: 'Email',
        text: 'consultas@ciruplastica.pe',
        href: 'mailto:consultas@ciruplastica.pe',
    },
    {
        icon: Clock,
        label: 'Horario',
        text: 'Lunes - Sábado',
        subtext: '9:00am - 7:00pm',
    },
]

export default function Location() {
    const googleMapsUrl = 'https://www.google.com/maps/place/Dr.+Manuel+Sinchi+-+Cirupl%C3%A1stica/@-12.107718742990034,-77.03253448893925,17z'

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Ubicación
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
                        Visítanos en{' '}
                        <span className="text-primary">Miraflores</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Nuestro consultorio está ubicado en una zona céntrica y accesible de Miraflores,
                        con estacionamiento disponible en el edificio.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow"
                            >
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                                            <p className="font-semibold text-dark group-hover:text-primary transition-colors">
                                                {item.text}
                                            </p>
                                            {item.subtext && (
                                                <p className="text-gray-600 text-sm">{item.subtext}</p>
                                            )}
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                                            <p className="font-semibold text-dark">{item.text}</p>
                                            {item.subtext && (
                                                <p className="text-gray-600 text-sm">{item.subtext}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* CTA Button */}
                        <motion.a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:bg-primary-600 transition-colors mt-2"
                        >
                            <Navigation className="w-5 h-5" />
                            Cómo Llegar
                        </motion.a>
                    </motion.div>

                    {/* Google Maps Embed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl overflow-hidden shadow-medium h-full min-h-[400px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0647663291265!2d-77.03253448893925!3d-12.107718742990034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86b2d055555%3A0xcf31611e344dd943!2sDr.%20Manuel%20Sinchi%20-%20Cirupl%C3%A1stica!5e0!3m2!1ses-419!2spe!4v1773980030346!5m2!1ses-419!2spe"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de Ciruplástica - Dr. Manuel Sinchi"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
