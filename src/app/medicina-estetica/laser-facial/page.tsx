"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Zap,
    Sun
} from 'lucide-react'

// ============================================
// LÁSER FACIAL DATA
// ============================================

const laserFacialData: ProcedureData = {
    slug: 'laser-facial',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Rejuvenecimiento con Láser',
        title: 'Láser Facial',
        description: 'Tratamientos con tecnología láser para rejuvenecimiento, manchas, cicatrices y textura de la piel. Resultados precisos con las últimas tecnologías disponibles.',
        duration: '30-60 min',
        recovery: '3-7 días',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre láser facial',
    },

    info: {
        title: '¿Cómo funciona el Láser Facial?',
        content: [
            'Los tratamientos láser utilizan luz de alta energía para tratar diversas condiciones de la piel. Dependiendo del tipo de láser, podemos tratar manchas, arrugas, cicatrices, poros dilatados y mejorar la textura general de la piel.',
            'Disponemos de diferentes tecnologías: <strong class="text-primary">Láser fraccionado</strong> para rejuvenecimiento, <strong class="text-primary">Láser Q-Switched</strong> para pigmentaciones, y <strong class="text-primary">IPL (Luz Pulsada Intensa)</strong> para manchas y rojeces.',
        ],
        image: '/images/procedures/que-es/laser-facial.jpg',
        highlights: {
            title: 'Tratamientos Disponibles',
            icon: Zap,
            items: [
                'Rejuvenecimiento facial',
                'Eliminación de manchas',
                'Tratamiento de cicatrices',
                'Reducción de poros',
                'Mejora de textura',
                'Tratamiento de rojeces',
            ],
        },
    },

    benefits: [
        {
            icon: Zap,
            title: 'Tecnología Avanzada',
            description: 'Equipos de última generación para resultados precisos.',
        },
        {
            icon: Sun,
            title: 'Elimina Manchas',
            description: 'Tratamiento efectivo para hiperpigmentación.',
        },
        {
            icon: Sparkles,
            title: 'Mejora Textura',
            description: 'Piel más suave, uniforme y luminosa.',
        },
        {
            icon: Heart,
            title: 'Estimula Colágeno',
            description: 'Rejuvenecimiento desde las capas profundas.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/laser-before.jpg',
            after: '/images/before-after/laser-after.jpg',
            label: 'Caso 1 - Manchas solares',
        },
        {
            before: '/images/before-after/laser-before-2.jpg',
            after: '/images/before-after/laser-after-2.jpg',
            label: 'Caso 2 - Rejuvenecimiento',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación de la Piel',
            description: 'Análisis de tu tipo de piel y condiciones a tratar.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza y aplicación de anestesia tópica si es necesario.',
            duration: '15-20 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Tratamiento Láser',
            description: 'Aplicación del láser con parámetros personalizados.',
            duration: '30-60 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Cuidados Post',
            description: 'Hidratación, protección solar estricta y seguimiento.',
            duration: '3-7 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Es doloroso el tratamiento láser?',
            answer: 'La sensación varía según el tipo de láser. Generalmente se siente como pequeños pinchazos o calor. Usamos anestesia tópica para mayor comodidad.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Para manchas: 2-4 sesiones. Para rejuvenecimiento: 3-6 sesiones. Para cicatrices: 4-6 sesiones. Depende de la condición específica.',
        },
        {
            question: '¿Hay tiempo de recuperación?',
            answer: 'Depende del tratamiento. Láseres suaves no tienen downtime. Láseres ablativos requieren 5-7 días de recuperación con descamación.',
        },
        {
            question: '¿Puedo hacerlo si tengo piel oscura?',
            answer: 'Sí, pero requiere precauciones especiales. Algunos láseres son más seguros que otros para pieles oscuras. Lo evaluamos en consulta.',
        },
        {
            question: '¿En qué época del año es mejor?',
            answer: 'Idealmente en meses de menos sol (otoño-invierno) ya que la protección solar post-tratamiento es crucial.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Para manchas: pueden requerir mantenimiento si hay exposición solar. Para rejuvenecimiento: los beneficios de colágeno son duraderos con cuidados.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '3000+', label: 'Tratamientos láser' },
            { value: '97%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Renueva tu piel con tecnología láser',
        description: 'Agenda tu consulta para evaluar qué tratamiento láser es ideal para ti.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Laser Rejuvenation',
            title: 'Facial Laser',
            description: 'Laser technology treatments for rejuvenation, spots, scars and skin texture. Precise results with the latest available technologies.',
            duration: '30-60 min',
            recovery: '3-7 days',
            anesthesia: 'Topical anesthesia',
        },
        info: {
            title: 'How Does Facial Laser Work?',
            content: [
                'Laser treatments use high-energy light to treat various skin conditions. Depending on the type of laser, we can treat spots, wrinkles, scars, enlarged pores and improve the overall texture of the skin.',
                'We have different technologies: <strong class="text-primary">Fractional laser</strong> for rejuvenation, <strong class="text-primary">Q-Switched laser</strong> for pigmentation, and <strong class="text-primary">IPL (Intense Pulsed Light)</strong> for spots and redness.',
            ],
            highlights: {
                title: 'Available Treatments',
                items: [
                    'Facial rejuvenation',
                    'Spot removal',
                    'Scar treatment',
                    'Pore reduction',
                    'Texture improvement',
                    'Redness treatment',
                ],
            },
        },
        benefits: [
            {
                title: 'Advanced Technology',
                description: 'Latest generation equipment for precise results.',
            },
            {
                title: 'Eliminates Spots',
                description: 'Effective treatment for hyperpigmentation.',
            },
            {
                title: 'Improves Texture',
                description: 'Smoother, more even and radiant skin.',
            },
            {
                title: 'Stimulates Collagen',
                description: 'Rejuvenation from the deep layers.',
            },
        ],
        process: [
            {
                title: 'Skin Evaluation',
                description: 'Analysis of your skin type and conditions to treat.',
                duration: '20-30 min',
            },
            {
                title: 'Preparation',
                description: 'Cleansing and application of topical anesthesia if needed.',
                duration: '15-20 min',
            },
            {
                title: 'Laser Treatment',
                description: 'Application of the laser with personalized parameters.',
                duration: '30-60 min',
            },
            {
                title: 'Post Care',
                description: 'Hydration, strict sun protection and follow-up.',
                duration: '3-7 days',
            },
        ],
        faqs: [
            {
                question: 'Is laser treatment painful?',
                answer: 'The sensation varies depending on the type of laser. Generally it feels like small pinpricks or heat. We use topical anesthesia for greater comfort.',
            },
            {
                question: 'How many sessions do I need?',
                answer: 'For spots: 2-4 sessions. For rejuvenation: 3-6 sessions. For scars: 4-6 sessions. It depends on the specific condition.',
            },
            {
                question: 'Is there any downtime?',
                answer: 'It depends on the treatment. Mild lasers have no downtime. Ablative lasers require 5-7 days of recovery with peeling.',
            },
            {
                question: 'Can I have it done if I have darker skin?',
                answer: 'Yes, but special precautions are required. Some lasers are safer than others for darker skin tones. We evaluate this in consultation.',
            },
            {
                question: 'What time of year is best?',
                answer: 'Ideally during months with less sun exposure (fall-winter) since post-treatment sun protection is crucial.',
            },
            {
                question: 'Are the results permanent?',
                answer: 'For spots: may require maintenance if there is sun exposure. For rejuvenation: the collagen benefits are long-lasting with proper care.',
            },
        ],
        cta: {
            title: 'Renew your skin with laser technology',
            description: 'Schedule your consultation to evaluate which laser treatment is ideal for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LaserFacialPage() {
    return <ProcedurePage data={laserFacialData} />
}
