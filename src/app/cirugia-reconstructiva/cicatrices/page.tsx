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
        {
            title: 'Tipos de cicatrices y sus tratamientos',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:30',
        },
        {
            title: '¿Cómo tratar cicatrices queloides?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:45',
        },
        {
            title: 'Revisión quirúrgica de cicatrices',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:00',
        },
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
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function CicatricesPage() {
    return <ProcedurePage data={cicatricesData} />
}
