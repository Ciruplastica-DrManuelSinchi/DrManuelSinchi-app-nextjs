'use client'

import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Hero() {
    const t = useTranslations('hero')

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Video - Desktop only */}
            <motion.div
                className="absolute inset-0 w-full h-full hidden md:block"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-captura.png"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Background Image - Mobile fallback */}
            <motion.div
                className="absolute inset-0 w-full h-full md:hidden"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                style={{
                    backgroundImage: 'url(/images/hero-captura.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: `linear-gradient(
                        to bottom,
                        rgba(57, 17, 66, 0.7) 0%,
                        rgba(57, 17, 66, 0.5) 50%,
                        rgba(31, 10, 36, 0.8) 100%
                    )`,
                }}
            />

            {/* Content - Simplified */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">

                {/* Main Headline */}
                <motion.h1
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {t('title')} <span className="text-accent">{t('titleHighlight')}</span>
                </motion.h1>

                {/* Short subtitle */}
                <motion.p
                    className="font-body text-lg sm:text-xl text-white/70 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {t('subtitleShort')}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Link
                        href="/reservar"
                        className="inline-flex items-center justify-center px-10 py-4 text-lg font-body font-semibold text-primary bg-accent rounded-full transition-all duration-300 hover:bg-accent/90 hover:scale-105 hover:shadow-xl hover:shadow-accent/25"
                    >
                        {t('cta')}
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    })
                }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <ChevronDown className="w-8 h-8 text-white/50 hover:text-accent transition-colors" />
                </motion.div>
            </motion.div>
        </section>
    )
}
