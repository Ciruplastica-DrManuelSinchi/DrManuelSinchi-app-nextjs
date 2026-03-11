'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    ChevronDown,
    Clock,
    Shield,
    Sparkles,
    ArrowRight,
    Check,
    Phone,
    MessageCircle,
    Calendar,
    Timer,
    BadgeCheck
} from 'lucide-react'

import { ProcedureData, defaultDoctor, defaultCTA } from './types'

interface ProcedurePageProps {
    data: ProcedureData
}

export default function ProcedurePage({ data }: ProcedurePageProps) {
    //Estados
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [activeImage, setActiveImage] = useState(0)


    const doctor = { ...defaultDoctor, ...data.doctor }
    const cta = { ...defaultCTA, ...data.cta }

    const whatsappMessage = data.hero.whatsappMessage || `Hola, me interesa información sobre ${data.hero.title.toLowerCase()}`

    return (
        <main className="min-h-screen">
            {/* ==================== HERO ==================== */}
            <section className="relative bg-hero-gradient pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={data.categoryPath} className="hover:text-white transition-colors">
                            {data.categoryLabel}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-accent">{data.hero.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="badge-accent mb-6"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                {data.hero.badge}
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white mb-6"
                            >
                                {data.hero.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
                            >
                                {data.hero.description}
                            </motion.p>

                            {/* Quick Info Pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4 mb-8"
                            >
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                    <Clock className="w-4 h-4 text-accent" />
                                    <span className="text-white text-sm">{data.hero.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                    <Timer className="w-4 h-4 text-accent" />
                                    <span className="text-white text-sm">{data.hero.recovery}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                    <Shield className="w-4 h-4 text-accent" />
                                    <span className="text-white text-sm">{data.hero.anesthesia}</span>
                                </div>
                            </motion.div>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link href="/contacto" className="btn-primary">
                                    <Calendar className="w-4 h-4" />
                                    Agendar Consulta
                                </Link>
                                <a
                                    href={`https://wa.me/${cta.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Consultar por WhatsApp
                                </a>
                            </motion.div>
                        </div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-strong">
                                <Image
                                    src={data.hero.heroImage}
                                    alt={data.hero.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                                        <BadgeCheck className="w-6 h-6 text-accent-dark" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-dark">{doctor.credentials[1]?.value || '+5000'}</div>
                                        <div className="text-sm text-gray-500">{doctor.credentials[1]?.label || 'Pacientes satisfechos'}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== INFO SECTION ==================== */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge-primary mb-4">Procedimiento</span>
                            <h2 className="mb-6">{data.info.title}</h2>

                            <div className="space-y-4 text-gray-600">
                                {data.info.content.map((paragraph, index) => (
                                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                ))}
                            </div>

                            {/* Highlights */}
                            {data.info.highlights && (
                                <div className="mt-8 p-6 bg-primary-50 rounded-2xl">
                                    <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                        {data.info.highlights.icon && <data.info.highlights.icon className="w-5 h-5" />}
                                        {data.info.highlights.title}
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {data.info.highlights.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden">
                                <Image
                                    src={data.info.image}
                                    alt={data.info.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-accent/20 rounded-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== BEFORE & AFTER ==================== */}
            {data.beforeAfter.length > 0 && (
                <section className="section bg-light">
                    <div className="container-custom">
                        <div className="section-header">
                            <span className="badge-accent mb-4">Resultados Reales</span>
                            <h2 className="section-title">Casos Antes y Después</h2>
                            <p className="section-subtitle">
                                Resultados verificables de pacientes reales del Dr. Sinchi
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            {/* Large Display */}
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-medium mb-6">
                                <div className="absolute inset-0 w-1/2">
                                    <Image
                                        src={data.beforeAfter[activeImage].before}
                                        alt="Antes"
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-4 py-2 rounded-full">
                                        Antes
                                    </span>
                                </div>
                                <div className="absolute inset-0 left-1/2 w-1/2">
                                    <Image
                                        src={data.beforeAfter[activeImage].after}
                                        alt="Después"
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-4 right-4 bg-accent text-dark text-sm font-semibold px-4 py-2 rounded-full">
                                        Después
                                    </span>
                                </div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white -translate-x-1/2 z-10" />
                            </div>

                            {/* Thumbnails */}
                            {data.beforeAfter.length > 1 && (
                                <div className="flex justify-center gap-4">
                                    {data.beforeAfter.map((caseItem, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`
                                                relative w-24 h-16 rounded-xl overflow-hidden transition-all
                                                ${activeImage === index
                                                    ? 'ring-2 ring-primary ring-offset-2 scale-105'
                                                    : 'opacity-60 hover:opacity-100'
                                                }
                                            `}
                                        >
                                            <Image
                                                src={caseItem.after}
                                                alt={caseItem.label}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        <div className="text-center mt-10">
                            <Link href="/casos-reales" className="link text-primary">
                                Ver más casos reales
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ==================== BENEFITS ==================== */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="section-header">
                        <h2 className="section-title">¿Por qué elegir este procedimiento?</h2>
                        <p className="section-subtitle">
                            Combinamos técnica avanzada con atención personalizada
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-6 text-center hover:shadow-medium transition-shadow"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-semibold text-dark mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== DOCTOR SECTION ==================== */}
            <section className="section bg-hero-gradient">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                                <Image
                                    src={doctor.image}
                                    alt="Dr. Manuel Sinchi"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge-accent mb-4">{doctor.subtitle}</span>
                            <h2 className="text-white mb-6">{doctor.title}</h2>
                            <p className="text-white/80 mb-8 text-lg">{doctor.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {doctor.credentials.map((stat, index) => (
                                    <div key={index} className="bg-white/10 rounded-xl p-4">
                                        <div className="text-2xl md:text-3xl font-display font-bold text-accent">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-white/70">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {doctor.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-white/90">
                                        <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/dr-manuel-sinchi" className="btn-primary">
                                Conocer más sobre el Dr. Sinchi
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== PROCESS & RECOVERY ==================== */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="section-header">
                        <span className="badge-primary mb-4">Tu Experiencia</span>
                        <h2 className="section-title">Proceso y Recuperación</h2>
                        <p className="section-subtitle">Te acompañamos en cada paso del camino</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {data.process.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex gap-6 pb-12 last:pb-0"
                            >
                                {index < data.process.length - 1 && (
                                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-primary/20" />
                                )}

                                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-medium">
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>

                                <div className="flex-1 bg-light rounded-2xl p-6">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            Paso {step.step}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {step.duration}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-dark mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== VIDEOS ==================== */}
            {data.videos.length > 0 && (
                <section className="section bg-light">
                    <div className="container-custom">
                        <div className="section-header">
                            <span className="badge-accent mb-4">Contenido Educativo</span>
                            <h2 className="section-title">Videos Informativos</h2>
                            <p className="section-subtitle">
                                El Dr. Sinchi explica todo lo que necesitas saber
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.videos.map((video, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card overflow-hidden"
                                >
                                    <div className="relative aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-dark">
                                            {video.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}


                        </div>

                        <div className="text-center mt-10">
                            <Link href="/videos" className="link text-primary">
                                Ver todos los videos
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ==================== FAQ ==================== */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <span className="badge-primary mb-4">FAQ</span>
                            <h2 className="mb-6">Preguntas Frecuentes</h2>
                            <p className="text-gray-600 mb-6">
                                Resolvemos las dudas más comunes sobre este procedimiento.
                                Si tienes alguna pregunta adicional, no dudes en contactarnos.
                            </p>

                            <div className="p-6 bg-accent/10 rounded-2xl">
                                <h4 className="font-semibold text-dark mb-3">¿Tienes más preguntas?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Agenda una consulta de valoración con el Dr. Sinchi.
                                </p>
                                <a
                                    href={`https://wa.me/${cta.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Consultar por WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {data.faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-light rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-50 transition-colors"
                                    >
                                        <span className="font-semibold text-dark pr-4">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL ==================== */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-white text-2xl md:text-3xl lg:text-4xl mb-4"
                            >
                                {cta.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/80 text-lg mb-8"
                            >
                                {cta.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link href="/contacto" className="btn-primary">
                                    <Calendar className="w-4 h-4" />
                                    Agendar Consulta
                                </Link>
                                <a href={`tel:${cta.phoneNumber}`} className="btn-secondary">
                                    <Phone className="w-4 h-4" />
                                    Llamar Ahora
                                </a>
                                <a
                                    href={`https://wa.me/${cta.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
