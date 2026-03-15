'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import UserMenu from '@/app/components/auth/UserMenu'

const navigation = [
    { name: 'Dr. Manuel Sinchi', href: '/dr-manuel-sinchi' },
    {
        name: 'Cirugía Plástica',
        href: '#',
        children: [
            { name: 'Cirugía Facial', href: '/cirugia-plastica-facial' },
            { name: 'Cirugía Corporal', href: '/cirugia-plastica-corporal' },
        ],
    },
    {
        name: 'Medicina Estética',
        href: '/medicina-estetica',
        children: [
            { name: 'Botox', href: '/medicina-estetica/botox' },
            { name: 'Ácido Hialurónico', href: '/medicina-estetica/acido-hialuronico' },
            { name: 'Relleno de Labios', href: '/medicina-estetica/rellenos-labios' },
            { name: 'PRP', href: '/medicina-estetica/plasma-rico-plaquetas' },
        ],
    },
    { name: 'Casos Reales', href: '/casos-reales' },
    { name: 'FAQ', href: '/preguntas-frecuentes' },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    // Progress bar de scroll
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const whatsappLink = 'https://api.whatsapp.com/send?phone=51961360074&text=Deseo%20más%20información'

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
                style={{ scaleX }}
            />

            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'glass shadow-lg py-3 mt-1'
                    : 'bg-primary/95 py-4'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="relative z-10 group">
                            <motion.span
                                className="text-white font-display text-xl font-bold inline-block"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                CIRUPLÁSTICA
                            </motion.span>
                            {/* Underline effect */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Navegación Desktop */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-1 py-2 transition-colors relative"
                                    >
                                        {item.name}
                                        {item.children && (
                                            <motion.span
                                                animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.span>
                                        )}
                                        {/* Hover underline */}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                                    </Link>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {item.children && openDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                                className="absolute top-full left-0 pt-2"
                                            >
                                                <div className="glass-light rounded-xl shadow-elevation-3 py-2 min-w-[200px] overflow-hidden">
                                                    {item.children.map((child, index) => (
                                                        <motion.div
                                                            key={child.name}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <Link
                                                                href={child.href}
                                                                className="block px-4 py-2.5 text-sm text-dark hover:bg-primary/5 hover:text-primary transition-all duration-200 relative group/item"
                                                            >
                                                                <span className="relative z-10">{child.name}</span>
                                                                {/* Hover indicator */}
                                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-6 bg-accent/20 transition-all duration-200 group-hover/item:w-1 rounded-r" />
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* CTA Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="tel:+51961360074"
                                className="text-white/80 hover:text-white text-sm flex items-center gap-2 transition-colors"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <Phone className="w-4 h-4" />
                                </motion.span>
                                961 360 074
                            </a>
                            <motion.a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary btn-shine text-sm px-5 py-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Agendar Consulta
                            </motion.a>
                            {/* User Menu */}
                            <UserMenu />
                        </div>

                        {/* Botón menú móvil */}
                        <motion.button
                            className="lg:hidden text-white p-2 relative"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Menú móvil */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden glass overflow-hidden"
                        >
                            <nav className="container-custom py-6 space-y-4">
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block text-white py-2 font-medium"
                                            onClick={() => !item.children && setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.children && (
                                            <div className="pl-4 space-y-2 mt-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block text-white/70 py-1 text-sm hover:text-accent transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* CTA móvil */}
                                <motion.div
                                    className="pt-4 border-t border-white/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary btn-shine w-full justify-center"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Contactar por WhatsApp
                                    </a>
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}
