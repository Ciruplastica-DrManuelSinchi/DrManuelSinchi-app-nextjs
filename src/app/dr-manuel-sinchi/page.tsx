'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
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
    MapPin,
    ChevronDown,
    Building,
    MessageCircle,
    Medal,
} from 'lucide-react'
import WorldMap from '@/app/components/ui/world-map/WorldMap'

// ── Constants ────────────────────────────────────────────────────────────────
const specialtyKeys = ['plasticSurgery', 'aestheticMedicine', 'reconstructiveSurgery'] as const
const educationKeys = ['degree', 'masters', 'residency', 'specialty'] as const
const experienceKeys = ['current', 'previous1', 'previous2'] as const
const valueKeys = ['safety', 'natural', 'personalized', 'updated'] as const

const specialtyIcons = {
    plasticSurgery: Sparkles,
    aestheticMedicine: Heart,
    reconstructiveSurgery: HandHelping,
}

const specialtyGradients = {
    plasticSurgery: 'from-[#1a0825] to-[#391142]',
    aestheticMedicine: 'from-[#391142] to-[#551a63]',
    reconstructiveSurgery: 'from-[#240c35] to-[#391142]',
}

const internationalTraining = [
    { key: 'sweden', flag: '🇸🇪', highlight: true },
    { key: 'usa', flag: '🇺🇸', highlight: false },
    { key: 'argentina', flag: '🇦🇷', highlight: false },
    { key: 'uruguay', flag: '🇺🇾', highlight: false },
    { key: 'mexico', flag: '🇲🇽', highlight: false },
    { key: 'bolivia', flag: '🇧🇴', highlight: false },
]

const memberships = [
    { name: 'Colegio Médico del Perú', acronym: 'CMP' },
    { name: 'Sociedad Peruana de Cirugía Plástica', acronym: 'SPCP' },
    { name: 'Sociedad Peruana de Cirugía Plástica, Reconstructiva y Estética', acronym: 'SPCPRE' },
    { name: 'International Commission on Occupational Health', acronym: 'ICOH' },
]

const credentials = { cmp: '58101', rne: '32231', rna: '3049' }

const heroOrbs = [
    { w: 420, h: 320, top: 3, left: -2, accent: true, dur: 7, delay: 0 },
    { w: 260, h: 360, top: 48, left: 68, accent: false, dur: 9, delay: 1.5 },
    { w: 310, h: 210, top: 68, left: 8, accent: true, dur: 8, delay: 3 },
    { w: 190, h: 290, top: 12, left: 84, accent: false, dur: 10, delay: 2 },
]

const valueIcons = [Shield, Star, Heart, GraduationCap]

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
    target,
    prefix = '',
    suffix = '',
}: {
    target: number
    prefix?: string
    suffix?: string
}) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const mv = useMotionValue(0)
    const spring = useSpring(mv, { stiffness: 50, damping: 20 })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (isInView) mv.set(target)
    }, [isInView, target, mv])

    useEffect(() => {
        return spring.on('change', (v) => setDisplay(Math.floor(v)))
    }, [spring])

    return (
        <span ref={ref}>
            {prefix}
            {display.toLocaleString()}
            {suffix}
        </span>
    )
}

// ── Timeline Item ─────────────────────────────────────────────────────────────
function TimelineItem({
    year,
    title,
    institution,
    side,
    index,
    color = 'primary',
}: {
    year: string
    title: string
    institution: string
    side: 'left' | 'right'
    index: number
    color?: 'primary' | 'accent'
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    const dotClass = color === 'accent' ? 'bg-accent' : 'bg-primary'
    const yearClass =
        color === 'accent'
            ? 'bg-accent/15 text-accent'
            : 'bg-primary/10 text-primary'

    return (
        <div ref={ref} className="grid grid-cols-[1fr_48px_1fr] mb-10 items-start">
            <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                className="pr-6 text-right"
            >
                {side === 'left' && (
                    <>
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${yearClass}`}>
                            {year}
                        </span>
                        <h4 className="font-semibold text-dark leading-snug">{title}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{institution}</p>
                    </>
                )}
            </motion.div>

            <div className="flex justify-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.09 + 0.2 }}
                    className={`relative z-10 w-4 h-4 rounded-full border-4 border-white shadow ${dotClass}`}
                    style={{ marginTop: 4 }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                className="pl-6"
            >
                {side === 'right' && (
                    <>
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${yearClass}`}>
                            {year}
                        </span>
                        <h4 className="font-semibold text-dark leading-snug">{title}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{institution}</p>
                    </>
                )}
            </motion.div>
        </div>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DoctorPage() {
    const t = useTranslations('doctorPage')

    return (
        <main className="min-h-screen overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
                {heroOrbs.map((orb, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full blur-3xl pointer-events-none ${
                            orb.accent ? 'bg-accent/15' : 'bg-[#7b2fa0]/20'
                        }`}
                        style={{ width: orb.w, height: orb.h, top: `${orb.top}%`, left: `${orb.left}%` }}
                        animate={{ y: [0, -28, 0], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}

                <div className="container-custom relative z-10 py-32">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-wrap gap-2 mb-8"
                            >
                                <span className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                                    CMP {credentials.cmp}
                                </span>
                                <span className="bg-white/10 text-white/70 border border-white/20 px-3 py-1 rounded-full text-xs">
                                    RNE {credentials.rne}
                                </span>
                                <span className="bg-white/10 text-white/70 border border-white/20 px-3 py-1 rounded-full text-xs">
                                    RNA {credentials.rna}
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <h1 className="font-display leading-none mb-2">
                                    <span className="block text-2xl md:text-3xl font-normal text-white/60 mb-1">
                                        Dr. Manuel
                                    </span>
                                    <span className="block text-7xl md:text-8xl font-bold text-accent leading-none">
                                        Sinchi
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.25 }}
                                className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase mt-5 mb-6"
                            >
                                {t('title')}
                            </motion.p>

                            <motion.blockquote
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="text-white/75 text-lg italic mb-10 pl-5 border-l-2 border-accent"
                            >
                                &ldquo;{t('quote')}&rdquo;
                            </motion.blockquote>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <a
                                    href="https://wa.me/51961360074"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t('buttons.scheduleAppointment')}
                                </a>
                                <a href="#trayectoria" className="btn-secondary">
                                    {t('buttons.viewTrajectory')}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative flex justify-center"
                        >
                            <motion.div
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: '78%',
                                    aspectRatio: '1',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'conic-gradient(from 0deg, #d4a853 0%, transparent 35%, transparent 65%, #d4a853 100%)',
                                    filter: 'blur(10px)',
                                }}
                                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.25, 0.5] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            <div className="relative w-full max-w-sm">
                                <div className="absolute inset-0 bg-accent/15 rounded-3xl rotate-2 scale-[1.03] z-0" />
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-strong z-10">
                                    <Image
                                        src="/images/dr-sinchi-portrait.jpg"
                                        alt={t('name')}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: -16, y: 8 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ delay: 0.75, duration: 0.5 }}
                                    className="absolute -left-8 bottom-14 bg-white rounded-2xl px-4 py-3 shadow-strong flex items-center gap-3 z-20"
                                >
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Award className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-dark leading-none">{t('badges.certified')}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{t('badges.certifiedBy')}</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 16, y: -8 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.5 }}
                                    className="absolute -right-6 top-10 bg-accent text-dark rounded-2xl px-4 py-3 shadow-strong z-20 text-center"
                                >
                                    <div className="text-3xl font-display font-bold leading-none">15+</div>
                                    <div className="text-xs font-semibold mt-0.5 opacity-70">Años exp.</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6 text-white/30" />
                </motion.div>
            </section>

            {/* ── STATS BAR ──────────────────────────────────────────────── */}
            <section className="py-14 border-b border-white/5" style={{ background: '#1a0d28' }}>
                <div className="container-custom">
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        {[
                            { target: 15, prefix: '+', suffix: '', label: t('stats.experience') },
                            { target: 5000, prefix: '+', suffix: '', label: t('stats.procedures') },
                            { target: 100, prefix: '', suffix: '%', label: t('stats.commitment') },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="font-display text-4xl md:text-5xl font-bold text-accent">
                                    <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <div className="text-white/45 text-sm mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BIO ────────────────────────────────────────────────────── */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <span className="absolute -top-12 -left-4 font-display text-[160px] leading-none text-primary/5 select-none pointer-events-none font-bold">
                                &ldquo;
                            </span>
                            <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-5">
                                {t('sections.aboutTitle')}
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-3">
                                {t('name')}
                            </h2>
                            <p className="text-accent font-semibold text-base">{t('title')}</p>
                            <div className="flex gap-8 mt-10 pt-8 border-t border-gray-200">
                                {[
                                    { label: 'CMP', value: credentials.cmp },
                                    { label: 'RNE', value: credentials.rne },
                                    { label: 'RNA', value: credentials.rna },
                                ].map((c) => (
                                    <div key={c.label}>
                                        <div className="text-xs font-bold text-gray-400 tracking-widest">{c.label}</div>
                                        <div className="font-semibold text-dark text-lg">{c.value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('fullBio')}</p>
                            <p className="text-gray-500 leading-relaxed border-l-2 border-accent/50 pl-5">
                                {t('cvIntroduction')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SPECIALTIES — Tall gradient panels ─────────────────────── */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-3">
                            {t('sections.specialtiesTitle')}
                        </span>
                        <h2 className="section-title mb-0">{t('sections.specialtiesSubtitle')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {specialtyKeys.map((key, index) => {
                            const Icon = specialtyIcons[key]
                            return (
                                <motion.div
                                    key={key}
                                    className={`relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col justify-end bg-gradient-to-br ${specialtyGradients[key]} p-8`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Background watermark number */}
                                    <span className="absolute top-4 right-5 font-display font-bold leading-none select-none text-white/[0.05]" style={{ fontSize: '7rem' }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-8 right-8 h-0.5 bg-accent/25" />

                                    <div className="relative z-10">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                                            style={{ background: 'rgba(212,168,83,0.15)' }}
                                        >
                                            <Icon className="w-7 h-7 text-accent" />
                                        </div>
                                        <h3 className="font-display text-2xl text-white font-bold mb-3">
                                            {t(`specialties.${key}.name`)}
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            {t(`specialties.${key}.description`)}
                                        </p>
                                        <Link href="/reservar" className="btn-primary text-sm">
                                            Agendar consulta <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── TRAJECTORY (Alternating Timeline) ──────────────────────── */}
            <section id="trayectoria" className="section bg-light">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-3">
                            {t('sections.trajectorySubtitle')}
                        </span>
                        <h2 className="section-title mb-0">{t('sections.trajectoryTitle')}</h2>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            className="flex items-center gap-3 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full">
                                <GraduationCap className="w-4 h-4" />
                                {t('sections.educationTitle')}
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </motion.div>

                        <div className="relative mb-14">
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
                            {educationKeys.map((key, i) => (
                                <TimelineItem
                                    key={key}
                                    year={t(`education.${key}.year`)}
                                    title={t(`education.${key}.title`)}
                                    institution={t(`education.${key}.institution`)}
                                    side={i % 2 === 0 ? 'left' : 'right'}
                                    index={i}
                                    color="primary"
                                />
                            ))}
                        </div>

                        <motion.div
                            className="flex items-center gap-3 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 bg-accent text-dark text-sm font-semibold px-5 py-2 rounded-full">
                                <Building className="w-4 h-4" />
                                {t('sections.experienceTitle')}
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </motion.div>

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
                            {experienceKeys.map((key, i) => (
                                <TimelineItem
                                    key={key}
                                    year={t(`experience.${key}.year`)}
                                    title={t(`experience.${key}.position`)}
                                    institution={t(`experience.${key}.institution`)}
                                    side={i % 2 === 0 ? 'left' : 'right'}
                                    index={i}
                                    color="accent"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INTERNATIONAL TRAINING ──────────────────────────────────── */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-3">
                            {t('sections.internationalSubtitle')}
                        </span>
                        <h2 className="section-title mb-0">{t('sections.internationalTitle')}</h2>
                    </motion.div>

                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <WorldMap />
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {internationalTraining.map((training, index) => (
                            <motion.div
                                key={training.key}
                                className={`text-center p-5 rounded-2xl transition-colors duration-200 ${
                                    training.highlight
                                        ? 'bg-primary text-white'
                                        : 'bg-light hover:bg-primary/5'
                                }`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.06 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-3xl mb-2">{training.flag}</div>
                                <h4 className={`font-semibold text-sm mb-1 ${training.highlight ? 'text-white' : 'text-dark'}`}>
                                    {t(`internationalTraining.${training.key}.country`)}
                                </h4>
                                {training.highlight && (
                                    <span className="inline-block text-xs bg-accent/25 text-accent px-2 py-0.5 rounded-full mb-1">
                                        Principal
                                    </span>
                                )}
                                <p className={`text-xs ${training.highlight ? 'text-white/65' : 'text-gray-400'}`}>
                                    {t(`internationalTraining.${training.key}.institution`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MEMBERSHIPS — Premium credential cards ───────────────────── */}
            <section className="section bg-light">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-3">
                            {t('sections.membershipsSubtitle')}
                        </span>
                        <h2 className="section-title mb-0">{t('sections.membershipsTitle')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        {memberships.map((m, index) => (
                            <motion.div
                                key={m.acronym}
                                className="relative rounded-2xl overflow-hidden bg-primary flex items-start gap-5 p-7"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {/* Gold accent bar left */}
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />

                                {/* Icon */}
                                <div
                                    className="w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(212,168,83,0.15)', width: 52, height: 52 }}
                                >
                                    <Medal className="w-6 h-6 text-accent" />
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-display text-2xl text-accent font-bold leading-none mb-2">
                                        {m.acronym}
                                    </div>
                                    <p className="text-white/60 text-sm leading-snug">{m.name}</p>
                                </div>

                                {/* Watermark acronym */}
                                <span className="absolute right-4 bottom-1 font-display font-bold leading-none select-none text-white/[0.04]" style={{ fontSize: '3.5rem' }}>
                                    {m.acronym}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VALUES / PHILOSOPHY ──────────────────────────────────────── */}
            <section className="section bg-white">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold text-accent tracking-[0.25em] uppercase block mb-3">
                            {t('sections.valuesSubtitle')}
                        </span>
                        <h2 className="section-title mb-0">{t('sections.valuesTitle')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {valueKeys.map((key, index) => {
                            const Icon = valueIcons[index]
                            return (
                                <motion.div
                                    key={key}
                                    className="relative bg-light rounded-2xl p-8 overflow-hidden hover:shadow-card transition-shadow duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Background watermark number */}
                                    <span className="absolute right-4 top-2 font-display font-bold leading-none select-none text-primary/[0.05]" style={{ fontSize: '7rem' }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Accent line */}
                                    <div className="w-8 h-0.5 bg-accent mb-6" />

                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>

                                    <h3 className="font-display text-xl text-dark mb-3">
                                        {t(`values.${key}.title`)}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {t(`values.${key}.description`)}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="relative section bg-hero-gradient overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
                    style={{ transform: 'translate(30%, -30%)' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'rgba(123,47,160,0.25)', transform: 'translate(-30%, 30%)' }}
                />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />

                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
                            {t('cta.title')}
                        </h2>
                        <p className="text-white/65 text-lg mb-10 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="https://wa.me/51961360074"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                <Phone className="w-5 h-5" />
                                {t('buttons.scheduleWhatsApp')}
                            </a>
                            <Link href="/#procedimientos" className="btn-secondary">
                                {t('buttons.viewProcedures')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-8 mt-10 text-white/35 text-sm">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {t('cta.location')}
                            </span>
                            <span className="text-white/20">|</span>
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                {t('cta.confidential')}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
