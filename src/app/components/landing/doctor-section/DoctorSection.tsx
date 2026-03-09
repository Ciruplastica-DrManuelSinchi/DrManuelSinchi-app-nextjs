'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const credentials = [
    'Universidad de San Martín de Porres',
    'SPCP',
    'CMP 45678',
    'RNE 12345',
]

export default function DoctorSection() {
    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Imagen del doctor */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-hero-gradient">
                                <Image
                                    src="/images/dr-sinchi-full.jpg"
                                    alt="Dr. Manuel Sinchi - Cirujano Plástico"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Badge de certificación */}
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-strong"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <Award className="w-10 h-10 text-accent mx-auto mb-2" />
                                <div className="text-xs text-gray-500 text-center">
                                    CMP Certificado
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contenido */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl md:text-4xl text-dark mb-3">
                            Dr. Manuel Sinchi
                        </h2>

                        <p className="text-primary font-medium mb-6">
                            Cirujano Plástico y Reconstructivo
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Especialista con más de 15 años de experiencia en cirugía plástica,
                            reconstructiva y medicina estética. Miembro activo de la Sociedad
                            Peruana de Cirugía Plástica, comprometido con resultados naturales
                            y la seguridad del paciente.
                        </p>

                        {/* Credenciales */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {credentials.map((credential) => (
                                <span
                                    key={credential}
                                    className="bg-light px-4 py-2 rounded-full text-sm text-dark"
                                >
                                    {credential}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/dr-manuel-sinchi"
                            className="btn-primary inline-flex"
                        >
                            Conocer más sobre el Dr. Sinchi
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
