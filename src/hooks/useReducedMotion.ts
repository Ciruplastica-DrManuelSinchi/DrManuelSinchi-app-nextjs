'use client'

import { useEffect, useState } from 'react'

/**
 * Hook para detectar la preferencia del usuario de movimiento reducido
 * Útil para deshabilitar o reducir animaciones para usuarios que lo prefieren
 */
export function useReducedMotion(): boolean {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

    useEffect(() => {
        // Verificar si estamos en el cliente
        if (typeof window === 'undefined') return

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        // Establecer valor inicial
        setShouldReduceMotion(mediaQuery.matches)

        // Listener para cambios
        const listener = (event: MediaQueryListEvent) => {
            setShouldReduceMotion(event.matches)
        }

        mediaQuery.addEventListener('change', listener)

        return () => {
            mediaQuery.removeEventListener('change', listener)
        }
    }, [])

    return shouldReduceMotion
}

/**
 * Hook que retorna valores de animación adaptados según la preferencia del usuario
 */
export function useAnimationConfig() {
    const shouldReduceMotion = useReducedMotion()

    return {
        shouldReduceMotion,
        // Duración de animaciones (0 si reduce motion está activo)
        duration: shouldReduceMotion ? 0 : 0.5,
        // Delay (0 si reduce motion está activo)
        delay: (baseDelay: number) => (shouldReduceMotion ? 0 : baseDelay),
        // Transición spring o instantánea
        transition: shouldReduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 100, damping: 15 },
        // Variantes de animación adaptadas
        variants: {
            hidden: shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        },
    }
}

/**
 * Hook para detectar si el dispositivo es móvil
 * Útil para reducir animaciones complejas en móviles
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    return isMobile
}

/**
 * Hook combinado que sugiere si se deben simplificar las animaciones
 * Considera tanto la preferencia del usuario como el tipo de dispositivo
 */
export function useShouldSimplifyAnimations(): boolean {
    const shouldReduceMotion = useReducedMotion()
    const isMobile = useIsMobile()

    // Simplificar si el usuario prefiere movimiento reducido
    // o si está en un dispositivo móvil (para mejor rendimiento)
    return shouldReduceMotion || isMobile
}
