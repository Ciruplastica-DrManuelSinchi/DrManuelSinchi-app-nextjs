'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseCountUpOptions {
    duration?: number
    delay?: number
    easing?: 'linear' | 'easeOut' | 'easeOutExpo' | 'spring'
}

export function useCountUp(
    end: number,
    options: UseCountUpOptions = {}
) {
    const { duration = 2000, delay = 0, easing = 'easeOutExpo' } = options
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!isInView || hasAnimated.current) return

        hasAnimated.current = true

        const startTime = Date.now() + delay
        let animationFrame: number

        const easingFunctions = {
            linear: (t: number) => t,
            easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
            easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            spring: (t: number) => {
                const c4 = (2 * Math.PI) / 3
                return t === 0
                    ? 0
                    : t === 1
                        ? 1
                        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
            },
        }

        const animate = () => {
            const now = Date.now()
            if (now < startTime) {
                animationFrame = requestAnimationFrame(animate)
                return
            }

            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easingFunctions[easing](progress)

            setCount(Math.floor(easedProgress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [isInView, end, duration, delay, easing])

    return { count, ref }
}
