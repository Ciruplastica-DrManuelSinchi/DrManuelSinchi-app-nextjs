'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
    children: ReactNode
    direction?: Direction
    delay?: number
    duration?: number
    distance?: number
    className?: string
    once?: boolean
}

const getVariants = (direction: Direction, distance: number): Variants => {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    }

    return {
        hidden: {
            opacity: 0,
            ...directions[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    }
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 30,
    className,
    once = true,
}: ScrollRevealProps) {
    return (
        <motion.div
            variants={getVariants(direction, distance)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-100px' }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Variante con escala
export function ScrollRevealScale({
    children,
    delay = 0,
    duration = 0.6,
    className,
    once = true,
}: Omit<ScrollRevealProps, 'direction' | 'distance'>) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once, margin: '-100px' }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Variante con blur
export function ScrollRevealBlur({
    children,
    delay = 0,
    duration = 0.6,
    className,
    once = true,
}: Omit<ScrollRevealProps, 'direction' | 'distance'>) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once, margin: '-100px' }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
