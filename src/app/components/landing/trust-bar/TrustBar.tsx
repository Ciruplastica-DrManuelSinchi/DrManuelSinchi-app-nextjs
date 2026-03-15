'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Award, Clock, LucideIcon } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'

interface TrustItem {
    icon: LucideIcon
    value: number
    suffix: string
    title: string
}

const trustItems: TrustItem[] = [
    {
        icon: Clock,
        value: 15,
        suffix: '+',
        title: 'Años de experiencia',
    },
    {
        icon: Users,
        value: 5000,
        suffix: '+',
        title: 'Pacientes satisfechos',
    },
    {
        icon: Award,
        value: 100,
        suffix: '%',
        title: 'Tasa de satisfacción',
    },
    {
        icon: Building2,
        value: 3,
        suffix: '',
        title: 'Clínicas autorizadas',
    },
]

function TrustItem({ item, index }: { item: TrustItem; index: number }) {
    const { count, ref } = useCountUp(item.value, {
        duration: 2000,
        delay: index * 200,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center group"
        >
            {/* Icon */}
            <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-primary/5 rounded-2xl flex items-center justify-center text-primary relative overflow-hidden"
                whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(57, 17, 66, 0.1)',
                    rotate: 5,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                {/* Glow effect on hover */}
                <motion.div
                    className="absolute inset-0 bg-accent/20 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <item.icon className="w-7 h-7 relative z-10" />
            </motion.div>

            {/* Number */}
            <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                <span>{count.toLocaleString()}</span>
                <span className="text-accent">{item.suffix}</span>
            </div>

            {/* Title */}
            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                {item.title}
            </div>
        </motion.div>
    )
}

export default function TrustBar() {
    return (
        <section className="bg-white py-12 md:py-16 border-y border-gray-100 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02]" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {trustItems.map((item, index) => (
                        <TrustItem key={item.title} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
