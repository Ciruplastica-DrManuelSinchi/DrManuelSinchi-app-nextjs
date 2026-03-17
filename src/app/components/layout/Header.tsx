'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import UserMenu from '@/app/components/auth/UserMenu'

interface NavChild {
    name: string
    href: string
}

interface NavCategory {
    category: string
    href: string
    items: NavChild[]
}

interface NavItem {
    name: string
    href: string
    megaMenu?: boolean
    categories?: NavCategory[]
}

const navigation: NavItem[] = [
    { name: 'El Doctor', href: '/dr-manuel-sinchi' },
    {
        name: 'Procedimientos',
        href: '#',
        megaMenu: true,
        categories: [
            {
                category: 'Cirugía Facial',
                href: '/cirugia-plastica-facial',
                items: [
                    { name: 'Blefaroplastia', href: '/cirugia-plastica-facial/blefaroplastia' },
                    { name: 'Lifting / Fox-eyes', href: '/cirugia-plastica-facial/lifting-facial' },
                    { name: 'Rinoplastia', href: '/cirugia-plastica-facial/rinoplastia' },
                    { name: 'Rellenos Faciales', href: '/cirugia-plastica-facial/rellenos-faciales' },
                    { name: 'Otoplastia', href: '/cirugia-plastica-facial/otoplastia' },
                    { name: 'Extracción de Lunares', href: '/cirugia-plastica-facial/extraccion-lunares' },
                    { name: 'Mentoplastia', href: '/cirugia-plastica-facial/mentoplastia' },
                    { name: 'Lipo de Papada', href: '/cirugia-plastica-facial/lipo-papada' },
                    { name: 'Bichectomía', href: '/cirugia-plastica-facial/bichectomia' },
                    { name: 'Aumento de Pómulos', href: '/cirugia-plastica-facial/aumento-pomulos' },
                    { name: 'Marcación Mandibular', href: '/cirugia-plastica-facial/marcacion-mandibular' },
                    { name: 'Afinamiento Facial', href: '/cirugia-plastica-facial/afinamiento-facial' },
                    { name: 'Perfiloplastia', href: '/cirugia-plastica-facial/perfiloplastia' },
                ],
            },
            {
                category: 'Cirugía Corporal',
                href: '/cirugia-plastica-corporal',
                items: [
                    { name: 'Aumento de Mamas', href: '/cirugia-plastica-corporal/mamoplastia-aumento' },
                    { name: 'Mastopexia', href: '/cirugia-plastica-corporal/mastopexia' },
                    { name: 'Reducción de Mamas', href: '/cirugia-plastica-corporal/mamoplastia-reduccion' },
                    { name: 'Lipoescultura', href: '/cirugia-plastica-corporal/lipo-escultura' },
                    { name: 'Abdominoplastia', href: '/cirugia-plastica-corporal/abdominoplastia' },
                    { name: 'Lipoabdominoplastia', href: '/cirugia-plastica-corporal/lipoabdominoplastia' },
                    { name: 'Gluteoplastia', href: '/cirugia-plastica-corporal/gluteoplastia' },
                    { name: 'Mommy Makeover', href: '/cirugia-plastica-corporal/mommy-makeover' },
                    { name: 'Ginecomastia', href: '/cirugia-plastica-corporal/ginecomastia' },
                    { name: 'Cirugía de Género', href: '/cirugia-plastica-corporal/cirugia-genero' },
                    { name: 'Reconstrucción de Mama', href: '/cirugia-plastica-corporal/reconstruccion-mama' },
                ],
            },
            {
                category: 'Medicina Estética',
                href: '/medicina-estetica',
                items: [
                    { name: 'Ácido Hialurónico', href: '/medicina-estetica/acido-hialuronico' },
                    { name: 'Botox', href: '/medicina-estetica/botox' },
                    { name: 'Bioestimuladores', href: '/medicina-estetica/bioestimuladores' },
                    { name: 'Radiofrecuencia / Ultrasonido', href: '/medicina-estetica/radiofrecuencia-ultrasonido' },
                    { name: 'Tratamientos Postoperatorios', href: '/medicina-estetica/tratamientos-postoperatorios' },
                    { name: 'Láser Facial', href: '/medicina-estetica/laser-facial' },
                    { name: 'PRP Facial', href: '/medicina-estetica/plasma-rico-plaquetas' },
                    { name: 'Vitamina C Endovenosa', href: '/medicina-estetica/vitamina-c-endovenosa' },
                    { name: 'Relleno de Labios', href: '/medicina-estetica/rellenos-labios' },
                ],
            },
            {
                category: 'Reconstructiva',
                href: '/cirugia-reconstructiva',
                items: [
                    { name: 'Tumores y Carcinomas', href: '/cirugia-reconstructiva/tumores-carcinomas' },
                    { name: 'Cicatrices', href: '/cirugia-reconstructiva/cicatrices' },
                    { name: 'Heridas y Úlceras', href: '/cirugia-reconstructiva/heridas-ulceras' },
                    { name: 'Quemaduras', href: '/cirugia-reconstructiva/quemaduras' },
                    { name: 'Retiro de Biopolímeros', href: '/cirugia-reconstructiva/retiro-biopolimeros' },
                ],
            },
        ],
    },
    { name: 'Resultados', href: '/casos-reales' },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    // Detectar si estamos en la landing page
    const isHomePage = pathname === '/'

    // Progress bar de scroll
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Marcar como montado y verificar scroll inicial
    useEffect(() => {
        setMounted(true)
        // En páginas internas, siempre sólido; en home, depende del scroll
        if (!isHomePage) {
            setIsScrolled(true)
        } else {
            setIsScrolled(window.scrollY > 50)
        }
    }, [isHomePage])

    // Cerrar menú móvil al cambiar de ruta
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        // Solo aplicar lógica de scroll en la homepage
        if (!isHomePage) {
            setIsScrolled(true)
            return
        }

        const handleScroll = () => {
            // Activar fondo blanco después de 100vh
            setIsScrolled(window.scrollY > window.innerHeight * 0.9)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage])

    const whatsappLink = 'https://api.whatsapp.com/send?phone=51961360074&text=Deseo%20más%20información'

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
                style={{ scaleX }}
            />

            <header
                className={`fixed top-0 left-0 right-0 z-50 ${mounted ? 'transition-all duration-500' : ''} ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="relative z-10">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="Ciruplástica"
                                    width={200}
                                    height={56}
                                    className={`h-14 w-auto transition-all duration-500 ${
                                        isScrolled ? '' : 'brightness-0 invert'
                                    }`}
                                    priority
                                />
                            </motion.div>
                        </Link>

                        {/* Navegación Desktop */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => item.megaMenu && setOpenDropdown(item.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={`text-lg font-medium flex items-center gap-1 py-2 transition-all duration-500 relative ${
                                            isScrolled
                                                ? 'text-gray-700 hover:text-primary'
                                                : 'text-white/90 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                        {item.megaMenu && (
                                            <motion.span
                                                animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.span>
                                        )}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                                    </Link>

                                    {/* Mega Menu */}
                                    <AnimatePresence>
                                        {item.megaMenu && item.categories && openDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                                            >
                                                <div className="bg-white rounded-2xl shadow-xl p-6 min-w-[800px] grid grid-cols-4 gap-6">
                                                    {item.categories.map((cat) => (
                                                        <div key={cat.category}>
                                                            <Link
                                                                href={cat.href}
                                                                className="text-primary font-semibold text-sm mb-3 block hover:text-accent transition-colors"
                                                            >
                                                                {cat.category}
                                                            </Link>
                                                            <ul className="space-y-1.5">
                                                                {cat.items.map((subItem) => (
                                                                    <li key={subItem.name}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className="text-gray-600 hover:text-primary text-sm transition-colors block py-0.5"
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <Link
                                                                href={cat.href}
                                                                className="inline-flex items-center gap-1 text-accent hover:text-primary text-xs font-medium mt-3 transition-colors group"
                                                            >
                                                                Ver todos
                                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </div>
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
                                className={`text-sm flex items-center gap-2 transition-all duration-500 ${
                                    isScrolled
                                        ? 'text-gray-600 hover:text-primary'
                                        : 'text-white/80 hover:text-white'
                                }`}
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
                                Agendar Cita
                            </motion.a>
                            {/* User Menu */}
                            <UserMenu isScrolled={isScrolled} />
                        </div>

                        {/* Botón menú móvil */}
                        <motion.button
                            className={`lg:hidden p-2 relative transition-colors duration-500 ${
                                isScrolled ? 'text-primary' : 'text-white'
                            }`}
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
                            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden max-h-[80vh] overflow-y-auto"
                        >
                            <nav className="container-custom py-4 space-y-3">
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block text-gray-800 py-1.5 font-medium"
                                            onClick={() => !item.megaMenu && setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.categories && (
                                            <div className="grid grid-cols-2 gap-3 mt-2 pl-2">
                                                {item.categories.map((cat) => (
                                                    <div key={cat.category} className="bg-gray-50 rounded-lg p-2.5">
                                                        <Link
                                                            href={cat.href}
                                                            className="block text-primary font-medium text-xs mb-1.5"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {cat.category}
                                                        </Link>
                                                        <div className="space-y-0.5">
                                                            {cat.items.slice(0, 4).map((subItem) => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="block text-gray-600 py-0.5 text-xs hover:text-primary transition-colors"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <Link
                                                            href={cat.href}
                                                            className="inline-flex items-center gap-1 text-accent text-[10px] font-medium mt-1.5"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            Ver todos <ArrowRight className="w-2.5 h-2.5" />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* CTA móvil */}
                                <motion.div
                                    className="pt-4 border-t border-gray-200"
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
