import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin, ChevronRight } from 'lucide-react'

const footerLinks = {
    procedures: [
        { name: 'Cirugía Facial', href: '/cirugia-plastica-facial' },
        { name: 'Cirugía Corporal', href: '/cirugia-plastica-corporal' },
        { name: 'Medicina Estética', href: '/medicina-estetica' },
        { name: 'Cirugía Reconstructiva', href: '/cirugia-reconstructiva' },
    ],
    links: [
        { name: 'Dr. Manuel Sinchi', href: '/dr-manuel-sinchi' },
        { name: 'Casos Reales', href: '/casos-reales' },
        { name: 'Videos', href: '/videos' },
        { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
        { name: 'Contacto', href: '/contacto' },
    ],
    social: [
        { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/Ciruplastica.pe' },
        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ciruplastica.pe' },
        { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@DrManuelSinchi-Ciruplastica' },
    ],
}

const contactInfo = [
    { icon: MapPin, text: 'Calle Scipión Llona 180, Consultorio 503, Miraflores (5to piso)', href: 'https://maps.google.com/?q=Calle+Scipion+Llona+180+Miraflores+Lima' },
    { icon: Phone, text: '961 360 074', href: 'tel:+51961360074' },
    { icon: Mail, text: 'consultas@ciruplastica.pe', href: 'mailto:consultas@ciruplastica.pe' },
    { icon: Clock, text: 'Lun - Sáb: 9:00am - 7:00pm', href: null },
]

export default function Footer() {
    return (
        <footer className="bg-dark text-white">
            {/* CTA Móvil - Solo visible en móvil */}
            <div className="md:hidden bg-gradient-to-r from-primary to-primary-dark py-6 px-4">
                <div className="text-center">
                    <p className="text-white/80 text-sm mb-3">¿Listo para tu transformación?</p>
                    <a
                        href="https://wa.me/51961360074?text=Hola,%20quiero%20agendar%20una%20consulta"
                        className="inline-flex items-center gap-2 bg-accent text-dark font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors"
                    >
                        Agenda tu cita
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            <div className="container-custom py-12 md:py-16">
                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Logo y descripción */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/images/logo.png"
                                alt="Ciruplástica"
                                width={180}
                                height={60}
                                className="h-14 w-auto mx-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                            Especialistas en cirugía plástica y medicina estética en Lima, Perú.
                        </p>
                    </div>

                    {/* Redes sociales - Prominente en móvil */}
                    <div className="flex justify-center gap-3 mb-8">
                        {footerLinks.social.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all"
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>

                    {/* Contacto rápido */}
                    <div className="bg-white/5 rounded-2xl p-5 mb-8">
                        <h4 className="font-semibold text-center mb-4 text-accent">Contáctanos</h4>
                        <div className="space-y-3">
                            {contactInfo.map((item) => (
                                <div key={item.text} className="flex items-start gap-3 text-sm">
                                    <item.icon className="w-5 h-5 flex-shrink-0 text-accent" />
                                    {item.href ? (
                                        <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-gray-300">{item.text}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links en dos columnas */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h4 className="font-semibold text-sm text-accent mb-3">Procedimientos</h4>
                            <ul className="space-y-2">
                                {footerLinks.procedures.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-accent mb-3">Enlaces</h4>
                            <ul className="space-y-2">
                                {footerLinks.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Columna 1 - Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="Ciruplástica"
                                width={200}
                                height={67}
                                className="h-16 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Especialistas en cirugía plástica, medicina estética y cirugía reconstructiva
                            en Lima, Perú. Más de 15 años transformando vidas con resultados naturales.
                        </p>
                        {/* Redes sociales Desktop */}
                        <div className="flex items-center gap-3">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-dark transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columna 2 - Procedimientos */}
                    <div>
                        <h4 className="font-semibold mb-6">Procedimientos</h4>
                        <ul className="space-y-3">
                            {footerLinks.procedures.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3 - Enlaces */}
                    <div>
                        <h4 className="font-semibold mb-6">Enlaces</h4>
                        <ul className="space-y-3">
                            {footerLinks.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 4 - Contacto */}
                    <div>
                        <h4 className="font-semibold mb-6">Contacto</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item) => (
                                <li key={item.text} className="flex items-start gap-3 text-sm">
                                    <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                                    {item.href ? (
                                        <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">{item.text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t border-white/10">
                <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Ciruplástica. Todos los derechos reservados.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Dr. Manuel Sinchi - CMP 64517 | RNE 36807
                    </p>
                </div>
            </div>
        </footer>
    )
}
