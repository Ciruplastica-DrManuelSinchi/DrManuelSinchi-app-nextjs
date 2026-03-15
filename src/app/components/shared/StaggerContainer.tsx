'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerContainerProps {
    children: ReactNode
    staggerDelay?: number
    delayChildren?: number
    className?: string
    once?: boolean
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    delayChildren = 0.2,
    className,
    once = true,
}: StaggerContainerProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-50px' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}

// Variante con escala para cards
const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

export function StaggerCardItem({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <motion.div variants={cardItemVariants} className={className}>
            {children}
        </motion.div>
    )
}

// Container para grids
export function StaggerGrid({
    children,
    columns = 3,
    gap = 6,
    staggerDelay = 0.1,
    className,
    once = true,
}: StaggerContainerProps & { columns?: number; gap?: number }) {
    const gridClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

    const gapClass = `gap-${gap}`

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-50px' }}
            className={`grid ${gridClass} ${gapClass} ${className || ''}`}
        >
            {children}
        </motion.div>
    )
}
