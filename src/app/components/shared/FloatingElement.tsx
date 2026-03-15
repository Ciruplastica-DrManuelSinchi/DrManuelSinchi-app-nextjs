'use client'

import { motion } from 'framer-motion'
import { useSimpleParallax } from '@/hooks/useParallax'
import { ReactNode } from 'react'

interface FloatingElementProps {
    children: ReactNode
    /** Velocidad del parallax (negativo = hacia arriba al scrollear) */
    parallaxSpeed?: number
    /** Intensidad de la flotación (en píxeles) */
    floatIntensity?: number
    /** Duración de un ciclo de flotación (en segundos) */
    floatDuration?: number
    /** Retraso inicial de la animación */
    delay?: number
    className?: string
    /** Desactivar parallax */
    disableParallax?: boolean
}

export default function FloatingElement({
    children,
    parallaxSpeed = 0.3,
    floatIntensity = 10,
    floatDuration = 4,
    delay = 0,
    className = '',
    disableParallax = false,
}: FloatingElementProps) {
    const { ref, y: parallaxY } = useSimpleParallax(parallaxSpeed)

    return (
        <motion.div
            ref={disableParallax ? undefined : ref}
            style={disableParallax ? undefined : { y: parallaxY }}
            animate={{
                y: [0, -floatIntensity, 0],
            }}
            transition={{
                duration: floatDuration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Variante con rotación
export function FloatingRotateElement({
    children,
    floatIntensity = 10,
    floatDuration = 4,
    rotateIntensity = 5,
    delay = 0,
    className = '',
}: FloatingElementProps & { rotateIntensity?: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -floatIntensity, 0],
                rotate: [-rotateIntensity, rotateIntensity, -rotateIntensity],
            }}
            transition={{
                duration: floatDuration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Variante con escala pulsante
export function PulsingElement({
    children,
    scaleIntensity = 0.05,
    duration = 2,
    delay = 0,
    className = '',
}: {
    children: ReactNode
    scaleIntensity?: number
    duration?: number
    delay?: number
    className?: string
}) {
    return (
        <motion.div
            animate={{
                scale: [1, 1 + scaleIntensity, 1],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Badge flotante decorativo
export function FloatingBadge({
    icon: Icon,
    delay = 0,
    className = '',
}: {
    icon: React.ComponentType<{ className?: string }>
    delay?: number
    className?: string
}) {
    return (
        <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
                duration: 3,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${className}`}
        >
            <Icon className="w-6 h-6 text-accent" />
        </motion.div>
    )
}
