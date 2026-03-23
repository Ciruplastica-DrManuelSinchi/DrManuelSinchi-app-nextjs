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

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Male Surgery',
            title: 'Gynecomastia',
            description: 'Reduce excess male breast tissue to achieve a flatter, firmer, and more masculine chest. Regain your confidence and comfort.',
            duration: '1-2 hours',
            recovery: '7-14 days recovery',
            anesthesia: 'General anesthesia or sedation',
        },
        info: {
            title: 'What is Gynecomastia?',
            content: [
                'Gynecomastia is the excessive development of breast tissue in men, which can cause physical and emotional discomfort. Gynecomastia surgery reduces this tissue to create a flatter, more masculine chest.',
                'The procedure may include <strong class="text-primary">liposuction, glandular tissue excision, or both techniques</strong>, depending on whether the excess is primarily fatty, glandular, or mixed.',
            ],
            highlights: {
                title: 'Types of Gynecomastia',
                items: [
                    'Glandular gynecomastia',
                    'Fatty gynecomastia (pseudogynecomastia)',
                    'Mixed gynecomastia',
                    'Unilateral gynecomastia',
                    'Gynecomastia with excess skin',
                    'Post weight-loss gynecomastia',
                ],
            },
        },
        benefits: [
            {
                title: 'Masculine Chest',
                description: 'Flat and defined contour without breast tissue.',
            },
            {
                title: 'Minimal Scarring',
                description: 'Small, well-placed incisions.',
            },
            {
                title: 'Permanent Result',
                description: 'Removed glandular tissue does not return.',
            },
            {
                title: 'Greater Confidence',
                description: 'Freedom to wear any clothing without embarrassment.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Breast tissue evaluation, hormonal analysis if necessary, and planning.',
                duration: '30-45 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests and preparation for surgery.',
                duration: '1-2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Liposuction and/or glandular excision depending on the case.',
                duration: '1-2 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Same-day discharge. Use of compression vest.',
                duration: '1 day',
            },
            {
                title: 'Follow-up and Result',
                description: 'Periodic check-ups, compression use, and final result.',
                duration: '1-3 months',
            },
        ],
        faqs: [
            {
                question: 'What causes gynecomastia?',
                answer: 'It can be caused by hormonal imbalances, use of certain medications, medical conditions, obesity, or be idiopathic (no known cause). During the consultation we evaluate possible causes.',
            },
            {
                question: 'Can gynecomastia go away on its own?',
                answer: 'In adolescents it may resolve naturally over time. In adults, if it persists for more than 1-2 years, it generally does not disappear without surgery.',
            },
            {
                question: 'Where are the scars located?',
                answer: 'Liposuction incisions are 3-4mm and remain hidden. If glandular excision is required, the incision is made at the edge of the areola where it is less visible.',
            },
            {
                question: 'Can gynecomastia return after surgery?',
                answer: 'It is very rare. If the glandular tissue is completely removed, it should not return. However, significant weight gain can cause fat accumulation.',
            },
            {
                question: 'How long do I need to wear the compression vest?',
                answer: 'Continuous 24-hour use is recommended during the first 3-4 weeks, then progressively until completing 6-8 weeks.',
            },
            {
                question: 'When can I return to the gym?',
                answer: 'Walks from the first week. Light cardiovascular exercise at 2-3 weeks. Chest and weight exercises after 4-6 weeks.',
            },
        ],
        cta: {
            title: 'Regain confidence in your body',
            description: 'Schedule your assessment consultation and discover how gynecomastia surgery can transform your chest.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function GinecomastiaPage() {
    return <ProcedurePage data={ginecomastiaData} />
}
