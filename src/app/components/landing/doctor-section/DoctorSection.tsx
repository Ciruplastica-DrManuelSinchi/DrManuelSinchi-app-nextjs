'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Calendar, Users, Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { doctorData } from '@/data/doctor'

const iconMap = {
    calendar: Calendar,
    users: Users,
    shield: Shield,
}

export default function DoctorSection() {
    return (
        <section className="section bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Imagen del doctor */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                            {/* Fondo decorativo */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl -rotate-3" />

                            {/* Imagen principal */}
                            <div className="relative h-full rounded-2xl overflow-hidden shadow-strong">
                                <Image
                                    src={doctorData.images.full}
                                    alt={`${doctorData.name} - ${doctorData.title}`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay sutil */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>

                            {/* Badge de certificación */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 lg:-right-8 bg-white p-4 rounded-xl shadow-strong border border-accent-200"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Certificado</div>
                                        <div className="font-semibold text-dark">CMP {doctorData.credentials.cmp}</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Credenciales adicionales */}
                            <motion.div
                                className="absolute -top-2 -left-2 lg:-left-6 bg-primary text-white px-4 py-2 rounded-lg shadow-medium"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-xs opacity-80">Registro Nacional</div>
                                <div className="font-semibold text-sm">RNE {doctorData.credentials.rne}</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contenido */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Encabezado */}
                        <div className="mb-6">
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-2">
                                {doctorData.name}
                            </h2>
                            <p className="text-primary font-medium text-lg">
                                {doctorData.title}
                            </p>
                        </div>

                        {/* Cita */}
                        <blockquote className="relative pl-6 border-l-4 border-accent mb-8">
                            <p className="text-gray-600 italic text-lg leading-relaxed">
                                &ldquo;{doctorData.quote}&rdquo;
                            </p>
                        </blockquote>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {doctorData.stats.map((stat, index) => {
                                const Icon = iconMap[stat.icon as keyof typeof iconMap]
                                return (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center p-4 bg-light rounded-xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                                        <div className="font-display text-2xl text-primary font-bold">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-gray-500 leading-tight">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Credenciales y membresías */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {doctorData.memberships.slice(0, 4).map((membership) => (
                                    <span
                                        key={membership.acronym}
                                        className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        {membership.acronym}
                                    </span>
                                ))}
                                <span className="inline-flex items-center gap-1.5 bg-accent-100 text-accent-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                    🇸🇪 Uppsala, Suecia
                                </span>
                            </div>
                        </div>

                        {/* Descripción corta */}
                        <p className="text-gray-600 leading-relaxed mb-8">
                            {doctorData.shortBio}
                        </p>

                        {/* CTA */}
                        <Link
                            href="/dr-manuel-sinchi"
                            className="btn-primary inline-flex group"
                        >
                            Conocer más sobre el Dr. Sinchi
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
