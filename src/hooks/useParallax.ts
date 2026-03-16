'use client'

import { useRef } from 'react'
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

interface UseParallaxOptions {
    /** Intensidad del efecto parallax (0 a 1, default 0.2) */
    intensity?: number
    /** Offset de inicio y fin del scroll */
    offset?: ['start end' | 'end start' | 'center center', 'start end' | 'end start' | 'center center']
    /** Aplicar spring para movimiento más suave */
    smooth?: boolean
    /** Configuración del spring */
    springConfig?: {
        stiffness?: number
        damping?: number
        mass?: number
    }
}

interface UseParallaxReturn {
    ref: React.RefObject<HTMLDivElement>
    y: MotionValue<number>
    x: MotionValue<number>
    scale: MotionValue<number>
    opacity: MotionValue<number>
    rotate: MotionValue<number>
}

export function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
    const {
        intensity = 0.2,
        offset = ['start end', 'end start'],
        smooth = true,
        springConfig = { stiffness: 100, damping: 30, mass: 1 },
    } = options

    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as ['start end', 'end start'],
    })

    // Calcular rangos basados en intensidad
    const yRange = 100 * intensity
    const xRange = 50 * intensity
    const scaleRange = 0.1 * intensity
    const rotateRange = 5 * intensity

    // Transformaciones base
    const yTransform = useTransform(scrollYProgress, [0, 1], [yRange, -yRange])
    const xTransform = useTransform(scrollYProgress, [0, 1], [-xRange, xRange])
    const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1 - scaleRange, 1, 1 - scaleRange])
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
    const rotateTransform = useTransform(scrollYProgress, [0, 1], [-rotateRange, rotateRange])

    // Siempre llamar useSpring para cumplir con las reglas de hooks
    const ySpring = useSpring(yTransform, springConfig)
    const xSpring = useSpring(xTransform, springConfig)
    const scaleSpring = useSpring(scaleTransform, springConfig)
    const opacitySpring = useSpring(opacityTransform, springConfig)
    const rotateSpring = useSpring(rotateTransform, springConfig)

    // Seleccionar versión smooth o directa
    const y = smooth ? ySpring : yTransform
    const x = smooth ? xSpring : xTransform
    const scale = smooth ? scaleSpring : scaleTransform
    const opacity = smooth ? opacitySpring : opacityTransform
    const rotate = smooth ? rotateSpring : rotateTransform

    return { ref: ref as React.RefObject<HTMLDivElement>, y, x, scale, opacity, rotate }
}

/**
 * Hook simplificado para parallax solo vertical
 */
export function useSimpleParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

    return { ref: ref as React.RefObject<HTMLDivElement>, y: smoothY }
}
