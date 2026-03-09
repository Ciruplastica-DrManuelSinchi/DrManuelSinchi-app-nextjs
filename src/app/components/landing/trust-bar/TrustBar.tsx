import { Building2, GraduationCap, Shield, CreditCard } from 'lucide-react'

const trustItems = [
    {
        icon: Building2,
        title: 'Clínica Autorizada',
        subtitle: 'por MINSA',
    },
    {
        icon: GraduationCap,
        title: 'Cirujano Certificado',
        subtitle: 'Colegio Médico del Perú',
    },
    {
        icon: Shield,
        title: 'Seguimiento Post-Op',
        subtitle: 'Incluido',
    },
    {
        icon: CreditCard,
        title: 'Financiamiento',
        subtitle: 'Disponible',
    },
]

export default function TrustBar() {
    return (
        <section className="bg-light py-8 border-y border-gray-100">
            <div className="container-custom">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {trustItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-4"
                        >
                            <div className="trust-icon">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-dark text-sm">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {item.subtitle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
