'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const whatsappLink = 'https://api.whatsapp.com/send?phone=51961360074&text=Deseo%20más%20información'

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-primary shadow-lg py-3'
                : 'bg-primary/95 py-4'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="relative z-10">
                        <span className="text-white font-display text-xl font-bold">
                            CIRUPLÁSTICA
                        </span>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-1 py-2 transition-colors"
                                >
                                    {item.name}
                                    {item.children && <ChevronDown className="w-4 h-4" />}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.children && openDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 pt-2"
                                        >
                                            <div className="bg-white rounded-xl shadow-strong py-2 min-w-[200px]">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-sm text-dark hover:bg-light hover:text-primary transition-colors"
                                                    >
                                                        {child.name}
                                                    </Link>
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
                            className="text-white/80 hover:text-white text-sm flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            961 360 074
                        </a>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm px-5 py-2"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Agendar Consulta
                        </a>
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-primary-dark overflow-hidden"
                    >
                        <nav className="container-custom py-6 space-y-4">
                            {navigation.map((item) => (
                                <div key={item.name}>
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
                                                    className="block text-white/70 py-1 text-sm"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* CTA móvil */}
                            <div className="pt-4 border-t border-white/20">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full justify-center"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Contactar por WhatsApp
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
