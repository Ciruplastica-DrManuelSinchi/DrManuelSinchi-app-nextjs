import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

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
        { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@ciruplastica' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ciruplastica' },
    ],
}

const contactInfo = [
    { icon: MapPin, text: 'Calle Scipión Llona 180, Consultorio 503, Miraflores' },
    { icon: Phone, text: '961 360 074' },
    { icon: Mail, text: 'consultas@ciruplastica.pe' },
    { icon: Clock, text: 'Lun - Sáb: 9:00am - 7:00pm' },
]

export default function Footer() {
    return (
        <footer className="bg-dark text-white">
            <div className="container-custom py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Columna 1 - Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-display text-2xl font-bold">CIRUPLÁSTICA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Especialistas en cirugía plástica, medicina estética y cirugía reconstructiva
                            en Lima, Perú. Más de 15 años transformando vidas con resultados naturales.
                        </p>
                    </div>

                    {/* Columna 2 - Procedimientos */}
                    <div>
                        <h4 className="font-semibold mb-6">Procedimientos</h4>
                        <ul className="space-y-3">
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

                    {/* Columna 3 - Enlaces */}
                    <div>
                        <h4 className="font-semibold mb-6">Enlaces</h4>
                        <ul className="space-y-3">
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

                    {/* Columna 4 - Contacto */}
                    <div>
                        <h4 className="font-semibold mb-6">Contacto</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item) => (
                                <li key={item.text} className="flex items-start gap-3 text-sm text-gray-400">
                                    <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t border-gray-800">
                <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Ciruplástica. Todos los derechos reservados.
                    </p>

                    {/* Redes sociales */}
                    <div className="flex items-center gap-4">
                        {footerLinks.social.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
