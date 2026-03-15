'use client'

import { motion } from 'framer-motion'

interface Shape {
    type: 'circle' | 'square' | 'ring'
    size: number
    x: string
    y: string
    delay?: number
    duration?: number
    color?: string
}

interface AnimatedShapesProps {
    shapes?: Shape[]
    className?: string
}

const defaultShapes: Shape[] = [
    { type: 'circle', size: 200, x: '10%', y: '15%', delay: 0, color: 'rgba(212, 168, 83, 0.15)' },
    { type: 'circle', size: 150, x: '85%', y: '25%', delay: 0.5, color: 'rgba(212, 168, 83, 0.1)' },
    { type: 'ring', size: 180, x: '75%', y: '70%', delay: 1, color: 'rgba(255, 255, 255, 0.05)' },
    { type: 'square', size: 100, x: '15%', y: '75%', delay: 1.5, color: 'rgba(212, 168, 83, 0.08)' },
    { type: 'circle', size: 80, x: '50%', y: '10%', delay: 2, color: 'rgba(255, 255, 255, 0.08)' },
]

export default function AnimatedShapes({
    shapes = defaultShapes,
    className = '',
}: AnimatedShapesProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${shape.type === 'ring'
                            ? 'border-2 rounded-full'
                            : shape.type === 'circle'
                                ? 'rounded-full'
                                : 'rounded-2xl rotate-45'
                        }`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: shape.x,
                        top: shape.y,
                        background: shape.type === 'ring' ? 'transparent' : shape.color,
                        borderColor: shape.type === 'ring' ? shape.color : 'transparent',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                        rotate: shape.type === 'square' ? [45, 90, 45] : 0,
                    }}
                    transition={{
                        duration: shape.duration || 8,
                        delay: shape.delay || 0,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

// Componente para partículas flotantes
export function FloatingParticles({ count = 20 }: { count?: number }) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.x,
                        top: particle.y,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

// Componente para anillos giratorios
export function RotatingRings() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
                className="absolute w-[500px] h-[500px] border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] border border-accent/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute w-[300px] h-[300px] border-2 border-dashed border-white/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
}

// Componente para gradientes orbitales
export function OrbitalGradients() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(212, 168, 83, 0.3) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: ['-10%', '60%', '-10%'],
                    y: ['20%', '60%', '20%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-80 h-80 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(90, 45, 106, 0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: ['80%', '20%', '80%'],
                    y: ['60%', '10%', '60%'],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    )
}
