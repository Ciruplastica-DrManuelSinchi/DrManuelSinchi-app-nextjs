"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Scissors,
    Layers
} from 'lucide-react'

// ============================================
// CICATRICES DATA
// ============================================

const cicatricesData: ProcedureData = {
    // Routing & Category
    slug: 'cicatrices',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    // Hero Section
    hero: {
        badge: 'Revisión de Cicatrices',
        title: 'Tratamiento de Cicatrices',
        description: 'Mejora la apariencia de cicatrices quirúrgicas, traumáticas, por acné o queloides. Técnicas especializadas para cada tipo de cicatriz.',
        duration: '30 min - 2 horas',
        recovery: '7-21 días',
        anesthesia: 'Local o sedación',
        whatsappMessage: 'Hola, me interesa información sobre tratamiento de cicatrices',
    },

    // Info Section
    info: {
        title: '¿Qué es el Tratamiento de Cicatrices?',
        content: [
            'El tratamiento de cicatrices incluye diversas técnicas quirúrgicas y no quirúrgicas para mejorar la apariencia de cicatrices que causan molestias estéticas o funcionales. Cada cicatriz es única y requiere un enfoque personalizado.',
            'Evaluamos el tipo de cicatriz, su ubicación, tiempo de evolución y características para seleccionar el <strong class="text-primary">tratamiento más efectivo</strong>: desde infiltraciones hasta revisión quirúrgica, pasando por láser y otras terapias.',
        ],
        image: '/images/procedures/que-es/cicatrices-tecnica.jpg',
        highlights: {
            title: 'Tipos de Cicatrices que Tratamos',
            icon: Layers,
            items: [
                'Cicatrices queloides',
                'Cicatrices hipertróficas',
                'Cicatrices atróficas (acné)',
                'Cicatrices quirúrgicas',
                'Cicatrices traumáticas',
                'Cicatrices retráctiles',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Layers,
            title: 'Enfoque Personalizado',
            description: 'Cada cicatriz recibe el tratamiento específico que necesita.',
        },
        {
            icon: Scissors,
            title: 'Múltiples Técnicas',
            description: 'Quirúrgicas y no quirúrgicas según el caso.',
        },
        {
            icon: Shield,
            title: 'Prevención',
            description: 'Protocolos para evitar recurrencia en queloides.',
        },
        {
            icon: Heart,
            title: 'Mejora Funcional',
            description: 'Liberamos cicatrices que limitan el movimiento.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/cicatrices-before.jpg',
            after: '/images/before-after/cicatrices-after.jpg',
            label: 'Caso 1 - Cicatriz queloide',
        },
        {
            before: '/images/before-after/cicatrices-before.jpg',
            after: '/images/before-after/cicatrices-after.jpg',
            label: 'Caso 2 - Revisión quirúrgica',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Evaluación de la Cicatriz',
            description: 'Análisis del tipo, edad, ubicación y características de la cicatriz.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Plan de Tratamiento',
            description: 'Selección de la técnica o combinación de técnicas más adecuada.',
            duration: 'En consulta',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Tratamiento',
            description: 'Aplicación del tratamiento elegido: infiltración, cirugía o láser.',
            duration: '30 min - 2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Seguimiento',
            description: 'Controles periódicos y tratamientos complementarios si es necesario.',
            duration: 'Meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
    ],

    // FAQs
    faqs: [
        {
            question: '¿Se puede eliminar una cicatriz completamente?',
            answer: 'No es posible eliminar una cicatriz al 100%, pero sí mejorar significativamente su apariencia. El objetivo es hacerla menos visible, más plana y del color más similar a la piel circundante.',
        },
        {
            question: '¿Qué es una cicatriz queloide?',
            answer: 'Es una cicatriz que crece más allá de los límites de la herida original, formando un tejido grueso y elevado. Requiere tratamiento especializado ya que tiende a recurrir.',
        },
        {
            question: '¿Cuánto tiempo debe tener la cicatriz para tratarla?',
            answer: 'Generalmente esperamos 6-12 meses para que la cicatriz madure antes de una revisión quirúrgica. Sin embargo, algunos tratamientos como infiltraciones pueden iniciarse antes.',
        },
        {
            question: '¿Qué tratamientos existen para cicatrices?',
            answer: 'Incluyen: infiltraciones con corticoides, revisión quirúrgica, dermoabrasión, láser, presoterapia, parches de silicona, y combinaciones de estos según el caso.',
        },
        {
            question: '¿Las cicatrices de acné se pueden mejorar?',
            answer: 'Sí, las cicatrices de acné responden bien a tratamientos como subcisión, rellenos de ácido hialurónico, láser fraccionado y técnicas combinadas.',
        },
        {
            question: '¿Cómo prevenir que una cicatriz se haga queloide?',
            answer: 'Si tienes tendencia a queloides, usamos protocolos preventivos: infiltraciones tempranas, presoterapia, parches de silicona y radioterapia superficial en casos seleccionados.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '800+', label: 'Cicatrices tratadas' },
            { value: '95%', label: 'Mejora significativa' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Mejora la apariencia de tus cicatrices',
        description: 'Agenda tu consulta para evaluar tu cicatriz y conocer las opciones de tratamiento.',
    },

    en: {
        categoryLabel: 'Reconstructive Surgery',
        hero: {
            badge: 'Scar Revision',
            title: 'Scar Treatment',
            description: 'Improve the appearance of surgical, traumatic, acne, or keloid scars. Specialized techniques tailored to each type of scar.',
            duration: '30 min - 2 hours',
            recovery: '7-21 days',
            anesthesia: 'Local or sedation',
        },
        info: {
            title: 'What is Scar Treatment?',
            content: [
                'Scar treatment encompasses various surgical and non-surgical techniques to improve the appearance of scars that cause aesthetic or functional concerns. Each scar is unique and requires a personalized approach.',
                'We assess the type of scar, its location, time of evolution, and characteristics to select the <strong class="text-primary">most effective treatment</strong>: from corticosteroid injections to surgical revision, laser therapy, and other treatments.',
            ],
            highlights: {
                title: 'Types of Scars We Treat',
                items: [
                    'Keloid scars',
                    'Hypertrophic scars',
                    'Atrophic scars (acne)',
                    'Surgical scars',
                    'Traumatic scars',
                    'Contracture scars',
                ],
            },
        },
        benefits: [
            {
                title: 'Personalized Approach',
                description: 'Each scar receives the specific treatment it requires.',
            },
            {
                title: 'Multiple Techniques',
                description: 'Surgical and non-surgical options depending on the case.',
            },
            {
                title: 'Prevention',
                description: 'Protocols to prevent recurrence in keloid scars.',
            },
            {
                title: 'Functional Improvement',
                description: 'We release scars that restrict movement.',
            },
        ],
        process: [
            {
                title: 'Scar Evaluation',
                description: 'Analysis of the scar type, age, location, and characteristics.',
                duration: '30-45 min',
            },
            {
                title: 'Treatment Plan',
                description: 'Selection of the most suitable technique or combination of techniques.',
                duration: 'During consultation',
            },
            {
                title: 'Treatment',
                description: 'Application of the chosen treatment: injection, surgery, or laser.',
                duration: '30 min - 2 hours',
            },
            {
                title: 'Follow-Up',
                description: 'Periodic check-ups and complementary treatments as needed.',
                duration: 'Months',
            },
        ],
        faqs: [
            {
                question: 'Can a scar be completely eliminated?',
                answer: 'It is not possible to fully eliminate a scar, but its appearance can be significantly improved. The goal is to make it less visible, flatter, and closer in color to the surrounding skin.',
            },
            {
                question: 'What is a keloid scar?',
                answer: 'It is a scar that grows beyond the boundaries of the original wound, forming thick, raised tissue. It requires specialized treatment as it tends to recur.',
            },
            {
                question: 'How long should a scar be present before treating it?',
                answer: 'We generally wait 6-12 months for the scar to mature before surgical revision. However, some treatments such as corticosteroid injections can be started earlier.',
            },
            {
                question: 'What treatments are available for scars?',
                answer: 'Options include: corticosteroid injections, surgical revision, dermabrasion, laser therapy, compression therapy, silicone patches, and combinations of these depending on the case.',
            },
            {
                question: 'Can acne scars be improved?',
                answer: 'Yes, acne scars respond well to treatments such as subcision, hyaluronic acid fillers, fractional laser, and combined techniques.',
            },
            {
                question: 'How can I prevent a scar from becoming a keloid?',
                answer: 'If you have a tendency toward keloids, we use preventive protocols: early injections, compression therapy, silicone patches, and superficial radiotherapy in selected cases.',
            },
        ],
        cta: {
            title: 'Improve the appearance of your scars',
            description: 'Schedule your consultation to evaluate your scar and learn about your treatment options.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function CicatricesPage() {
    return <ProcedurePage data={cicatricesData} />
}
