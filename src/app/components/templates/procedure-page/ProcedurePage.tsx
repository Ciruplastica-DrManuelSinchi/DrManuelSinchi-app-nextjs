'use client'

import Image from 'next/image'
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
    PlayCircle,
    Youtube,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

import { ProcedureData, defaultCTA, defaultCTAEn, defaultAssessmentQuestions, defaultAssessmentQuestionsEn } from './types'
import SelfAssessment from '@/app/components/ui/self-assessment/SelfAssessment'

interface ProcedurePageProps {
    data: ProcedureData
}

export default function ProcedurePage({ data }: ProcedurePageProps) {
    const t = useTranslations('procedurePage')
    const tCommon = useTranslations('common')
    const locale = useLocale()

    //Estados
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [activeImage, setActiveImage] = useState(0)

    // Apply English overrides when locale is 'en' and data.en exists
    const isEn = locale === 'en' && !!data.en
    const enData = data.en

    // Locale-aware content
    const categoryLabel = isEn && enData?.categoryLabel ? enData.categoryLabel : data.categoryLabel
    const hero = isEn && enData?.hero ? { ...data.hero, ...enData.hero } : data.hero
    const info = isEn && enData?.info ? {
        ...data.info,
        title: enData.info.title || data.info.title,
        content: enData.info.content || data.info.content,
        highlights: data.info.highlights && enData.info.highlights ? {
            ...data.info.highlights,
            title: enData.info.highlights.title || data.info.highlights.title,
            items: enData.info.highlights.items || data.info.highlights.items,
        } : data.info.highlights,
    } : data.info

    // Benefits with locale-aware text (keeping original icons)
    const benefits = isEn && enData?.benefits && enData.benefits.length === data.benefits.length
        ? data.benefits.map((b, i) => ({
            ...b,
            title: enData.benefits![i].title,
            description: enData.benefits![i].description,
        }))
        : data.benefits

    // Process with locale-aware text (keeping original icons and step numbers)
    const process = isEn && enData?.process && enData.process.length === data.process.length
        ? data.process.map((p, i) => ({
            ...p,
            title: enData.process![i].title,
            description: enData.process![i].description,
            duration: enData.process![i].duration || p.duration,
        }))
        : data.process

    // FAQs with locale-aware content
    const faqs = isEn && enData?.faqs && enData.faqs.length > 0 ? enData.faqs : data.faqs

    // CTA with locale-aware text
    const ctaBase = isEn ? { ...defaultCTA, ...defaultCTAEn } : defaultCTA
    const ctaEn = isEn && enData?.cta ? enData.cta : {}
    const cta = { ...ctaBase, ...data.cta, ...ctaEn }

    // Self-assessment questions
    const showSelfAssessment = data.selfAssessment?.enabled !== false
    const assessmentQuestions = data.selfAssessment?.questions || (isEn ? defaultAssessmentQuestionsEn : defaultAssessmentQuestions)

    const whatsappMessage = data.hero.whatsappMessage || `Hola, me interesa información sobre ${data.hero.title.toLowerCase()}`

    return (
        <main className="min-h-screen">
            {/* ==================== HERO ==================== */}
            <section className="relative bg-hero-gradient pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-start gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">
                            {t('breadcrumbs.home')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={data.categoryPath} className="hover:text-white transition-colors">
                            {categoryLabel}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-accent">{hero.title}</span>
                    </nav>

                    <div className="max-w-4xl mr-auto ml-0 text-left">
                        {/* Content */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-accent mb-6 inline-flex"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            {hero.badge}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white mb-4"
                        >
                            {hero.title}
                        </motion.h1>

                        {/* Línea decorativa dorada */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="h-[2px] w-20 bg-accent mr-auto mb-6"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
                        >
                            {hero.description}
                        </motion.p>

                        {/* Quick Info Pills - Hidden on mobile for cleaner UX */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hidden md:flex flex-wrap justify-start gap-4 mb-8"
                        >
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4 text-accent" />
                                <span className="text-white text-sm">{hero.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                <Timer className="w-4 h-4 text-accent" />
                                <span className="text-white text-sm">{hero.recovery}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                <Shield className="w-4 h-4 text-accent" />
                                <span className="text-white text-sm">{hero.anesthesia}</span>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row justify-start gap-4"
                        >
                            <Link href="/reservar" className="btn-primary">
                                <Calendar className="w-4 h-4" />
                                {t('hero.scheduleAppointment')}
                            </Link>
                            <a
                                href={`https://wa.me/${cta.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                <MessageCircle className="w-4 h-4" />
                                {t('hero.contactWhatsapp')}
                            </a>
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
                            <span className="badge-primary mb-4">{t('info.badge')}</span>
                            <h2 className="mb-6">{info.title}</h2>

                            <div className="space-y-4 text-gray-600">
                                {info.content.map((paragraph, index) => (
                                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                ))}
                            </div>

                            {/* Highlights */}
                            {info.highlights && (
                                <div className="mt-8 p-6 bg-primary-50 rounded-2xl">
                                    <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                        {info.highlights.icon && <info.highlights.icon className="w-5 h-5" />}
                                        {info.highlights.title}
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {info.highlights.items.map((item, i) => (
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
                                    src={info.image}
                                    alt={info.title}
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
                            <span className="badge-accent mb-4">{t('beforeAfter.badge')}</span>
                            <h2 className="section-title">{t('beforeAfter.title')}</h2>
                            <p className="section-subtitle">
                                {t('beforeAfter.description')}
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
                                        alt={tCommon('labels.before')}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-4 py-2 rounded-full">
                                        {tCommon('labels.before')}
                                    </span>
                                </div>
                                <div className="absolute inset-0 left-1/2 w-1/2">
                                    <Image
                                        src={data.beforeAfter[activeImage].after}
                                        alt={tCommon('labels.after')}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-4 right-4 bg-accent text-dark text-sm font-semibold px-4 py-2 rounded-full">
                                        {tCommon('labels.after')}
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
                                {t('beforeAfter.viewMore')}
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
                        <h2 className="section-title">{t('benefits.title')}</h2>
                        <p className="section-subtitle">
                            {t('benefits.description')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
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

            {/* ==================== SELF-ASSESSMENT ==================== */}
            {showSelfAssessment && (
                <SelfAssessment
                    procedureName={hero.title}
                    procedureSlug={data.slug}
                    questions={assessmentQuestions}
                    whatsappNumber={cta.whatsappNumber}
                />
            )}

            {/* ==================== PROCESS & RECOVERY ==================== */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="section-header">
                        <span className="badge-primary mb-4">{t('process.badge')}</span>
                        <h2 className="section-title">{t('process.title')}</h2>
                        <p className="section-subtitle">{t('process.description')}</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {process.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex gap-6 pb-12 last:pb-0"
                            >
                                {index < process.length - 1 && (
                                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-primary/20" />
                                )}

                                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-medium">
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>

                                <div className="flex-1 bg-light rounded-2xl p-6">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            {t('process.step')} {step.step}
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
            {data.videos.length > 0 ? (
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="section-header">
                            <span className="badge-accent mb-4">{t('videosSection.badge')}</span>
                            <h2 className="section-title">{t('videosSection.title')}</h2>
                            <p className="section-subtitle">
                                {t('videosSection.description')}
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
                                {t('videosSection.viewAll')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-12 bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="relative bg-hero-gradient rounded-2xl p-6 md:p-8 overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-5" />

                                {/* Decorative Element */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                    {/* Play Icon */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex-shrink-0"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg scale-125" />
                                            <div className="relative w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                                                <PlayCircle className="w-8 h-8 text-dark" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                            Videos <span className="text-accent">{t('videosSection.comingSoon')}</span>
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            {t('videosSection.preparingContent')}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href="https://www.youtube.com/@drmanuelsinchi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-full text-sm transition-all hover:bg-accent hover:text-dark"
                                    >
                                        <Youtube className="w-4 h-4" />
                                        {t('videosSection.viewChannel')}
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ==================== FAQ ==================== */}
            <section className="section bg-light">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <span className="badge-primary mb-4">{t('faqSection.badge')}</span>
                            <h2 className="mb-6">{t('faqSection.title')}</h2>
                            <p className="text-gray-600 mb-6">
                                {t('faqSection.description')}
                            </p>

                            <div className="p-6 bg-accent/10 rounded-2xl">
                                <h4 className="font-semibold text-dark mb-3">{t('faqSection.moreQuestions')}</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    {t('faqSection.scheduleConsultation')}
                                </p>
                                <a
                                    href={`https://wa.me/${cta.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {t('hero.contactWhatsapp')}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
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
            <section className="section bg-white">
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
                                <Link href="/reservar" className="btn-primary">
                                    <Calendar className="w-4 h-4" />
                                    {t('hero.scheduleAppointment')}
                                </Link>
                                <a href={`tel:${cta.phoneNumber}`} className="btn-secondary">
                                    <Phone className="w-4 h-4" />
                                    {t('cta.callNow')}
                                </a>
                                <a
                                    href={`https://wa.me/${cta.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {t('cta.whatsapp')}
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
