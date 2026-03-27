'use client'

import Image from 'next/image'
import { ArrowRight, Calendar, Users, Star, CheckCircle2, ExternalLink, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { doctorData } from '@/data/doctor'

export default function DoctorSection() {
    const t = useTranslations('doctorSection')

    return (
        <section className="section bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container-custom">
                {/* Badge */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge-accent">{t('badge')}</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Imagen del doctor */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative max-w-md mx-auto lg:mx-0">
                            {/* Fondo decorativo */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl -rotate-2" />

                            {/* Imagen principal */}
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-strong">
                                <Image
                                    src={doctorData.images.full}
                                    alt={`${t('title')} - ${t('subtitle')}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Badge de formación internacional */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 lg:-right-8 bg-white p-4 rounded-xl shadow-strong border border-gray-100"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🇸🇪</div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{t('internationalTraining')}</div>
                                        <div className="font-semibold text-dark text-sm">Uppsala, Suecia</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Badge de verificación */}
                            <motion.a
                                href="https://www.cmp.org.pe/conoce-a-tu-medico/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute -top-2 -left-2 lg:-left-6 bg-primary text-white px-3 py-2 rounded-lg shadow-medium flex items-center gap-2 hover:bg-primary-dark transition-colors group"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                                <div>
                                    <div className="font-semibold text-sm">CMP {doctorData.credentials.cmp}</div>
                                    <div className="text-xs opacity-80 flex items-center gap-1">
                                        {t('verifyCredentials')}
                                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Contenido */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Nombre y título */}
                        <div className="mb-6">
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark mb-2">
                                {t('title')}
                            </h2>
                            <p className="text-primary font-medium text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Stats destacados */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <motion.div
                                className="text-center p-4 bg-white rounded-xl shadow-soft border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                                <div className="font-display text-2xl md:text-3xl text-primary font-bold">15+</div>
                                <div className="text-xs text-gray-500">{t('stats.experience')}</div>
                            </motion.div>

                            <motion.div
                                className="text-center p-4 bg-white rounded-xl shadow-soft border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                                <div className="font-display text-2xl md:text-3xl text-primary font-bold">5,000+</div>
                                <div className="text-xs text-gray-500">{t('stats.procedures')}</div>
                            </motion.div>

                            <motion.div
                                className="text-center p-4 bg-white rounded-xl shadow-soft border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <Star className="w-5 h-5 text-accent fill-accent mx-auto mb-1" />
                                <div className="font-display text-2xl md:text-3xl text-primary font-bold">4.9</div>
                                <div className="text-xs text-gray-500">{t('stats.googleRating')}</div>
                            </motion.div>
                        </div>

                        {/* Cita del doctor */}
                        <blockquote className="relative pl-6 border-l-4 border-accent mb-6">
                            <p className="text-gray-600 italic text-lg leading-relaxed">
                                &ldquo;{t('quote')}&rdquo;
                            </p>
                        </blockquote>

                        {/* Descripción */}
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('description')}
                        </p>

                        {/* Membresías */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {doctorData.memberships.slice(0, 3).map((membership) => (
                                <span
                                    key={membership.acronym}
                                    className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {membership.acronym}
                                </span>
                            ))}
                            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm">
                                <MapPin className="w-3.5 h-3.5" />
                                Lima, Perú
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/dr-manuel-sinchi"
                                className="btn-primary inline-flex group"
                            >
                                {t('cta')}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/reservar"
                                className="btn-outline inline-flex group"
                            >
                                {t('ctaSchedule')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
