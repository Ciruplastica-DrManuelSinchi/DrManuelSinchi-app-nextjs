"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Flame,
    RefreshCw
} from 'lucide-react'

// ============================================
// QUEMADURAS DATA
// ============================================

const quemadurasData: ProcedureData = {
    // Routing & Category
    slug: 'quemaduras',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    // Hero Section
    hero: {
        badge: 'Tratamiento y Reconstrucción',
        title: 'Quemaduras',
        description: 'Tratamiento integral de quemaduras agudas y reconstrucción de secuelas. Recupera la función y mejora la apariencia de las zonas afectadas.',
        duration: 'Variable',
        recovery: 'Según extensión',
        anesthesia: 'Según procedimiento',
        heroImage: '/images/procedures/quemaduras-hero.jpg',
        whatsappMessage: 'Hola, me interesa información sobre tratamiento de quemaduras',
    },

    // Info Section
    info: {
        title: '¿Cómo tratamos las Quemaduras?',
        content: [
            'El tratamiento de quemaduras abarca desde el manejo inicial de la lesión aguda hasta la reconstrucción de las secuelas. Las quemaduras pueden afectar no solo la piel sino también la función de las extremidades y articulaciones.',
            'Ofrecemos tratamiento en <strong class="text-primary">todas las fases</strong>: manejo agudo con curaciones especializadas e injertos, y reconstrucción tardía de secuelas como cicatrices retráctiles, bridas y limitaciones funcionales.',
        ],
        image: '/images/procedures/quemaduras-tecnica.jpg',
        highlights: {
            title: 'Servicios de Quemaduras',
            icon: Flame,
            items: [
                'Manejo agudo de quemaduras',
                'Injertos de piel',
                'Liberación de bridas cicatriciales',
                'Reconstrucción con colgajos',
                'Corrección de ectropión',
                'Rehabilitación funcional',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Flame,
            title: 'Experiencia en Quemados',
            description: 'Formación y experiencia en unidades de quemados.',
        },
        {
            icon: RefreshCw,
            title: 'Enfoque Integral',
            description: 'Desde la fase aguda hasta la reconstrucción final.',
        },
        {
            icon: Shield,
            title: 'Técnicas Avanzadas',
            description: 'Injertos, colgajos y sustitutos dérmicos.',
        },
        {
            icon: Heart,
            title: 'Recuperación Funcional',
            description: 'Prioridad en restaurar el movimiento y la función.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/quemaduras-before.jpg',
            after: '/images/before-after/quemaduras-after.jpg',
            label: 'Caso 1 - Liberación de bridas',
        },
        {
            before: '/images/before-after/quemaduras-before.jpg',
            after: '/images/before-after/quemaduras-after.jpg',
            label: 'Caso 2 - Reconstrucción de secuelas',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Evaluación Inicial',
            description: 'Valoración de la extensión, profundidad y ubicación de la quemadura.',
            duration: '30-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Tratamiento Agudo',
            description: 'Curaciones especializadas, desbridamiento e injertos si es necesario.',
            duration: 'Días a semanas',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Cicatrización',
            description: 'Manejo de la cicatrización con presoterapia y rehabilitación.',
            duration: 'Meses',
            icon: Timer,
        },
        {
            step: 4,
            title: 'Reconstrucción de Secuelas',
            description: 'Cirugías correctivas para mejorar función y apariencia.',
            duration: 'Cuando sea necesario',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Grados de quemaduras y su tratamiento',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:45',
        },
        {
            title: '¿Qué son las bridas cicatriciales?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:20',
        },
        {
            title: 'Reconstrucción de secuelas de quemaduras',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:30',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Qué debo hacer si me quemo?',
            answer: 'Enfría la quemadura con agua corriente fría (no helada) por 10-20 minutos. No apliques remedios caseros, pasta de dientes ni hielo directamente. Cubre con un paño limpio y busca atención médica.',
        },
        {
            question: '¿Cuándo se necesita injerto de piel?',
            answer: 'Los injertos son necesarios en quemaduras profundas (segundo grado profundo y tercer grado) donde la piel no puede regenerarse por sí sola.',
        },
        {
            question: '¿Qué son las bridas cicatriciales?',
            answer: 'Son bandas de tejido cicatricial que se forman sobre articulaciones y limitan el movimiento. Requieren liberación quirúrgica y rehabilitación.',
        },
        {
            question: '¿Cuándo se puede operar una secuela de quemadura?',
            answer: 'Generalmente esperamos 6-12 meses después de completar la cicatrización para realizar cirugías reconstructivas, aunque las limitaciones funcionales severas pueden requerir intervención más temprana.',
        },
        {
            question: '¿Se pueden mejorar las cicatrices de quemaduras?',
            answer: 'Sí, existen múltiples opciones: presoterapia, láser, infiltraciones, cirugía de revisión, y técnicas de expansión tisular para mejorar la apariencia y función.',
        },
        {
            question: '¿Es importante la rehabilitación?',
            answer: 'Absolutamente. La fisioterapia y terapia ocupacional son fundamentales para mantener el rango de movimiento, prevenir contracturas y optimizar los resultados quirúrgicos.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '300+', label: 'Casos de quemaduras' },
            { value: '95%', label: 'Mejora funcional' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera la función y mejora las secuelas',
        description: 'Agenda tu consulta para evaluar tu caso y planificar el tratamiento más adecuado.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function QuemadurasPage() {
    return <ProcedurePage data={quemadurasData} />
}
