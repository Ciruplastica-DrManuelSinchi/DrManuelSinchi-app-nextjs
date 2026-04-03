'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import {
    ChevronRight,
    Sparkles,
    ArrowRight,
    ArrowUpRight,
    Star,
    Users,
    Award,
    CheckCircle2,
    Smile,
    Heart,
    Zap,
    Shield,
    Scissors
} from 'lucide-react'

// Iconos para cada categoría (las principales tienen iconos específicos)
const categoryIcons: Record<string, React.ElementType> = {
    facial: Smile,
    corporal: Heart,
    estetica: Zap,
    reconstructiva: Shield,
    cabello: Scissors,
}

// Tipo para categorías de la API
interface ApiCategory {
    id: string
    name: string
    slug: string
    urlPath: string | null
    description: string | null
    procedures: { name: string; slug: string }[]
}

export default function Procedimientos() {
    const t = useTranslations('proceduresPage')
    const tNav = useTranslations('navigation')
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
    // const [dynamicCategories, setDynamicCategories] = useState<ApiCategory[]>([])

    const categories = [
        // Cargar categorías dinámicas desde la API
        // useEffect(() => {
        //     fetch('/api/categories')
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data.categories) {
        //                 // Filtrar las categorías que NO son las 4 principales (por slug)
        //                 const mainSlugs = ['facial', 'corporal', 'estetica', 'reconstructiva']
        //                 const extraCategories = data.categories.filter(
        //                     (cat: ApiCategory) => !mainSlugs.includes(cat.slug)
        //                 )
        //                 // setDynamicCategories(extraCategories)
        //             }
        //         })
        //         .catch(err => console.error('Error loading categories:', err))
        // }, [])
    // ];
    // Las 4 categorías principales (hardcodeadas con traducciones)
    //  const mainCategories = [
        {
            id: 'facial',
            name: tNav('categories.facialSurgery'),
            description: t('categories.facial.description'),
            href: '/cirugia-plastica-facial',
            icon: categoryIcons.facial,
            stats: { count: '13', label: 'procedimientos' },
            procedures: [
                { name: tNav('procedureNames.rhinoplasty'), href: '/cirugia-plastica-facial/rinoplastia', featured: true },
                { name: tNav('procedureNames.blepharoplasty'), href: '/cirugia-plastica-facial/blefaroplastia', featured: true },
                { name: tNav('procedureNames.liftingFoxEyes'), href: '/cirugia-plastica-facial/lifting-facial' },
                { name: tNav('procedureNames.otoplasty'), href: '/cirugia-plastica-facial/otoplastia' },
                { name: tNav('procedureNames.mentoplasty'), href: '/cirugia-plastica-facial/mentoplastia' },
                { name: tNav('procedureNames.bichectomy'), href: '/cirugia-plastica-facial/bichectomia', featured: true },
                { name: tNav('procedureNames.chinLipo'), href: '/cirugia-plastica-facial/lipo-papada' },
                { name: tNav('procedureNames.profiloplasty'), href: '/cirugia-plastica-facial/perfiloplastia' },
            ],
        },
        {
            id: 'corporal',
            name: tNav('categories.bodySurgery'),
            description: t('categories.corporal.description'),
            href: '/cirugia-plastica-corporal',
            icon: categoryIcons.corporal,
            stats: { count: '11', label: 'procedimientos' },
            procedures: [
                { name: tNav('procedureNames.liposculpture'), href: '/cirugia-plastica-corporal/lipo-escultura', featured: true },
                { name: tNav('procedureNames.abdominoplasty'), href: '/cirugia-plastica-corporal/abdominoplastia', featured: true },
                { name: tNav('procedureNames.breastAugmentation'), href: '/cirugia-plastica-corporal/mamoplastia-aumento', featured: true },
                { name: tNav('procedureNames.mastopexy'), href: '/cirugia-plastica-corporal/mastopexia' },
                { name: tNav('procedureNames.breastReduction'), href: '/cirugia-plastica-corporal/mamoplastia-reduccion' },
                { name: tNav('procedureNames.gluteoplasty'), href: '/cirugia-plastica-corporal/gluteoplasty' },
                { name: tNav('procedureNames.mommyMakeover'), href: '/cirugia-plastica-corporal/mommy-makeover', featured: true },
                { name: tNav('procedureNames.lipoabdominoplasty'), href: '/cirugia-plastica-corporal/lipoabdominoplastia' },
            ],
        },
        {
            id: 'estetica',
            name: tNav('categories.aestheticMedicine'),
            description: t('categories.estetica.description'),
            href: '/medicina-estetica',
            icon: categoryIcons.estetica,
            stats: { count: '9', label: 'tratamientos' },
            procedures: [
                { name: tNav('procedureNames.botox'), href: '/medicina-estetica/botox', featured: true },
                { name: tNav('procedureNames.hyaluronicAcid'), href: '/medicina-estetica/acido-hialuronico', featured: true },
                { name: tNav('procedureNames.biostimulators'), href: '/medicina-estetica/bioestimuladores' },
                { name: tNav('procedureNames.facialLaser'), href: '/medicina-estetica/laser-facial' },
                { name: tNav('procedureNames.prpFacial'), href: '/medicina-estetica/plasma-rico-plaquetas' },
                { name: tNav('procedureNames.lipFillers'), href: '/medicina-estetica/rellenos-labios', featured: true },
                { name: tNav('procedureNames.radiofrequencyUltrasound'), href: '/medicina-estetica/radiofrecuencia-ultrasonido' },
            ],
        },
        {
            id: 'reconstructiva',
            name: tNav('categories.reconstructive'),
            description: t('categories.reconstructiva.description'),
            href: '/cirugia-reconstructiva',
            icon: categoryIcons.reconstructiva,
            stats: { count: '5', label: 'procedimientos' },
            procedures: [
                { name: tNav('procedureNames.scars'), href: '/cirugia-reconstructiva/cicatrices', featured: true },
                { name: tNav('procedureNames.biopolymerRemoval'), href: '/cirugia-reconstructiva/retiro-biopolimeros', featured: true },
                { name: tNav('procedureNames.tumorsCarcinomas'), href: '/cirugia-reconstructiva/tumores-carcinomas' },
                { name: tNav('procedureNames.woundsUlcers'), href: '/cirugia-reconstructiva/heridas-ulceras' },
                { name: tNav('procedureNames.burns'), href: '/cirugia-reconstructiva/quemaduras' },
            ],
        },
        {
            id: 'cabello',
            name: tNav('categories.hairSurgery'),
            description: t('categories.cabello.description'),
            href: '/cirugia-capilar',
            icon: categoryIcons.cabello,
            stats: { count: '3', label: 'tratamientos' },
            procedures: [
                { name: tNav('procedureNames.hairTransplant'), href: '/cirugia-capilar/transplante-capilar', featured: true },
                { name: tNav('procedureNames.hairMicrografting'), href: '/cirugia-capilar/microinjerto-capilar', featured: true },
                { name: tNav('procedureNames.scalpPrp'), href: '/cirugia-capilar/prp-capilar' },
            ],
        },
     ]

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section - Minimal & Elegant */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#f8f7f4]">
                <div className="container-custom">
                    {/* Breadcrumbs */}
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-gray-400 mb-12"
                    >
                        <Link href="/" className="hover:text-primary transition-colors">
                            {t('breadcrumbs.home')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary">{t('title')}</span>
                    </motion.nav>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-8 border border-primary/10">
                                <Sparkles className="w-4 h-4" />
                                {t('badge')}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-6 leading-tight">
                                {t('heroTitle')}
                                <span className="text-primary"> {t('heroHighlight')}</span>
                            </h1>

                            <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                                {t('description')}
                            </p>
                        </motion.div>

                        {/* Stats inline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-12"
                        >
                            {[
                                { value: '5,000+', label: t('stats.procedures') },
                                { value: '15+', label: t('stats.experience') },
                                { value: '98%', label: t('stats.satisfaction') },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl md:text-4xl font-display font-bold text-dark">{stat.value}</div>
                                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section - Elegant Single Column */}
            <section className="py-24 md:py-32">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
                            {t('categoriesTitle')}
                        </h2>
                        <p className="text-lg text-gray-400 max-w-xl mx-auto">
                            {t('categoriesSubtitle')}
                        </p>
                    </motion.div>

                    {/* Categories - Elegant horizontal cards */}
                    <div className="space-y-6">
                        {categories.map((category, index) => {
                            const Icon = category.icon
                            const isHovered = hoveredCategory === category.id

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredCategory(category.id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                    className={`
                                        group relative bg-[#f8f7f4] rounded-2xl transition-all duration-500 overflow-hidden
                                        ${isHovered ? 'bg-white shadow-xl' : 'hover:bg-white hover:shadow-lg'}
                                    `}
                                >
                                    <div className="p-8 md:p-10">
                                        {/* Header */}
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                                            {/* Left - Icon & Title */}
                                            <div className="flex items-start gap-5 lg:w-80 flex-shrink-0">
                                                <div className={`
                                                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                                                    ${isHovered ? 'bg-primary text-white' : 'bg-primary/5 text-primary'}
                                                `}>
                                                    <Icon className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-display font-bold text-dark mb-1">
                                                        {category.name}
                                                    </h3>
                                                    <span className="text-sm text-gray-400">
                                                        {category.stats.count} {category.stats.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Center - Description & Procedures */}
                                            <div className="flex-1">
                                                <p className="text-gray-500 mb-6 leading-relaxed">
                                                    {category.description}
                                                </p>

                                                {/* Procedures grid */}
                                                <div className="flex flex-wrap gap-2">
                                                    {category.procedures.map((proc) => (
                                                        <Link
                                                            key={proc.name}
                                                            href={proc.href}
                                                            className={`
                                                                group/proc inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200
                                                                ${proc.featured
                                                                    ? 'bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white hover:border-primary'
                                                                    : 'bg-gray-100/80 text-gray-600 hover:bg-primary/10 hover:text-primary'
                                                                }
                                                            `}
                                                        >
                                                            {proc.name}
                                                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/proc:opacity-100 group-hover/proc:translate-x-0 transition-all" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right - CTA */}
                                            <div className="lg:w-48 flex-shrink-0">
                                                <Link
                                                    href={category.href}
                                                    className={`
                                                        group/btn flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium transition-all duration-300
                                                        ${isHovered
                                                            ? 'bg-primary text-white'
                                                            : 'bg-white text-primary border border-gray-200 hover:border-primary'
                                                        }
                                                    `}
                                                >
                                                    Ver todos
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover accent line */}
                                    <div className={`
                                        absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500
                                        ${isHovered ? 'w-full' : 'w-0'}
                                    `} />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-[#f8f7f4]">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
                                    {t('whyUs.badge')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">
                                    {t('whyUs.title')}
                                </h2>
                                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                                    {t('whyUs.description')}
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: t('whyUs.feature1.title'), desc: t('whyUs.feature1.desc') },
                                        { title: t('whyUs.feature2.title'), desc: t('whyUs.feature2.desc') },
                                        { title: t('whyUs.feature3.title'), desc: t('whyUs.feature3.desc') },
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-dark mb-1">{feature.title}</h4>
                                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-white rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-20 h-20 rounded-2xl bg-[#f8f7f4] flex items-center justify-center">
                                            <Award className="w-10 h-10 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-display font-bold text-xl text-dark">Dr. Manuel Sinchi</div>
                                            <div className="text-gray-400 text-sm">Cirujano Plástico Certificado</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <span className="text-gray-500">Experiencia</span>
                                            <span className="font-semibold text-dark">+15 años</span>
                                        </div>
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <span className="text-gray-500">Procedimientos</span>
                                            <span className="font-semibold text-dark">+5,000</span>
                                        </div>
                                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                            <span className="text-gray-500">Satisfacción</span>
                                            <span className="font-semibold text-dark">98%</span>
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <span className="text-gray-500">Valoración</span>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/dr-manuel-sinchi"
                                        className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#f8f7f4] text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Conocer al doctor
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-dark mb-6">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/reservar"
                                className="group inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-dark transition-all duration-300"
                            >
                                {t('cta.scheduleBtn')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="https://wa.me/51961360074"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-[#f8f7f4] text-dark px-10 py-5 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
