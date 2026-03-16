'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
    className?: string
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = 'Antes',
    afterLabel = 'Después',
    className = '',
}: BeforeAfterSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    // Valor de posición (0 a 1, donde 0.5 es el centro)
    const position = useMotionValue(0.5)

    // Transformar posición a porcentaje para el clip-path
    const clipPath = useTransform(
        position,
        [0, 1],
        ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
    )

    // Posición del divisor
    const dividerLeft = useTransform(position, [0, 1], ['0%', '100%'])

    const handleMove = useCallback(
        (clientX: number) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const x = clientX - rect.left
            const percentage = Math.max(0, Math.min(1, x / rect.width))
            position.set(percentage)
        },
        [position]
    )

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        handleMove(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        handleMove(e.clientX)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        handleMove(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        handleMove(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    return (
        <div
            ref={containerRef}
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden cursor-ew-resize select-none group ${className}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Before Image (Background - Full) */}
            <Image
                src={beforeImage}
                alt={beforeLabel}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
                priority
            />

            {/* After Image (Overlay with clip) */}
            <motion.div
                className="absolute inset-0"
                style={{ clipPath }}
            >
                <Image
                    src={afterImage}
                    alt={afterLabel}
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                    priority
                />
            </motion.div>

            {/* Divider Line */}
            <motion.div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
                style={{
                    left: dividerLeft,
                    translateX: '-50%'
                }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white blur-sm" />
            </motion.div>

            {/* Handle Circle - Separado para mejor control */}
            <motion.div
                className="absolute top-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-elevation-3 flex items-center justify-center pointer-events-auto cursor-ew-resize"
                style={{
                    left: dividerLeft,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: isDragging
                        ? '0 0 30px rgba(212, 168, 83, 0.5)'
                        : '0 10px 40px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Arrows */}
                <div className="flex items-center gap-1">
                    <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <div className="w-px h-5 bg-gray-300" />
                    <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </motion.div>

            {/* Labels */}
            <motion.span
                className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full z-10 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {beforeLabel}
            </motion.span>
            <motion.span
                className="absolute bottom-4 right-4 bg-accent text-dark text-sm font-semibold px-4 py-2 rounded-full z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {afterLabel}
            </motion.span>

            {/* Instrucción inicial */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <div className="bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                    </svg>
                    Desliza para comparar
                </div>
            </motion.div>
        </div>
    )
}
