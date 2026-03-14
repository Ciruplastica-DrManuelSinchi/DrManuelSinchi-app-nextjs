"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    User,
    Target
} from 'lucide-react'

// ============================================
// GINECOMASTIA DATA
// ============================================

const ginecomastiaData: ProcedureData = {
    // Routing & Category
    slug: 'ginecomastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Cirugía Masculina',
        title: 'Ginecomastia',
        description: 'Reduce el exceso de tejido mamario masculino para lograr un pecho más plano, firme y masculino. Recupera tu confianza y comodidad.',
        duration: '1-2 horas',
        recovery: '7-14 días recuperación',
        anesthesia: 'Anestesia general o sedación',
        whatsappMessage: 'Hola, me interesa información sobre ginecomastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Ginecomastia?',
        content: [
            'La ginecomastia es el desarrollo excesivo del tejido mamario en hombres, que puede causar incomodidad física y emocional. La cirugía de ginecomastia reduce este tejido para crear un pecho más plano y masculino.',
            'El procedimiento puede incluir <strong class="text-primary">liposucción, escisión de glándula mamaria o ambas técnicas</strong>, dependiendo de si el exceso es principalmente graso, glandular o mixto.',
        ],
        image: '/images/procedures/que-es/ginecomastia-tecnica.jpg',
        highlights: {
            title: 'Tipos de Ginecomastia',
            icon: User,
            items: [
                'Ginecomastia glandular',
                'Ginecomastia grasa (pseudoginecomastia)',
                'Ginecomastia mixta',
                'Ginecomastia unilateral',
                'Ginecomastia con exceso de piel',
                'Ginecomastia post pérdida de peso',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: User,
            title: 'Pecho Masculino',
            description: 'Contorno plano y definido sin tejido mamario.',
        },
        {
            icon: Target,
            title: 'Mínimas Cicatrices',
            description: 'Incisiones pequeñas y bien ubicadas.',
        },
        {
            icon: Shield,
            title: 'Resultado Permanente',
            description: 'El tejido glandular removido no regresa.',
        },
        {
            icon: Heart,
            title: 'Mayor Confianza',
            description: 'Libertad para usar cualquier ropa sin vergüenza.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/ginecomastia-before.jpg',
            after: '/images/before-after/ginecomastia-after.jpg',
            label: 'Caso 1 - Ginecomastia moderada',
        },
        {
            before: '/images/before-after/ginecomastia-before.jpg',
            after: '/images/before-after/ginecomastia-after.jpg',
            label: 'Caso 2 - Ginecomastia severa',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación del tejido mamario, análisis hormonal si necesario y planificación.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio y preparación para la cirugía.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Liposucción y/o escisión glandular según el caso.',
            duration: '1-2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Alta el mismo día. Uso de chaleco compresivo.',
            duration: '1 día',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Seguimiento y Resultado',
            description: 'Controles periódicos, uso de compresión y resultado final.',
            duration: '1-3 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
    
    ],

    // FAQs
    faqs: [
        {
            question: '¿Qué causa la ginecomastia?',
            answer: 'Puede ser causada por desequilibrios hormonales, uso de ciertos medicamentos, condiciones médicas, obesidad o ser idiopática (sin causa conocida). En la consulta evaluamos posibles causas.',
        },
        {
            question: '¿La ginecomastia puede desaparecer sola?',
            answer: 'En adolescentes puede resolverse naturalmente con el tiempo. En adultos, si persiste por más de 1-2 años, generalmente no desaparece sin cirugía.',
        },
        {
            question: '¿Dónde quedan las cicatrices?',
            answer: 'Las incisiones para liposucción son de 3-4mm y quedan ocultas. Si se requiere escisión glandular, la incisión se hace en el borde de la areola donde es menos visible.',
        },
        {
            question: '¿La ginecomastia puede volver después de la cirugía?',
            answer: 'Es muy raro. Si se remueve completamente el tejido glandular, no debería regresar. Sin embargo, ganar mucho peso puede causar acumulación de grasa.',
        },
        {
            question: '¿Cuánto tiempo debo usar el chaleco compresivo?',
            answer: 'Se recomienda uso continuo las 24 horas durante las primeras 3-4 semanas, luego progresivamente hasta completar 6-8 semanas.',
        },
        {
            question: '¿Cuándo puedo volver al gimnasio?',
            answer: 'Caminatas desde la primera semana. Ejercicio cardiovascular ligero a las 2-3 semanas. Ejercicios de pecho y pesas después de 4-6 semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '600+', label: 'Ginecomastias realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera la confianza en tu cuerpo',
        description: 'Agenda tu consulta de valoración y descubre cómo la cirugía de ginecomastia puede transformar tu pecho.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function GinecomastiaPage() {
    return <ProcedurePage data={ginecomastiaData} />
}
