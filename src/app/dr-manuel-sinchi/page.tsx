'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Award,
    GraduationCap,
    Globe,
    Sparkles,
    Heart,
    HandHelping,
    Shield,
    Star,
    ArrowRight,
    Phone,
    CheckCircle,
    MapPin,
    Calendar,
    Building,
} from 'lucide-react'
import { doctorData } from '@/data/doctor'

const specialtyIcons = {
    sparkles: Sparkles,
    heart: Heart,
    'hand-helping': HandHelping,
}

export default function DoctorPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-hero-gradient text-white py-20 lg:py-32 overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-light rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Contenido */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-accent/20 text-accent-light px-3 py-1 rounded-full text-sm font-medium">
                                    CMP {doctorData.credentials.cmp}
                                </span>
                                <span className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm">
                                    RNE {doctorData.credentials.rne}
                                </span>
                                <span className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm">
                                    RNA {doctorData.credentials.rna}
                                </span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
                                {doctorData.name}
                            </h1>

                            <p className="text-accent-light text-xl font-medium mb-6">
                                {doctorData.title}
                            </p>

                            <blockquote className="text-xl text-white/80 italic mb-8 border-l-4 border-accent pl-6">
                                &ldquo;{doctorData.quote}&rdquo;
                            </blockquote>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="https://wa.me/51999999999"
                                    target="_blank"
                                    className="btn-accent inline-flex items-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    Agendar consulta
                                </Link>
                                <a
                                    href="#trayectoria"
                                    className="btn-outline-white inline-flex items-center gap-2"
                                >
                                    Ver trayectoria
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Imagen */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="relative aspect-[3/4] max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-accent/20 rounded-3xl rotate-3" />
                                <div className="relative h-full rounded-2xl overflow-hidden shadow-strong">
                                    <Image
                                        src={doctorData.images.portrait}
                                        alt={doctorData.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Badge flotante */}
                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-white text-dark p-4 rounded-xl shadow-strong"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Award className="w-10 h-10 text-accent" />
                                        <div>
                                            <div className="font-semibold">Certificado</div>
                                            <div className="text-sm text-gray-500">Colegio Médico del Perú</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b">
                <div className="container-custom">
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {doctorData.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="font-display text-4xl md:text-5xl text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Biografía */}
            <section className="section bg-light-gradient">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title">Sobre el Doctor</h2>
                        </motion.div>

                        <motion.p
                            className="text-lg text-gray-600 leading-relaxed text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {doctorData.fullBio}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Especialidades */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Especialidades</h2>
                        <p className="section-subtitle">
                            Áreas de expertise del Dr. Sinchi
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {doctorData.specialties.map((specialty, index) => {
                            const Icon = specialtyIcons[specialty.icon as keyof typeof specialtyIcons]
                            return (
                                <motion.div
                                    key={specialty.name}
                                    className="bg-light rounded-2xl p-8 text-center hover:shadow-medium transition-shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="font-display text-xl text-dark mb-3">
                                        {specialty.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {specialty.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Trayectoria - Timeline */}
            <section id="trayectoria" className="section bg-light-gradient">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Trayectoria Profesional</h2>
                        <p className="section-subtitle">
                            Formación académica y experiencia
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        {/* Formación Académica */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <GraduationCap className="w-6 h-6 text-primary" />
                                <h3 className="font-display text-2xl text-dark">Formación Académica</h3>
                            </div>

                            <div className="space-y-6">
                                {doctorData.education.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        className="flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex-shrink-0 w-24 text-right">
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary bg-primary-100 px-2 py-1 rounded">
                                                <Calendar className="w-3 h-3" />
                                                {item.year}
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0 w-px bg-primary-200 relative">
                                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full" />
                                        </div>
                                        <div className="pb-6">
                                            <h4 className="font-semibold text-dark">{item.title}</h4>
                                            <p className="text-gray-600">{item.institution}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Experiencia Profesional */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Building className="w-6 h-6 text-primary" />
                                <h3 className="font-display text-2xl text-dark">Experiencia Profesional</h3>
                            </div>

                            <div className="space-y-6">
                                {doctorData.experience.map((item, index) => (
                                    <motion.div
                                        key={item.institution}
                                        className="flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex-shrink-0 w-32 text-right">
                                            <span className="text-sm font-medium text-accent-700 bg-accent-100 px-2 py-1 rounded">
                                                {item.year}
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0 w-px bg-accent-200 relative">
                                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full" />
                                        </div>
                                        <div className="pb-6">
                                            <h4 className="font-semibold text-dark">{item.position}</h4>
                                            <p className="text-gray-600">{item.institution}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formación Internacional */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Globe className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="section-title">Formación Internacional</h2>
                        <p className="section-subtitle">
                            Experiencia y capacitación en centros de excelencia mundial
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {doctorData.internationalTraining.map((training, index) => (
                            <motion.div
                                key={training.country}
                                className={`text-center p-6 rounded-xl ${training.highlight
                                        ? 'bg-primary text-white'
                                        : 'bg-light hover:bg-primary-50 transition-colors'
                                    }`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl mb-3">{training.flag}</div>
                                <h4 className={`font-semibold mb-1 ${training.highlight ? 'text-white' : 'text-dark'}`}>
                                    {training.country}
                                </h4>
                                <p className={`text-xs ${training.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                                    {training.institution}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membresías */}
            <section className="section bg-light-gradient">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Membresías y Certificaciones</h2>
                        <p className="section-subtitle">
                            Afiliaciones profesionales que garantizan excelencia
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {doctorData.memberships.map((membership, index) => (
                            <motion.div
                                key={membership.acronym}
                                className="bg-white px-6 py-4 rounded-xl shadow-card flex items-center gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                                <div>
                                    <span className="font-semibold text-primary">{membership.acronym}</span>
                                    <span className="text-gray-400 mx-2">|</span>
                                    <span className="text-gray-600 text-sm">{membership.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valores y Filosofía */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Filosofía de Trabajo</h2>
                        <p className="section-subtitle">
                            Los principios que guían cada procedimiento
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {doctorData.values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className="bg-light rounded-2xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                                    <Star className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="font-semibold text-dark mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="section bg-hero-gradient text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl md:text-4xl mb-4">
                            ¿Listo para dar el primer paso?
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            Agenda una consulta personalizada con el Dr. Manuel Sinchi y descubre
                            cómo podemos ayudarte a alcanzar tus objetivos.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="https://wa.me/51999999999"
                                target="_blank"
                                className="btn-accent inline-flex items-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Agendar por WhatsApp
                            </Link>
                            <Link
                                href="/#procedimientos"
                                className="btn-outline-white inline-flex items-center gap-2"
                            >
                                Ver procedimientos
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Lima, Perú
                            </span>
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Consulta confidencial
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
