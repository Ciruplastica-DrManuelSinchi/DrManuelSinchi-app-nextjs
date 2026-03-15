'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { FloatingParticles, OrbitalGradients } from '@/app/components/shared/AnimatedShapes'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Video with Ken Burns Effect */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
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
            </motion.div>

            {/* Radial Vignette Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: `radial-gradient(
                        ellipse at center,
                        rgba(57, 17, 66, 0.7) 0%,
                        rgba(31, 10, 36, 0.4) 70%,
                        rgba(20, 5, 25, 0.6) 100%
                    )`,
                }}
            />

            {/* Animated Effects Layer */}
            <div className="absolute inset-0 z-[11]">
                <OrbitalGradients />
                <FloatingParticles count={15} />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                {/* Main Title */}
                <motion.h1
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Ciruplástica
                </motion.h1>

                {/* Decorative Gold Line */}
                <motion.div
                    className="w-16 h-[2px] bg-accent mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Subtitle */}
                <motion.p
                    className="font-body font-light text-lg sm:text-xl md:text-2xl text-white/90 tracking-wider mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Cirugía Plástica & Medicina Estética
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link
                        href="/contacto"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-body font-medium tracking-widest text-accent uppercase border border-accent/60 bg-transparent transition-all duration-500 hover:bg-accent hover:text-primary hover:border-accent overflow-hidden"
                    >
                        <span className="relative z-10">Agenda tu consulta</span>
                        <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            Agenda tu consulta
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    })
                }}
            >
                <span className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2 font-body">
                    Descubrir
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <ChevronDown className="w-5 h-5 text-accent/80" />
                </motion.div>
            </motion.div>
        </section>
    )
}
